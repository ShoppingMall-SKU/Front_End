import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";
import { ProductDetail } from "./pages/product/productDetail";
import { CartPage } from "./pages/cart/cartPage";

import JoinPage from "./pages/login/joinPage";
import LoginPage from "./pages/login/loginPage"
import MyOrder from "./pages/my/myOrder";
import MyModify from "./pages/my/myModify";
import MyReview from "./pages/my/myReview";
import MyQA from "./pages/my/myQA";
import JoinFormPage from "./pages/login/joinFormPage";




const App = () => {
	const ignoreNavPaths = ["", ""];

   return (
      <div>
         {!ignoreNavPaths.includes(location.pathname) && <NavBar />}
         <BrowserRouter>
            <Routes>
               
               <Route path="/" element={<MainPage />} />

               <Route path="/member/login" element={<LoginPage />} />
               <Route path="/member/joinform" element={<JoinFormPage />} />
               <Route path="/member/join" element={<JoinPage />} />
               
               <Route path="/my/order" element={<MyOrder />} />
               <Route path="/my/modify" element={<MyModify />} /> 
               <Route path="/my/review" element={<MyReview />} />
               <Route path="/my/question" element={<MyQA />} />
               <Route path="/cart/page" element={<CartPage />} />

            </Routes>
         </BrowserRouter>
         <Footer />
      </div>
   );
};

export default App;
