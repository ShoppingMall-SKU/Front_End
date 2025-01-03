import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiListBold } from "react-icons/pi";

export const NavBar = () => {
   const number = 1;

   return (
      <div className="border-b-2">
         <div className="flex justify-end items-start gap-2 text-gray-400 text-xs px-3">
            <p className="link link-hover hover:cursor-pointer">회원가입</p> |{" "}
            <p className="link link-hover hover:cursor-pointer">로그인</p> |{" "}
            <p className="link link-hover hover:cursor-pointer">판매자 가입</p>
         </div>

         <div className="navbar bg-base-100 flex px-10 justify-between items-center">
            <div className="dropdown ">
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
            <p
               className="text-6xl pl-10 flex font-extrabold "
               style={{ color: "#FF5D5D" }}
            >
               Meal Kart
            </p>
            <div className="gap-2 pt-4 items-start">
               <div className="p-4 hover:bg-base-200 rounded-full hover:cursor-pointer">
                  <FaRegUser className="text-black size-8" />
               </div>
               <div className="p-4 hover:bg-base-200 rounded-full hover:cursor-pointer items-end">
                  <div className="indicator">
                     {number > 0 && (
                        <span className="indicator-item badge px-2 items-center bg-red-600 text-white font-bold text-xs">
                           {number > 10 ? "9+" : number}
                        </span>
                     )}
                     <AiOutlineShoppingCart className="text-black size-8 " />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
