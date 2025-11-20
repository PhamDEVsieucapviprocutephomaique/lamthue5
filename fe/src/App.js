import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import Contact from "./pages/Contact";
import FloatingButtons from "./components/FloatingButtons";
import Admin from "./pages/Admin";
import CartView from "./components/CartView";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
        <CartView isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
