import React, { useState, useEffect } from "react";

// --- COMPONENT MODAL CHI TIẾT ĐƠN HÀNG (Đã bỏ truncate) ---
const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  // Sử dụng trường 'items' để lấy danh sách sản phẩm (Đã đồng bộ với FastAPI Backend)
  const items = order.items || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-600 transition duration-300 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center border border-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-2">
            Chi Tiết Đơn Hàng #{order.id}
          </h2>

          {/* Thông tin Khách hàng và Tổng tiền */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-semibold text-gray-700">Khách hàng:</p>
              <p className="font-bold text-xl text-blue-800">
                {order.customer_name}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Số điện thoại:</p>
              <p className="font-bold text-xl text-blue-800">
                {order.customer_phone}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700">Địa chỉ:</p>
              <p className="text-lg font-medium text-gray-800">
                {order.customer_address}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Ngày đặt:</p>
              <p className="font-bold text-xl text-blue-800">
                {new Date(order.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Tổng tiền:</p>
              <p className="font-bold text-3xl text-red-600">
                {order.total_price
                  ? order.total_price.toLocaleString("vi-VN")
                  : 0}{" "}
                VNĐ
              </p>
            </div>
          </div>

          {/* Thông tin Chi tiết sản phẩm */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Danh Sách Sản Phẩm (Tổng: {items.length})
          </h3>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                {/* HIỂN THỊ ĐẦY ĐỦ TÊN SẢN PHẨM (Đã bỏ truncate) */}
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-bold text-lg text-gray-800 break-words">
                    {item.product_name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Mã SP:{" "}
                    <span className="font-medium text-blue-700">
                      {item.product_id}
                    </span>
                  </p>
                </div>

                {/* Số lượng và Giá */}
                <div className="ml-4 text-right flex-shrink-0">
                  <p className="text-lg font-bold text-red-500">
                    {item.price ? item.price.toLocaleString("vi-VN") : 0} VNĐ
                  </p>
                  <p className="text-sm text-gray-600">x {item.quantity}</p>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center text-gray-500 p-4 border rounded-lg bg-gray-50">
                Không có chi tiết sản phẩm cho đơn hàng này.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH ADMIN ---
const Admin = () => {
  const [activeTab, setActiveTab] = useState("add-product");
  const [orders, setOrders] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category_id: "",
    brand_id: "",
    price: "",
    description: "",
    images: ["https://picsum.photos/300/200?random=" + Math.random()],
  });

  const API_BASE_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetchOrders();
    fetchBrandsAndCategories();
  }, []);

  // --- Logic Modal ---
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // --- API Orders ---
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      const data = await response.json();

      const normalizedOrders = data.map((order) => ({
        ...order,
        items: order.items || [],
      }));

      setOrders(normalizedOrders);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  };

  // --- API Brands/Categories ---
  const fetchBrandsAndCategories = async () => {
    try {
      const brandsResponse = await fetch(
        `${API_BASE_URL}/products/brands/list`
      );
      const brandsData = await brandsResponse.json();
      setBrands(brandsData);

      const categoriesResponse = await fetch(
        `${API_BASE_URL}/products/categories/list`
      );
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      if (brandsData.length > 0) {
        setNewProduct((prev) => ({ ...prev, brand_id: brandsData[0].id }));
      }
      if (categoriesData.length > 0) {
        setNewProduct((prev) => ({
          ...prev,
          category_id: categoriesData[0].id,
        }));
      }
    } catch (error) {
      console.error("Lỗi khi lấy brands/categories:", error);
    }
  };

  // --- Xử lý POST Sản Phẩm ---
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const productData = {
      name: newProduct.name,
      brand_id: parseInt(newProduct.brand_id),
      category_id: parseInt(newProduct.category_id),
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      images: [`https://picsum.photos/300/200?random=${Math.random()}`],
    };

    if (
      !productData.brand_id ||
      !productData.category_id ||
      isNaN(productData.price)
    ) {
      alert("Vui lòng chọn Hãng, Loại và nhập Giá hợp lệ.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Thêm sản phẩm "${result.name}" thành công!`);

        setNewProduct({
          name: "",
          category_id: categories.length > 0 ? categories[0].id : "",
          brand_id: brands.length > 0 ? brands[0].id : "",
          price: "",
          description: "",
          images: [`https://picsum.photos/300/200?random=${Math.random()}`],
        });
      } else {
        const error = await response.json();
        alert(
          "Lỗi khi thêm sản phẩm: " + JSON.stringify(error.detail || error)
        );
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Lỗi khi thêm sản phẩm (Kết nối Server thất bại)!");
    }
  };

  // --- Xử lý thay đổi Input/Select ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="pt-24 py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          TRANG QUẢN TRỊ
        </h1>

        {/* Tabs */}
        <div className="flex border-b mb-6 bg-white shadow-sm rounded-t-lg overflow-hidden">
          <button
            className={`px-6 py-3 font-medium transition duration-300 ${
              activeTab === "add-product"
                ? "border-b-4 border-blue-800 text-blue-800 bg-gray-50"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("add-product")}
          >
            Thêm Sản Phẩm
          </button>
          <button
            className={`px-6 py-3 font-medium transition duration-300 ${
              activeTab === "orders"
                ? "border-b-4 border-blue-800 text-blue-800 bg-gray-50"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Đơn Hàng ({orders.length})
          </button>
        </div>

        {/* Thêm Sản Phẩm Tab */}
        {activeTab === "add-product" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Thêm Sản Phẩm Mới
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                      placeholder="Nhập tên sản phẩm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Giá *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="1000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                      placeholder="Nhập giá sản phẩm (VND)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Loại sản phẩm (Category) *
                    </label>
                    <select
                      name="category_id"
                      value={newProduct.category_id}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="" disabled>
                        Chọn loại sản phẩm
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Hãng (Brand) *
                    </label>
                    <select
                      name="brand_id"
                      value={newProduct.brand_id}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="" disabled>
                        Chọn hãng
                      </option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Mô tả sản phẩm *
                  </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Hình ảnh sản phẩm (Tạm thời)
                  </label>
                  <div className="flex items-center justify-center">
                    <img
                      src={newProduct.images[0]}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-md"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition duration-300 text-lg font-semibold shadow-lg"
                >
                  Thêm Sản Phẩm Mới
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Đơn Hàng Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Danh Sách Đơn Hàng
            </h2>

            {orders.length === 0 ? (
              <div className="text-center text-gray-500 py-8 text-xl bg-white rounded-lg shadow-md">
                Chưa có đơn hàng nào
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-xl overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        Mã ĐH
                      </th>
                      <th
                        className="px-6 py-4 text-left font-semibold"
                        style={{ minWidth: "150px" }}
                      >
                        Tên Khách hàng
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Số điện thoại
                      </th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Tổng tiền
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-blue-50/50 transition duration-150"
                      >
                        <td className="px-6 py-4 font-medium text-blue-600">
                          #{order.id}
                        </td>
                        {/* Đã bỏ 'truncate' để cho phép tên xuống dòng */}
                        <td className="px-6 py-4 font-medium break-words">
                          {order.customer_name}
                        </td>
                        <td className="px-6 py-4">{order.customer_phone}</td>
                        <td className="px-6 py-4 font-bold text-red-600 text-right">
                          {order.total_price
                            ? order.total_price.toLocaleString("vi-VN")
                            : 0}{" "}
                          VNĐ
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg transition duration-300"
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Chi Tiết Đơn Hàng */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Admin;
