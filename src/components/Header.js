import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
              </ul>
            </nav>

            {/* Search & Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Search Form - Hidden on mobile */}
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

          {/* Mobile Search - Show below on mobile */}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={toggleMenu}
          ></div>

          {/* Menu Content */}
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform">
            <div className="p-6">
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-red-600 transition duration-300"
                onClick={toggleMenu}
              >
                ✕
              </button>

              {/* Menu Items */}
              <nav className="mt-16">
                <ul className="space-y-6">
                  <li>
                    <Link
                      to="/"
                      className={`block py-4 text-2xl font-medium ${isActive(
                        "/"
                      )} border-b border-gray-200`}
                      onClick={toggleMenu}
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/san-pham"
                      className={`block py-4 text-2xl font-medium ${isActive(
                        "/san-pham"
                      )} border-b border-gray-200`}
                      onClick={toggleMenu}
                    >
                      Sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tin-tuc"
                      className={`block py-4 text-2xl font-medium ${isActive(
                        "/tin-tuc"
                      )} border-b border-gray-200`}
                      onClick={toggleMenu}
                    >
                      Tin tức
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lien-he"
                      className={`block py-4 text-2xl font-medium ${isActive(
                        "/lien-he"
                      )}`}
                      onClick={toggleMenu}
                    >
                      Liên hệ
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
