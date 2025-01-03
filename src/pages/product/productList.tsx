import { productList } from "../../Data";

export const ProductList = () => {
   return (
      <div>
         {productList.map((product) => (
            <div>{product.brand}</div>
         ))}
      </div>
   );
};
