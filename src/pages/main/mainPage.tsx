import { ProductList } from "../product/productList";
import { BannerComp } from "./bannerComp";

export const MainPage = () => {
   return (
      <div>
         <BannerComp />
         <div className="container mt-12 mx-auto">
            <div className="flex gap-2 font-extrabold text-3xl">
               <p>이번주</p>
               <p className="text-orange-500">신상</p>
               <p>밀키트</p>
            </div>
            <ProductList/>
         </div>
         <div className="container mt-12 mx-auto">
            <div className="flex gap-2 font-extrabold text-3xl">
               <p>주간</p>
               <p className="text-orange-500">베스트10</p>
            </div>
         </div>
      </div>
   );
};
