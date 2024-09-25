import { Outlet } from "react-router-dom";
import Promo from "../components/Promo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { QuantityContextProvider } from "../context/QuantityContext";
import { CartContextProvider } from "../context/CartContext";

function App() {
  return (
    <QuantityContextProvider>
      <CartContextProvider>
        <div className="text-gray-800 font-[sans-serif]">
          <Promo />
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </CartContextProvider>
    </QuantityContextProvider>
  );
}

export default App;
