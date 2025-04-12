import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";
import { ProductDetail } from "./pages/product/productDetail";
import { CartPage } from "./pages/cart/cartPage";

import JoinPage from "./pages/login/joinPage";
import LoginPage from "./pages/login/loginPage";
import MyOrder from "./pages/my/myOrder";
import MyModify from "./pages/my/myModify";
import MyReview from "./pages/my/myReview";
import MyInquiry from "./pages/my/myInquiry";
import JoinFormPage from "./pages/login/joinFormPage";

const App = () => {
  const ignoreNavPaths = ["", ""];

  return (
    <BrowserRouter>
      {" "}
      {/*에러나서 최상단으로 이동*/}
      <div>
        {!ignoreNavPaths.includes(window.location.pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/member/login" element={<LoginPage />} />
          <Route path="/member/joinform" element={<JoinFormPage />} />
          <Route path="/member/join" element={<JoinPage />} />

          <Route path="/my" element={<Navigate to="/my/order" replace />} />
          <Route path="/my/order" element={<MyOrder />} />
          <Route path="/my/modify" element={<MyModify />} />
          <Route path="/my/review" element={<MyReview />} />
          <Route path="/my/inquiry" element={<MyInquiry />} />

          <Route path="/cart/page" element={<CartPage />} />
          <Route path="/product/:name" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
