import React, { useState } from "react";

const ProductCategory = ({ categories, onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          DANH MỤC SẢN PHẨM
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border-2 border-transparent group-hover:border-blue-800">
                <div
                  className="h-24 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="p-3 text-center">
                  <h3
                    className={`font-medium text-sm ${
                      activeCategory === category.id
                        ? "text-blue-800"
                        : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
