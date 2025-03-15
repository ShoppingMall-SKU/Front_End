import { IoStar } from "react-icons/io5";
import { Product } from "./productList";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";  // Link 추가

type Props = {
    product: Product;
};

export const ProductItem = ({ product }: Props) => {
    const addToCart = () => {
        // 기존 장바구니 데이터 불러오기
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
        // 이미 있는 상품인지 확인
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.name); 
    
        let updatedCart;
        if (existingItemIndex !== -1) {
            // 기존 상품이면 수량 증가
            updatedCart = existingCart.map((item: any, index: number) =>
                index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            // 새로운 상품이면 추가
            updatedCart = [...existingCart, { 
                id: `${product.name}-${Date.now()}`,
                name: product.name, 
                price: product.price, 
                quantity: 1, 
                img: product.img, 
                shipping: 3000, 
                selected: true 
            }];
        }
    
        // 업데이트된 장바구니 데이터를 `localStorage`에 저장
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // NavBar의 장바구니 숫자가 즉시 반영되도록 이벤트 발생
        window.dispatchEvent(new Event("storage"));
    
        alert("장바구니에 추가되었습니다!");
    };

    return (
        <div>
            {/* 상품 클릭 시 상세 페이지로 이동하도록 Link 적용 */}
            <Link to={`/product/${product.name}`}>
                <img src={product.img} alt={product.name} />
            </Link>
            <button 
                onClick={addToCart}
                className="p-2 bg-black bg-opacity-45 rounded-full relative bottom-10 right-5 float-right"
            >
                <TiShoppingCart className="fill-white"/>
            </button>

            <div className="mt-5">
                <p className="font-light text-gray-500">{product.brand}</p>
                <p style={{ fontWeight: 600 }}>{product.name}</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
                <p className="font-extrabold text-xl">{product.price.toLocaleString()}원</p> 
                <IoStar className="fill-orange-400" />
                <p className="text-gray-500 text-sm font-bold">4.7</p>
            </div>
        </div>
    );
};