import { useColor } from "color-thief-react";
import { useEffect, useState } from "react";

export const BannerComp = () => {
   const images = ["imgs/img1.jpg", "imgs/img2.jpg", "imgs/img3.jpg"];
   const msgs = [
      "집에서도 즐기는\n돈가스",
      "집에서도 즐기는\n타코야끼",
      "집에서도 즐기는\n소시지",
   ];

   const [currentIndex, setCurrentIndex] = useState(0);

   // 현재 이미지의 색상 추출
   const { data } = useColor(images[currentIndex], "rgbString");

   const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
   };

   // 5초마다 자동 슬라이드
   useEffect(() => {
      const intervalId = setInterval(handleNext, 5000);
      console.log(data);
      return () => clearInterval(intervalId);
   }, []);

   return (
      <div className="w-screen relative ">
         <div className="relative h-96 overflow-hidden items-center justify-center">
            {images.map((slide, index) => (
               <div
                  key={index}
                  className={`absolute block w-full h-full transition-opacity duration-700 ${
                     index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
               >
                  <img
                     src={slide}
                     className="absolute object-cover block h-full w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                     alt="img"
                     style={{
                        objectFit: "cover",
                        backgroundColor: data,
                        transition: "background-color 0.445s ease-in-out",
                     }}
                  />
                  <div className="bg-opacity-60 rounded-md bg-gray-500 text-white absolute right-10 bottom-5">
                     <p className="font-bold px-2 text-end">{msgs[index]}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};
