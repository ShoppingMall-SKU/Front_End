import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export const CartPop = ({ onClose }: { onClose: () => void }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 장바구니 데이터 localStorage에서 가져오기
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">장바구니 담기</h2>
      <p className="text-gray-500">총 {totalItems}개</p>
      <hr className="my-4" />

      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img src={item.img} alt={item.name} className="w-24 h-24 rounded-md" />
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-lg font-bold">{item.price.toLocaleString()}원</p>
              <p className="text-gray-500">수량: {item.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
      )}

      <div className="flex justify-between mt-4">
        <span className="font-bold text-lg">총 금액</span>
        <span className="text-lg text-red-500 font-bold">{totalPrice.toLocaleString()} 원</span>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">바로구매</button>
        <Link to="/cart/page" className="flex-1">
          <button className="w-full border py-2 rounded-lg">장바구니 이동</button>
        </Link>
        <button className="flex-1 border py-2 rounded-lg" onClick={onClose}>
          쇼핑 계속하기
        </button>
      </div>
    </div>
  );
};
