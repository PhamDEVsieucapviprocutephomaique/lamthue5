import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCartItems } from "../utils/cartUtils";

const Header = ({ onCartClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Cập nhật số lượng giỏ hàng khi component mount
    setCartCount(getCartItems().length);

    // Listen sự kiện storage thay đổi
    const handleStorageChange = () => {
      setCartCount(getCartItems().length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-red-600 font-bold"
      : "text-gray-700 hover:text-red-600";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-3xl font-bold text-blue-800">
              Thanhdanhluxury
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    to="/"
                    className={`${isActive(
                      "/"
                    )} transition duration-300 text-lg`}
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/san-pham"
                    className={`${isActive(
                      "/san-pham"
                    )} transition duration-300 text-lg`}
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tin-tuc"
                    className={`${isActive(
                      "/tin-tuc"
                    )} transition duration-300 text-lg`}
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lien-he"
                    className={`${isActive(
                      "/lien-he"
                    )} transition duration-300 text-lg`}
                  >
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className={`${isActive(
                      "/admin"
                    )} transition duration-300 text-lg`}
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Search & Cart & Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-blue-800 transition duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="hidden md:flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent w-64"
                />
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2 rounded-r-lg hover:bg-blue-900 transition duration-300"
                >
                  Tìm
                </button>
              </form>

              {/* Hamburger Menu */}
              <button
                className="md:hidden text-3xl text-gray-700"
                onClick={toggleMenu}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden mt-3 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded-r-lg hover:bg-blue-900 transition duration-300"
            >
              Tìm
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={toggleMenu}
          ></div>
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-6">
              <button
                className="absolute top-6 right-6 text-3xl text-gray-700"
                onClick={toggleMenu}
              >
                ✕
              </button>
              <nav className="mt-16">
                <ul className="space-y-6">
                  <li>
                    <Link
                      to="/"
                      className="block py-4 text-2xl font-medium border-b border-gray-200"
                      onClick={toggleMenu}
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/san-pham"
                      className="block py-4 text-2xl font-medium border-b border-gray-200"
                      onClick={toggleMenu}
                    >
                      Sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tin-tuc"
                      className="block py-4 text-2xl font-medium border-b border-gray-200"
                      onClick={toggleMenu}
                    >
                      Tin tức
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lien-he"
                      className="block py-4 text-2xl font-medium border-b border-gray-200"
                      onClick={toggleMenu}
                    >
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block py-4 text-2xl font-medium"
                      onClick={toggleMenu}
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
