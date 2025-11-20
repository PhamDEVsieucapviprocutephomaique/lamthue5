import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import Contact from "./pages/Contact";
import FloatingButtons from "./components/FloatingButtons";
import Admin from "./pages/Admin"; // THÊM DÒNG NÀY

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/admin" element={<Admin />} /> {/* THÊM ROUTE ADMIN */}
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
