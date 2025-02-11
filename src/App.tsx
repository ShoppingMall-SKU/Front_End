import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";
import { ProductDetail } from "./pages/product/productDetail";
import { CartPop } from "./pages/cart/cartPop";

const Layout = () => {
   const location = useLocation();
   const ignoreNavPaths = ["", ""];

   return (
      <div>
         {!ignoreNavPaths.includes(location.pathname) && <NavBar />}
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<ProductDetail />} />
            <Route path="/cart/pop" element={<CartPop />} /> 
         </Routes>
         <Footer />
      </div>
   );
};

const App = () => {
   return (
      <BrowserRouter>
         <Layout />
      </BrowserRouter>
   );
};

export default App;
