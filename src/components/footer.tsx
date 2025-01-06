export const Footer = () => {
   return(
   <div className="footer h-80 w-screen justify-center" style={{backgroundColor : "#DA4646"}}>
      <div className="grid grid-cols-1 grid-rows-2 w-screen">
         <div className="bg-white gap-2 mx-auto w-4/5 h-12 mt-8 flex items-center font-bold text-gray-500 px-3">
            <p>회사소개 | </p>
            <p>이용약관 | </p>
            <p>입점문의 | </p>
            <p>사업자 정보 | </p>
            <p>공지사항 | </p>
            <p>광고문의 | </p>
            <p>더 보기</p>
         </div>
         <div className="flex w-4/5 gap-10 mt-5 mx-auto text-white font-extrabold">
            <p className="text-5xl">
               Meal Kart
            </p>
            <div className="text-lg">
               <p>유선전화: 02 - 0000 - 0000</p>
               <p>주소 : 어딘가 있겠지</p>
               <p>이메일 : 12345678@gmail.com</p>
            </div>
         </div>
      </div>

   </div>);
};
