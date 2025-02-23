import { useState } from "react";

export const ProductInfoImg = (props: { img: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="my-10 justify-self-center">
			<div
				className={`overflow-hidden transition-all duration-300 ${
					isExpanded ? "max-h-[none]" : "max-h-[800px]"
				}`}
			>
				<img src={props.img} className="w-full" alt="Product"></img>
			</div>
			<button
				className="btn w-full rounded-none px-4"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded ? "접기" : "펼치기"}
			</button>
		</div>
	);
};
