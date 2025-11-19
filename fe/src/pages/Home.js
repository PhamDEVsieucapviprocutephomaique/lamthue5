import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import ProductSection from "../components/ProductSection";
import CategoryNav from "../components/CategoryNav";
import NewsSection from "../components/NewsSection";
import VideoModal from "../components/VideoModal";

const Home = () => {
  // Data sản phẩm theo nhóm
  const productGroups = [
    {
      id: "interior",
      name: "Sơn Nội Thất",
      count: 8,
      products: [
        {
          id: 1,
          name: "Sơn nội thất cao cấp Dulux",
          price: "4,666,670 VNĐ",
          brand: "Dulux",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        },
      ],
    },
    {
      id: "exterior",
      name: "Sơn Ngoại Thất",
      count: 11,
      products: [
        {
          id: 2,
          name: "Sơn ngoại thất Jotun",
          price: "9,500,000 VNĐ",
          brand: "Jotun",
          image:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
        },
      ],
    },
    {
      id: "waterproof",
      name: "Sơn Chống Thấm",
      count: 2,
      products: [
        {
          id: 3,
          name: "Sơn chống thấm Kova",
          price: "11,666,700 VNĐ",
          brand: "Kova",
          image:
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300&h=200&fit=crop",
        },
      ],
    },
    {
      id: "decorative",
      name: "Sơn Trang Trí",
      count: 13,
      products: [
        {
          id: 4,
          name: "Sơn trang trí Mykolor",
          price: "22,000,000 VNĐ",
          brand: "Mykolor",
          image:
            "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop",
        },
      ],
    },
    {
      id: "wood",
      name: "Sơn Gỗ",
      count: 5,
      products: [
        {
          id: 5,
          name: "Sơn gỗ Nippon",
          price: "40,000,000 VNĐ",
          brand: "Nippon",
          image:
            "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300&h=200&fit=crop",
        },
      ],
    },
    {
      id: "metal",
      name: "Sơn Kim Loại",
      count: 3,
      products: [
        {
          id: 6,
          name: "Sơn kim loại Maxilite",
          price: "55,000,000 VNĐ",
          brand: "Maxilite",
          image:
            "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=300&h=200&fit=crop",
        },
      ],
    },
  ];

  // Data tin tức
  const news = [
    {
      id: 1,
      title: "Xu hướng màu sơn nội thất 2023",
      excerpt: "Khám phá những màu sắc thịnh hành cho không gian sống",
      date: "15/10/2023",
    },
    {
      id: 2,
      title: "Hướng dẫn chọn sơn phù hợp cho ngôi nhà",
      excerpt: "Bí quyết lựa chọn sơn theo phong cách và không gian",
      date: "10/10/2023",
    },
    {
      id: 3,
      title: "Công nghệ sơn thân thiện môi trường",
      excerpt: "Sơn không mùi, an toàn cho sức khỏe gia đình",
      date: "05/10/2023",
    },
    {
      id: 4,
      title: "Bí quyết bảo quản sơn đúng cách",
      excerpt: "Cách giữ sơn luôn trong tình trạng tốt nhất sau khi mở nắp",
      date: "01/10/2023",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("interior");
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    // Show video modal on first visit
    const hasSeenVideo = localStorage.getItem("hasSeenVideo");
    if (!hasSeenVideo) {
      const timer = setTimeout(() => {
        setShowVideoModal(true);
        localStorage.setItem("hasSeenVideo", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-16">
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
      <HeroSlider />
      <CategoryNav
        categories={productGroups}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="container mx-auto px-4 py-8">
        {productGroups.map((group, index) => (
          <div id={group.id} key={group.id}>
            <ProductSection
              group={group}
              isLast={index === productGroups.length - 1}
            />
          </div>
        ))}
      </div>
      <NewsSection news={news} />
    </div>
  );
};

export default Home;
