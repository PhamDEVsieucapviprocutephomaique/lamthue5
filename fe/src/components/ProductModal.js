import React from "react";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-600 transition duration-300 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div
              className="h-80 md:h-full bg-cover bg-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>
            <p className="text-red-600 font-bold text-2xl mb-4">
              {product.price}
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Thương hiệu:{" "}
              <span className="font-semibold">{product.brand}</span>
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Danh mục:{" "}
              <span className="font-semibold">{product.category}</span>
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Mô tả sản phẩm
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Đặc điểm nổi bật
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>✅ Chất lượng cao cấp</li>
                <li>✅ Độ bền vượt trội</li>
                <li>✅ An toàn cho sức khỏe</li>
                <li>✅ Dễ dàng thi công</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300">
                Tư vấn ngay
              </button>
              <button className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
