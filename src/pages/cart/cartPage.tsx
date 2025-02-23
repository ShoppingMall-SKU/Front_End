import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "떡볶이", price: 9900, quantity: 1, img: "", shipping: 3000, selected: true },
    { id: 2, name: "떡볶이", price: 9900, quantity: 1, img: "", shipping: 3000, selected: true },
    { id: 3, name: "떡볶이", price: 9900, quantity: 1, img: "", shipping: 3000, selected: true },
  ]);

  // 장바구니 상태 업데이트
  const updateCart = (id: number, changes: Partial<CartItem>) => {
    setCart(cart.map(item => (item.id === id ? { ...item, ...changes } : item)));
  };

  //전체 선택/해제
  const toggleSelectAll = () => {
    const allSelected = cart.every(item => item.selected);
    setCart(cart.map(item => ({ ...item, selected: !allSelected })));
  };

  // 주문 관련 데이터 계산
  const selectedItems = cart.filter(item => item.selected);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalShipping = selectedItems.length > 0 ? selectedItems[0].shipping : 0;
  const discount = Math.floor(totalPrice * 0.02); //임의로 할인비율 넣어둠
  const finalPrice = totalPrice - discount + totalShipping;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>

      <div className="flex gap-8">
        {/* 장바구니 목록 */}
        <div className="w-2/3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-00">
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
              {cart.map(({ id, name, price, quantity, img, shipping, selected }) => (
                <tr key={id} className="border-b text-center">
                  <td className="p-3">
                    <input type="checkbox" checked={selected} onChange={() => updateCart(id, { selected: !selected })} />
                  </td>
                  <td className="p-3">
                    <img src={img} alt={name} className="w-16 h-16 rounded-md" />
                  </td>
                  <td className="p-3 font-semibold">{name}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => updateCart(id, { quantity: Math.max(1, quantity - 1) })} className="p-1 border rounded hover:bg-gray-200">
                        <AiOutlineMinus />
                      </button>
                      <span className="w-6 text-center">{quantity}</span>
                      <button onClick={() => updateCart(id, { quantity: quantity + 1 })} className="p-1 border rounded hover:bg-gray-200">
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-lg font-semibold">{(price * quantity).toLocaleString()}원</td>
                  <td className="p-3 text-gray-600">{shipping.toLocaleString()}원</td>
                  <td className="p-3">
                    <button onClick={() => setCart(cart.filter(item => item.id !== id))} className="text font-semibold hover:underline">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 주문 금액 부분 */}
        <div className="w-1/3 bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
          <h2 className="text-xl font-bold mb-4">주문 금액</h2>
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
          <button className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600">
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};
