import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {CartProvider} from "./context/CartContext"
import Navbar from "./componentes/Navbar"
import Main from "./componentes/Main"
import Footer from "./componentes/Footer"
import ProductDetail from "./componentes/ProductDetail"
import Productos from "./pages/Productos"
import Contacto from "./pages/Contacto"
import GiftCard from "./pages/GiftCard"
import Cart from "./componentes/Cart"





function App() {

  return (

    <CartProvider>
      <Router>
       
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/productos" element={<Productos/>}/>
          <Route path="/category/:category" element={<Productos/>}/>
          <Route path="/productos/:id" element={<Productos/>}/>
          <Route path="/Giftcard" element={<GiftCard/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/cart" element= {<Cart/>}/>
        </Routes>
        <Footer />
      </div>
     
    </Router>
    </CartProvider>
    
   
  );
}


export default App
