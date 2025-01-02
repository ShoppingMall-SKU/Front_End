import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main/mainPage";
import { NavBar } from "./components/navBar";

const App = () => {
   const ignoreNavPaths = ["", ""];

   return (
      <div>
         {ignoreNavPaths.includes(location.pathname) && <NavBar />}
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<MainPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
