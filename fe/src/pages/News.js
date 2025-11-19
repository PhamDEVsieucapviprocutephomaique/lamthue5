import React from "react";

const News = () => {
  const featuredNews = {
    id: 1,
    title: "Xu hướng màu sơn nội thất 2024 - Tương lai của không gian sống",
    excerpt:
      "Khám phá những xu hướng màu sắc mới nhất sẽ thống trị thiết kế nội thất trong năm tới. Từ những tông màu trung tính ấm áp đến các màu sắc táo bạo...",
    date: "15/12/2023",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    category: "Xu hướng",
  };

  const otherNews = [
    {
      id: 2,
      title: "Công nghệ sơn thân thiện môi trường",
      excerpt: "Sơn không mùi, an toàn cho sức khỏe gia đình bạn",
      date: "10/12/2023",
      image:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=200&h=150&fit=crop",
    },
    {
      id: 3,
      title: "Bí quyết chọn màu sơn phòng ngủ",
      excerpt: "Màu sắc ảnh hưởng đến chất lượng giấc ngủ như thế nào",
      date: "05/12/2023",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=150&fit=crop",
    },
    {
      id: 4,
      title: "Sơn chống nóng - Giải pháp mùa hè",
      excerpt: "Công nghệ sơn cách nhiệt giúp giảm nhiệt độ hiệu quả",
      date: "01/12/2023",
      image:
        "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=200&h=150&fit=crop",
    },
    {
      id: 5,
      title: "Hướng dẫn bảo quản sơn đúng cách",
      excerpt: "Giữ sơn luôn trong tình trạng tốt nhất sau khi mở nắp",
      date: "28/11/2023",
      image:
        "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=200&h=150&fit=crop",
    },
    {
      id: 6,
      title: "Sơn epoxy cho sàn nhà xưởng",
      excerpt: "Giải pháp tối ưu cho sàn công nghiệp",
      date: "25/11/2023",
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=150&fit=crop",
    },
  ];

  return (
    <div className="pt-16 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          TIN TỨC
        </h1>

        {/* Featured news */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 hover:shadow-lg transition duration-300">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div
                className="h-64 md:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredNews.image})` }}
              ></div>
            </div>
            <div className="md:w-1/2 p-6">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {featuredNews.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-blue-800 transition duration-300 cursor-pointer">
                {featuredNews.title}
              </h2>
              <p className="text-gray-600 mb-4">{featuredNews.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  {featuredNews.date}
                </span>
                <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition duration-300">
                  Đọc tiếp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other news grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 group"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-800 transition duration-300 cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
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

export default News;
