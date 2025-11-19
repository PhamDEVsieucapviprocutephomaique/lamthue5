import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";

const ProductSection = ({ group, isLast }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct({
      ...product,
      category: group.name,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md mb-6 ${
          !isLast ? "border-b" : ""
        }`}
      >
        {/* Header section */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-800">
            {group.name} ({group.count})
          </h2>
          {group.count > 4 && (
            <Link
              to="/san-pham"
              className="flex items-center bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded transition duration-300"
            >
              <span className="mr-2">📂</span>
              Xem tất cả ({group.count})
            </Link>
          )}
        </div>

        {/* Products grid */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {group.products.map((product) => (
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
                  <p className="text-red-600 font-bold text-lg mb-2">
                    {product.price}
                  </p>
                  <p className="text-gray-600 text-base mb-2">{group.name}</p>
                  <p className="text-gray-500 text-sm mb-3">{product.brand}</p>

                  <button className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded text-base transition duration-300">
                    XEM CHI TIẾT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductSection;
