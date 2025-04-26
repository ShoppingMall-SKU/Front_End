import { useParams,  useNavigate } from "react-router-dom";
import { productList } from "../../Data";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { Link } from 'react-router-dom';


export const ProductDetail = () => {
    const { name } = useParams();
    const decodedName = decodeURIComponent(name ?? "");
    const navigate = useNavigate(); // ✅ 추가


    const product = productList.find((p) => p.name === decodedName);

    const [quantity, setQuantity] = useState(1);
    const shippingFee = 3000;

    // 리뷰 정렬 상태 추가
    const [reviewSort, setReviewSort] = useState<"최신순" | "별점높은순" | "별점낮은순">("최신순");

    // 리뷰 데이터(걍 우선 피그마대로 넣음)
    const reviews = [
        { user: "user1", rating: "★★★★★", date: "2024.12.22", text: "간편하게 먹기 좋아요" },
        { user: "user2", rating: "★★★★★", date: "2024.12.20", text: "맛있어요" },
        { user: "user3", rating: "★★★★★", date: "2024.12.16", text: "념념념" },
        { user: "user4", rating: "★★★★★", date: "2024.12.16", text: "맛있어요" },
        { user: "user5", rating: "★★★★★", date: "2024.12.16", text: "냠냠냠" },
    ];

    // 상품문의 데이터
    const inquiries = [
        { user: "user1", date: "2024.11.26", text: "기타문의입니다. (답변완료)", type: "답변완료" },
        { user: "user2", date: "2024.11.30", text: "기타문의입니다. (답변완료아닐때)", type: "답변대기" }
    ];

    if (!product) {
        return <h2 className="text-center text-2xl font-bold mt-10">상품을 찾을 수 없습니다.</h2>;
    }



    // 장바구니 개수 업데이트 함수
    const updateCartCount = (cart: any[]) => {
        const uniqueItemCount = new Set(cart.map((item) => item.name)).size;
        localStorage.setItem("cartCount", JSON.stringify(uniqueItemCount));
        window.dispatchEvent(new Event("storage")); // NavBar 업데이트 트리거
    };

    // 장바구니에 상품 추가하는 함수
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItemIndex = cart.findIndex((item: { name: string; }) => item.name === product.name);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity, selected: true, shipping: shippingFee });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount(cart);
        alert("장바구니에 추가되었습니다!");
    };

    // ✅ 바로구매 버튼 클릭 시 OrderPage로 이동
    const handleBuyNow = () => {
         const orderItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.img,       // ✅ 이미지 포함
            deliveryFee: shippingFee
        };
    
        navigate("/order", { state: { items: [orderItem] } });
    };



    return (
        <div className="flex flex-col items-center w-full bg-white min-h-screen py-10">
            {/* 상품 상세 정보 컨테이너 */}
            <div className="w-full max-w-6xl bg-white mt-6 p-10 rounded-lg flex">
                <div className="w-1/2 flex flex-col items-center">
                    <img src={product.img} alt={product.name} className="w-[400px] h-[400px] rounded-lg shadow-md object-cover" />

                    {/* 썸네일 이미지 */}
                    <div className="mt-6 flex gap-2">
                        {[product.img, product.img, product.img].map((img, index) => (
                            <img key={index} src={img} alt="썸네일" className="w-20 h-20 rounded-md border shadow-sm hover:opacity-80 cursor-pointer" />
                        ))}
                    </div>
                </div>

                <div className="w-1/2 pl-10">
                    <h3 className="text-3xl font-extrabold text-gray-400 pb-2">[{product.brand}]</h3>
                    <h1 className="text-4xl font-extrabold">{product.name}</h1>
                    <p className="text-3xl font-bold mt-4">{product.price.toLocaleString()}원</p>
                    <p className="text-lg text-gray-600 mt-2">배송비: {shippingFee.toLocaleString()}원</p>

                    {/* 수량 선택 */}
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300 text-lg" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
                            <span className="text-lg font-bold">{quantity}</span>
                            <button className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300 text-lg" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        </div>
                    </div>

                    {/* 총 결제금액 */}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-lg text-gray-600">총 결제금액</p>
                        <p className="text-2xl font-extrabold text-black">{(product.price * quantity + shippingFee).toLocaleString()}원</p>
                    </div>

                    {/* 버튼 */}
                    <div className="mt-6 flex gap-4">
                        <button 
                            className="flex items-center gap-2 border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 text-lg"
                            onClick={addToCart}>
                            <FaShoppingCart /> 장바구니
                        </button>
                        <button className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 text-lg font-semibold" onClick={handleBuyNow} >
                            바로구매
                        </button>
                    </div>
                </div>
            </div>



			<div className="w-full max-w-6xl bg-white mt-10 p-10 rounded-lg text-center">
                {/* 상세 설명 페이지 */}
				<h2 className="text-3xl font-extrabold mt-4">
					상세설명 페이지
                </h2>
            </div>




            {/* 리뷰 섹션 */}
            <div className="w-full max-w-6xl mt-10">
                <div className="border-b pb-4 mb-6 flex items-center">
                    {/* 리뷰 개수 + 정렬 기능을 왼쪽 정렬 */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-extrabold">
                            리뷰 <span className="text-orange-500">{reviews.length}건</span>
                        </h2>

                        {/* 정렬 기능 */}
                        <select className="border p-2 rounded-md" value={reviewSort} onChange={(e) => setReviewSort(e.target.value as "최신순" | "별점높은순" | "별점낮은순")}>
                            <option value="최신순">최근 등록순</option>
                            <option value="별점높은순">별점 높은 순</option>
                            <option value="별점낮은순">별점 낮은 순</option>
                        </select>
                    </div>

                    {/* 리뷰 작성 버튼을 오른쪽 정렬 */}
                    <Link to="/my/review">
                        <button className="border border-gray-400 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 ml-auto float-right">
                            리뷰 작성하기
                        </button>
                    </Link>
                </div>

                {/* 리뷰 리스트 */}
                <div className="border-b pb-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="mt-4 pt-4 pb-4 border-b gap-1">
                            <p className="font-semibold text-orange-500">{review.rating}</p>
                            <p className="text-gray-500">{review.user} | {review.date}</p>
                            <p className="text-gray-500">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 상품문의 섹션 */}
            <div className="w-full max-w-6xl mt-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold">
                        상품문의 <span className="text-orange-500">{inquiries.length}건</span>
                    </h2>
                    <button className="border border-gray-400 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                        상품문의 작성
                    </button>
                </div>

                <table className="w-full mt-4 text-left border-collapse">
                    <tr className="border-b text-gray-600"></tr>
                    <tbody>
                        {inquiries.map((inquiry, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-5">{index + 1}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 border  text-sm font-semibold 
                                        ${inquiry.type === "답변완료" ? "border-orange-500 text-orange-500" 
                                        : "border-gray-600 text-gray-600"}`}>
                                        {inquiry.type}
                                    </span>
                                </td>
                                <td className="p-5">{inquiry.text}</td>
                                <td className="p-5 text-gray-400">user{index + 1}****</td>
                                <td className="p-5 text-gray-400">{inquiry.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
