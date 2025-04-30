import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  shipping: number;
  selected: boolean;
}

export const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
    const navigate = useNavigate();

  // localStorage에서 장바구니 데이터 불러와 병합
  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // 같은 상품이면 수량을 합쳐서 병합
    const mergedCart = storedCart.reduce<CartItem[]>((acc, item) => {
      const existingItem = acc.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += item.quantity; // 같은 상품이면 수량 증가
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    setCart(mergedCart);
    localStorage.setItem("cart", JSON.stringify(mergedCart));
    updateCartCount(mergedCart); // NavBar의 장바구니 개수 업데이트
  }, []);

  // NavBar의 장바구니 개수 업데이트 함수
  const updateCartCount = (updatedCart: CartItem[]) => {
    const uniqueItemCount = new Set(updatedCart.map((item) => item.name)).size;
    localStorage.setItem("cartCount", JSON.stringify(uniqueItemCount));
    window.dispatchEvent(new Event("storage")); // NavBar 업데이트 트리거
  };

  // 장바구니 업데이트 시 중복 방지
  const updateCart = (name: string, changes: Partial<CartItem>) => {
    const updatedCart = cart.map((item) =>
      item.name === name ? { ...item, ...changes } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart); // 변경 후 NavBar에도 반영
  };

  // 상품 삭제 기능 추가 (NavBar 개수 업데이트 반영)
  const removeItem = (name: string) => {
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart); // 삭제 후 NavBar 개수 업데이트
  };

  // 전체 선택/해제
  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    const updatedCart = cart.map((item) => ({ ...item, selected: !allSelected }));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };



    // 주문 버튼 클릭 시 주문 페이지로 이동
    const handleOrder = () => {
      const selectedItems = cart
        .filter((item) => item.selected)
        .map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.img,
          deliveryFee: item.shipping
        }));
    
      if (selectedItems.length === 0) {
        alert("주문할 상품을 선택해주세요.");
        return;
      }
    
      navigate("/order", { state: { items: selectedItems } });
    };
    

    


  // 주문 관련 데이터 계산
  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalShipping = selectedItems.reduce((acc, item) => acc + item.shipping, 0);
  const discount = Math.floor(totalPrice * 0.01);
  const finalPrice = totalPrice - discount + totalShipping;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">장바구니</h1>

      <div className="flex gap-8">
        {/* 장바구니 목록 */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600 text-center">
                <th className="p-3">
                  <input type="checkbox" checked={cart.every(item => item.selected)} onChange={toggleSelectAll} />
                </th>
                <th className="p-3">이미지</th>
                <th className="p-3">상품정보</th>
                <th className="p-3">수량</th>
                <th className="p-3">상품구매금액</th>
                <th className="p-3">배송비</th>
                <th className="p-3">선택삭제</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ name, price, quantity, img, shipping, selected }) => (
                <tr key={name} className="border-b text-center">
                  <td className="p-3">
                    <input type="checkbox" checked={selected} onChange={() => updateCart(name, { selected: !selected })} />
                  </td>
                  <td className="p-3">
                    <img src={img || "/default-image.png"} alt={name} className="w-16 h-16 rounded-md object-cover" />
                  </td>
                  <td className="p-3 font-semibold">{name}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateCart(name, { quantity: Math.max(1, quantity - 1) })}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateCart(name, { quantity: quantity + 1 })}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-lg font-semibold">{(price * quantity).toLocaleString()}원</td>
                  <td className="p-3 text-gray-600">{shipping.toLocaleString()}원</td>
                  <td className="p-3">
                    <button
                      onClick={() => removeItem(name)}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 주문 결제 박스 */}
        <div className="w-1/3 bg-white p-6 rounded-lg border border-gray-300 shadow-sm self-start">
          <h2 className="text-xl font-bold mb-4 text-center">주문 금액</h2>
          <div className="flex justify-between mb-2">
            <span>상품금액</span>
            <span>{totalPrice.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>할인금액</span>
            <span className="text-green-600"> {-discount.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>배송비</span>
            <span>{totalShipping.toLocaleString()} 원</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-bold text-red-500">
            <span>총 결제 금액</span>
            <span>{finalPrice.toLocaleString()} 원</span>
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600" onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};
