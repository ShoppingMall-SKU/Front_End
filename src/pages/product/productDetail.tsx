import { ProductGeneral } from "./productGeneral";
import { ProductInfoImg } from "./productInfoImg";

const product: productType = {
	brand: "아무 판매사",
	name: "진진수라 궁중 소고기 갈비찜",
	price: 9900,
	score: 4.8,
	imgs: ["imgs/p1.jpg", "imgs/p2.jpg", "imgs/p3.jpg"],
	infoImg: "imgs/info1.jpg",
	reviewCnt: 5,
	shipPrice: 3000,
	saleRate: 30,
};

interface productType {
	brand: string;
	name: string;
	price: number;
	score: number;
	imgs: Array<string>;
	infoImg: string;
	reviewCnt: number;
	shipPrice: number;
	saleRate: number;
}

export const ProductDetail = () => {
	return (
		<div className="my-auto mt-12">
			<ProductGeneral props={product} />
			<ProductInfoImg img={product.infoImg} />
		</div>
	);
};
