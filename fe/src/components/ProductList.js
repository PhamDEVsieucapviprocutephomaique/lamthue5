import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products, categoryName }) => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">
          {categoryName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.slice(0, visibleProducts).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 group"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-800 transition duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-bold">
                    {product.price}
                  </span>
                  <Link
                    to="/san-pham"
                    className="bg-blue-800 text-white px-3 py-1 rounded text-sm hover:bg-blue-900 transition duration-300"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
