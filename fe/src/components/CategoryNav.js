import React from "react";

const CategoryNav = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          DANH MỤC SẢN PHẨM
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`px-8 py-4 rounded-lg font-medium text-lg transition duration-300 ${
                activeCategory === category.id
                  ? "bg-blue-800 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 hover:border-blue-800"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
