import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiListBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export const NavBar = () => {
   const [cartCount, setCartCount] = useState(0);

   // 장바구니 개수 업데이트 함수 (체크된 품목만 카운트)
   const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
      // 품목(서로 다른 상품)의 개수 계산
      const uniqueItemCount = new Set(cart.map((item: any) => item.name)).size;
    
      setCartCount(uniqueItemCount);
    };
    

   // `useEffect`에서 localStorage 변경을 감지하여 자동 업데이트
   useEffect(() => {
      updateCartCount();  // 초기 로드 시 실행

      // 같은 탭에서도 localStorage 변경 감지하도록 이벤트 리스너 추가
      window.addEventListener("storage", updateCartCount);

      return () => {
         window.removeEventListener("storage", updateCartCount);
      };
   }, []);

   return (
      <div className="border-b-2">
         <div className="flex justify-end items-start gap-2 text-gray-400 text-xs px-3">
            <p className="link link-hover hover:cursor-pointer">회원가입</p> |{" "}
            <p className="link link-hover hover:cursor-pointer">로그인</p> |{" "}
            <p className="link link-hover hover:cursor-pointer">판매자 가입</p>
         </div>

         <div className="navbar bg-base-100 flex px-10 justify-between items-center">
            <div className="dropdown">
               <button className="btn bg-base-color hover:bg-red-400 focus:outline-none">
                  <PiListBold className="size-6 text-white" />
               </button>
               <ul className="mt-1 dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 gap-1 shadow focus:bg-black">
                  <li className="active:bg-base-200">
                     <a>전체 상품</a>
                  </li>
                  <hr />
                  <li>
                     <a>신상품</a>
                  </li>
                  <hr />
                  <li>
                     <a>베스트 상품</a>
                  </li>
                  <hr />
                  <li>
                     <a>냉동 제품</a>
                  </li>
                  <hr />
                  <li>
                     <a>냉장 제품</a>
                  </li>
               </ul>
            </div>

            {/* Meal Kart 클릭 시 메인 페이지 이동 */}
            <Link to="/" className="text-6xl pl-10 flex font-extrabold" style={{ color: "#FF5D5D" }}>
               Meal Kart
            </Link>

            <div className="flex gap-2 pt-4 items-start">
               <div className="p-4 hover:bg-base-200 rounded-full hover:cursor-pointer">
                  <FaRegUser className="text-black size-8" />
               </div>
               <Link to="/cart/page">
                  <div className="p-4 hover:bg-base-200 rounded-full hover:cursor-pointer items-end">
                     <div className="indicator">
                        {cartCount > 0 && (
                           <span className="indicator-item badge px-2 items-center bg-red-600 text-white font-bold text-xs">
                              {cartCount > 10 ? "9+" : cartCount}
                           </span>
                        )}
                        <AiOutlineShoppingCart className="text-black size-8" />
                     </div>
                  </div>
               </Link>
            </div>
         </div>
      </div>
   );
};
