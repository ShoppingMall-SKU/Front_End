import { IoStar } from "react-icons/io5";
import { Product } from "./productList";
import { TiShoppingCart } from "react-icons/ti";


type props = {
    product : Product;
}
 
export const ProductItem = ({product} : props) => {
    return (
        <div>
            <div>
                <img src={product.img}></img>
                <button className="p-2 bg-black bg-opacity-45 rounded-full relative bottom-10 right-5 float-right"><TiShoppingCart className="fill-white"/></button>
            </div>
            <div className="mt-5">
                <p className="font-light text-gray-500">{product.brand}</p>
                <p className="" style={{fontWeight : 600}}>{product.name}</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
                <p className="font-extrabold text-xl">{product.price.toLocaleString()}원</p> 
                <p><IoStar className="fill-orange-400"/></p>
                <p className="text-gray-500 text-sm font-bold">4.7</p>
                
            </div>
        </div>
    )
}