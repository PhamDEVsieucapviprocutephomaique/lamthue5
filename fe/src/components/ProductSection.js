import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";

const ProductSection = ({ group, isLast }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State để quản lý việc mở rộng danh sách sản phẩm
  const [isExpanded, setIsExpanded] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct({
      ...product,
      // group.name là TÊN HÃNG. Lấy categoryName thực tế để hiển thị trong modal
      category: product.categoryName || group.name,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Xác định danh sách sản phẩm hiển thị
  const productsToDisplay = isExpanded
    ? group.products
    : group.products.slice(0, 4);

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md mb-6 ${
          !isLast ? "border-b" : ""
        }`}
      >
        {/* Header section (Tên Hãng Sơn) */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-800">
            {group.name} ({group.count})
          </h2>
          {/* Nút Toggle (ẩn/hiện) */}
          {group.count > 4 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded transition duration-300"
            >
              <span className="mr-2">{isExpanded ? "⬆️" : "📂"}</span>
              {isExpanded ? "Thu gọn" : `Xem tất cả (${group.count})`}
            </button>
          )}
        </div>

        {/* Products grid */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded p-3 hover:shadow-lg transition duration-300 group hover:border-blue-800 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div
                  className="h-40 bg-cover bg-center rounded mb-3"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>

                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-800 transition duration-300 mb-2">
                    {product.name}
                  </h3>

                  {/* HIỂN THỊ HÃNG SẢN PHẨM (BRAND) */}
                  <p className="text-gray-600 text-base mb-1">
                    Hãng:{" "}
                    <span className="font-semibold text-red-600">
                      {product.brand || "N/A"}
                    </span>
                  </p>

                  {/* *** SỬA LỖI HIỂN THỊ LOẠI SƠN: Sử dụng product.categoryName thay vì group.name *** */}
                  <p className="text-gray-600 text-base mb-2">
                    Loại:{" "}
                    <span className="font-semibold text-blue-700">
                      {product.categoryName || "N/A"}
                    </span>
                  </p>

                  {/* HIỂN THỊ GIÁ */}
                  <p className="text-red-600 font-bold text-lg mb-3">
                    {product.price}
                  </p>

                  <button className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded text-base transition duration-300">
                    XEM CHI TIẾT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductSection;
