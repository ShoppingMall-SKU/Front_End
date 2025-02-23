import { useEffect, useState } from "react";
import { ProductRating } from "./productRating";
import { TiShoppingCart } from "react-icons/ti";

interface productType {
	brand: string;
	name: string;
	price: number;
	score: number;
	imgs: Array<string>;
	reviewCnt: number;
	shipPrice: number;
	saleRate: number;
}

export const ProductGeneral = (props: { props: productType }) => {
	const product = props.props;
	const imgList = product.imgs;
	const [idx, setIdx] = useState(0);
	const [count, setCount] = useState(1);
	const [totalPrice, setTotalPrice] = useState(
		count * product.price + product.shipPrice
	);

	useEffect(() => {
		count > 0
			? setTotalPrice(count * product.price + product.shipPrice)
			: setTotalPrice(0);
	}, [count]);
	return (
		<div className="justify-self-center">
			<div className="grid grid-cols-2 items-center">
				<div className="w-3/4 mx-auto">
					<img src={imgList[idx]} />
					<div className="flex justify-between mt-4">
						{imgList.map((img, index) => (
							<button
								className={`${
									index == idx
										? "border-4  border-base-color"
										: "border border-white"
								} `}
								onClick={() => {
									setIdx(index);
								}}
							>
								<img src={img} className="w-28" />
							</button>
						))}
					</div>
				</div>
				<div className="w-4/5 mx-auto space-y-3">
					<p className="font-light text-gray-500 text-3xl">
						{product.brand}
					</p>
					<p className="text-3xl">{product.name}</p>
					<p className="text-3xl font-bold">
						{product.price.toLocaleString()}원
					</p>

					<div className="flex gap-3">
						<ProductRating score={product.score} />
						<p className="font-extrabold">{product.score}</p>
						<p className="text-gray-300">|</p>
						<p className="text-gray-400 font-light">
							{product.reviewCnt}
						</p>
					</div>
					<div className="flex gap-10">
						<p className="text-gray-400">배송비</p>
						<p className="font-bold">
							{product.shipPrice.toLocaleString()}원
						</p>
					</div>
					<hr />
					{/* // 수량 담는 테이블 */}
					<div className="bg-base-200 rounded-lg border border-gray-200">
						<p className="text-sm m-5">
							[{product.brand}]{product.name}
						</p>
						<hr />
						<div className="flex px-5 py-3 justify-between">
							<div className="flex h-6 items-center">
								<button
									className="w-8 h-6 flex items-center justify-center border bg-white"
									onClick={() => {
										setCount(Math.max(0, count - 1));
									}}
								>
									-
								</button>
								<input
									className="border w-8 text-center text-sm h-full bg-white border-base-300"
									value={count}
									readOnly
								/>
								<button
									className="w-8 h-6 flex items-center justify-center border bg-white"
									onClick={() => {
										setCount(count + 1);
									}}
								>
									+
								</button>
							</div>
							<p className="font-bold text-lg">
								{totalPrice.toLocaleString()} 원
							</p>
						</div>
					</div>

					<div className="flex justify-between py-5">
						<p>총 결제금액</p>
						<p className="font-bold text-3xl">
							{totalPrice.toLocaleString()}원
						</p>
					</div>
					<div className=" items-center flex gap-10 justify-center bottom-0">
						<button className="btn bg-white px-11">
							<div className="flex items-center gap-3">
								<TiShoppingCart className="fill-black size-8" />
								<p>장바구니</p>
							</div>
						</button>
						<button className="btn px-12 bg-base-color hover:bg-red-500 hover:border-none border-none">
							<p className="text-white px-5">바로구매</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
