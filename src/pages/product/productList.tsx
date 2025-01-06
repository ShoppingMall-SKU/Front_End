import { useState } from "react";
import { productList } from "../../Data";
import { ProductItem } from "./productItem";


export type Product = {
   name: string;
   brand: string;
   img: string;
   price: number;
   sale: number;
   status: number;
   stock: number;
   detail: string;
   create_date: string;
}
export const ProductList = () => {
   const [idx, setIdx] = useState(0); // 인덱스 상태
   const [seeList, setSeeList] = useState<Product[]>(productList.slice(0, 4)); // 초기에 4개만 표시

   // 더보기 클릭 핸들러
   const viewMore = () => {
      const nextIdx = idx + 4; // 다음 인덱스
      const newItems = productList.slice(nextIdx, nextIdx + 4); // 4개씩 추가
      setSeeList([...seeList, ...newItems]); 
      setIdx(nextIdx); 
   };

   return (
      <div >
         <div className="grid grid-cols-4 gap-4 mt-5 justify-center">
            {seeList.map((product, index) => (
               <div key={index} className="p-4">
                  <ProductItem product={product}/>
               </div>
            ))}
         </div>

         {idx + 4 < productList.length && (
            <button
               onClick={viewMore}
               className="mt-4 p-2 btn btn-ghost flex justify-self-center"
            >
               더보기
            </button>
         )}
      </div>
   );
};
