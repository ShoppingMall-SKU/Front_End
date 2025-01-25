import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";

import JoinPage from "./pages/login/joinPage";
import LoginPage from "./pages/login/loginPage"
import MyOrder from "./pages/my/myOrder";
import MyModify from "./pages/my/myModify";
import MyReview from "./pages/my/myReview";
import MyQA from "./pages/my/myQA";



const App = () => {
   const ignoreNavPaths = ["", ""];

   return (
      <div>
         {!ignoreNavPaths.includes(location.pathname) && <NavBar />}
         <BrowserRouter>
            <Routes>
               
               <Route path="/" element={<MainPage />} />

               <Route path="/member/login" element={<LoginPage />} />
               <Route path="/member/join" element={<JoinPage />} />
               
               <Route path="/my/order" element={<MyOrder />} />
               <Route path="/my/modify" element={<MyModify />} /> 
               <Route path="/my/review" element={<MyReview />} />
               <Route path="/my/question" element={<MyQA />} />

            </Routes>
         </BrowserRouter>
         <Footer />
      </div>
   );
};

export default App;
