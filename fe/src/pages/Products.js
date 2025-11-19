import React, { useState } from "react";
import ProductList from "../components/ProductList";

const Products = () => {
  const brands = [
    "Tất cả",
    "Dulux",
    "Jotun",
    "Kova",
    "Mykolor",
    "Nippon",
    "Maxilite",
    "Spec",
  ];
  const categories = [
    { id: "interior", name: "Sơn nội thất" },
    { id: "exterior", name: "Sơn ngoại thất" },
    { id: "waterproof", name: "Sơn chống thấm" },
    { id: "decorative", name: "Sơn trang trí" },
    { id: "wood", name: "Sơn gỗ" },
    { id: "metal", name: "Sơn kim loại" },
  ];

  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [selectedCategory, setSelectedCategory] = useState("interior");

  // Data sản phẩm đầy đủ
  const products = [
    // Sơn nội thất
    {
      id: 1,
      name: "Sơn nội thất cao cấp A",
      brand: "Dulux",
      category: "interior",
      description: "Sơn chất lượng cao cho không gian nội thất",
      price: "500.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Sơn nội thất siêu bền B",
      brand: "Jotun",
      category: "interior",
      description: "Độ bền vượt trội, dễ lau chùi",
      price: "650.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Sơn nội thất chống ẩm C",
      brand: "Kova",
      category: "interior",
      description: "Đặc biệt cho khu vực ẩm ướt",
      price: "750.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Sơn nội thất mờ D",
      brand: "Mykolor",
      category: "interior",
      description: "Hoàn thiện mờ sang trọng",
      price: "550.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Sơn nội thất bóng E",
      brand: "Nippon",
      category: "interior",
      description: "Bề mặt bóng sáng cao cấp",
      price: "600.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300&h=200&fit=crop",
    },
    {
      id: 6,
      name: "Sơn nội thất bán bóng F",
      brand: "Maxilite",
      category: "interior",
      description: "Độ bóng vừa phải, dễ bảo trì",
      price: "580.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=300&h=200&fit=crop",
    },
    {
      id: 7,
      name: "Sơn nội thất siêu trắng",
      brand: "Spec",
      category: "interior",
      description: "Màu trắng tinh khiết, phủ đều",
      price: "520.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=200&fit=crop",
    },
    {
      id: 8,
      name: "Sơn nội thất chống bám bẩn",
      brand: "Dulux",
      category: "interior",
      description: "Hạn chế bụi bẩn bám trên bề mặt",
      price: "680.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=300&h=200&fit=crop",
    },

    // Sơn ngoại thất
    {
      id: 9,
      name: "Sơn ngoại thất chống nắng A",
      brand: "Jotun",
      category: "exterior",
      description: "Chống chịu thời tiết khắc nghiệt",
      price: "800.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop",
    },
    {
      id: 10,
      name: "Sơn ngoại thất bền màu B",
      brand: "Dulux",
      category: "exterior",
      description: "Giữ màu sắc lâu dài",
      price: "900.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop",
    },
    {
      id: 11,
      name: "Sơn ngoại thất chống bám bẩn C",
      brand: "Kova",
      category: "exterior",
      description: "Hạn chế bụi bẩn bám trên bề mặt",
      price: "950.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop",
    },
    {
      id: 12,
      name: "Sơn ngoại thất chống rong rêu D",
      brand: "Nippon",
      category: "exterior",
      description: "Ngăn ngừa sự phát triển của rong rêu",
      price: "1.100.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1567446537711-4302fea3c331?w=300&h=200&fit=crop",
    },

    // Sơn chống thấm
    {
      id: 13,
      name: "Sơn chống thấm cao cấp A",
      brand: "Spec",
      category: "waterproof",
      description: "Hiệu quả chống thấm tối ưu",
      price: "1.200.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    },
    {
      id: 14,
      name: "Sơn chống thấm đa năng B",
      brand: "Kova",
      category: "waterproof",
      description: "Ứng dụng đa dạng",
      price: "1.000.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    },
    {
      id: 15,
      name: "Sơn chống thấm gốc xi măng C",
      brand: "Jotun",
      category: "waterproof",
      description: "Dành cho bề mặt xi măng, bê tông",
      price: "1.300.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300&h=200&fit=crop",
    },

    // Sơn trang trí
    {
      id: 16,
      name: "Sơn hiệu ứng giả đá",
      brand: "Maxilite",
      category: "decorative",
      description: "Tạo hiệu ứng đá tự nhiên",
      price: "1.500.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=200&fit=crop",
    },
    {
      id: 17,
      name: "Sơn hiệu ứng kim loại",
      brand: "Spec",
      category: "decorative",
      description: "Ánh kim loại sang trọng",
      price: "1.800.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=300&h=200&fit=crop",
    },
    {
      id: 18,
      name: "Sơn hiệu ứng gỗ",
      brand: "Kova",
      category: "decorative",
      description: "Vân gỗ tự nhiên chân thực",
      price: "1.600.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop",
    },

    // Sơn gỗ
    {
      id: 19,
      name: "Sơn gỗ trong nhà",
      brand: "Mykolor",
      category: "wood",
      description: "Bảo vệ và làm đẹp đồ gỗ nội thất",
      price: "450.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: 20,
      name: "Sơn gỗ ngoài trời",
      brand: "Maxilite",
      category: "wood",
      description: "Chống mối mọt, chịu thời tiết",
      price: "550.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&h=200&fit=crop",
    },

    // Sơn kim loại
    {
      id: 21,
      name: "Sơn chống gỉ sắt thép",
      brand: "Jotun",
      category: "metal",
      description: "Bảo vệ kim loại khỏi gỉ sét",
      price: "480.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300&h=200&fit=crop",
    },
    {
      id: 22,
      name: "Sơn kim loại nhiệt độ cao",
      brand: "Dulux",
      category: "metal",
      description: "Chịu nhiệt lên đến 600°C",
      price: "750.000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const brandMatch =
      selectedBrand === "Tất cả" || product.brand === selectedBrand;
    const categoryMatch = product.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  return (
    <div className="pt-16 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          SẢN PHẨM
        </h1>

        {/* Filter section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Danh mục sản phẩm</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                      selectedCategory === category.id
                        ? "bg-blue-800 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Hãng sơn</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                      selectedBrand === brand
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ProductList
          products={filteredProducts}
          categoryName={
            categories.find((cat) => cat.id === selectedCategory)?.name ||
            "Sản phẩm"
          }
        />
      </div>
    </div>
  );
};

export default Products;
