import React from "react";

const NewsSection = ({ news }) => {
  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          TIN TỨC NỔI BẬT
        </h2>

        {/* Featured News - Big */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 hover:shadow-lg transition duration-300">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-lg">
                  Hình ảnh tin tức nổi bật
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-blue-800 transition duration-300 cursor-pointer">
                {featuredNews.title}
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                {featuredNews.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">{featuredNews.date}</span>
                <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded transition duration-300">
                  Đọc tiếp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other News - All same size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Hình ảnh tin tức</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800 hover:text-blue-800 transition duration-300 cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{item.date}</span>
                  <button className="text-blue-800 hover:text-red-600 transition duration-300 font-medium">
                    Đọc thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
