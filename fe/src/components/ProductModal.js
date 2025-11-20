import React from "react";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl sm:text-3xl text-gray-600 hover:text-red-600 transition z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* LEFT: Image */}
          <div className="w-full md:w-1/2">
            <div
              className="h-56 xs:h-64 sm:h-72 md:h-full bg-cover bg-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="w-full md:w-1/2 flex flex-col p-4 sm:p-8">
            {/* Header */}
            <div className="flex-shrink-0 pb-3 sm:pb-4 border-b">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-red-600 font-bold text-xl sm:text-2xl">
                {product.price}
              </p>
            </div>

            {/* DESCRIPTION — fixed scroll box */}
            <div className="mt-4 flex-grow">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">
                Mô tả sản phẩm
              </h3>

              {/* Responsive fixed-height description box */}
              <div
                className="
                overflow-y-auto overflow-x-hidden pr-2
                max-h-[180px]
                sm:max-h-[220px]
                md:max-h-[300px]
              "
              >
                <p className="text-gray-600 leading-relaxed whitespace-pre-line break-words w-full text-sm sm:text-base">
                  {product.description ||
                    "Không có mô tả chi tiết cho sản phẩm này."}
                </p>
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex space-x-3 sm:space-x-4 pt-4 border-t flex-shrink-0 mt-auto">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 px-4 rounded-lg text-base sm:text-lg font-semibold transition">
                Tư vấn ngay
              </button>
              <button className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2 sm:py-3 px-4 rounded-lg text-base sm:text-lg font-semibold transition">
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
