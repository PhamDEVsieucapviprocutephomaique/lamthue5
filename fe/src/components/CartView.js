import React, { useState, useEffect } from "react";
import { getCartItems, removeFromCart } from "../utils/cartUtils";

const CartView = ({ isOpen, onClose }) => {
  const [localCartItems, setLocalCartItems] = useState([]);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = "http://127.0.0.1:8000/api";

  // Load dữ liệu từ Local Storage mỗi khi Modal mở
  useEffect(() => {
    if (isOpen) {
      setLocalCartItems(getCartItems());
    }
  }, [isOpen]);

  // Xử lý khi nhấn nút Xóa
  const handleRemove = (productId) => {
    removeFromCart(productId);
    setLocalCartItems(getCartItems());
  };

  // Xử lý tăng số lượng
  const handleIncreaseQuantity = (productId) => {
    setLocalCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Xử lý giảm số lượng
  const handleDecreaseQuantity = (productId) => {
    setLocalCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Tính tổng giá từ chuỗi giá
  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^\d]/g, "")) || 0;
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return localCartItems.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  // Tính tổng số lượng
  const totalQuantity = localCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Xử lý thay đổi form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý gửi đơn hàng
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (localCartItems.length === 0) {
      alert("Giỏ hàng trống, vui lòng thêm sản phẩm!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Chuẩn bị dữ liệu đơn hàng
      const orderData = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        items: localCartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      // Gửi POST request
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          `✅ Đơn hàng #${
            result.id
          } đã được gửi thành công!\nTổng tiền: ${result.total_price.toLocaleString(
            "vi-VN"
          )} VNĐ`
        );

        // Xóa giỏ hàng sau khi gửi
        localStorage.removeItem("shoppingCart");
        setLocalCartItems([]);
        setFormData({ name: "", phone: "", address: "" });
        setShowConsultForm(false);
        onClose();
      } else {
        const error = await response.json();
        alert("❌ Lỗi: " + (error.detail || "Không thể gửi đơn hàng"));
      }
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
      alert("❌ Lỗi kết nối API. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Component cho từng sản phẩm
  const CartItem = ({ item }) => {
    const itemPrice = parsePrice(item.price);
    const itemTotal = itemPrice * item.quantity;

    return (
      <div className="flex justify-between items-start py-3 px-3 bg-white border border-gray-200 rounded-lg mb-3">
        <div className="flex items-center space-x-3 flex-grow">
          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 object-cover rounded flex-shrink-0"
          />

          <div className="flex-grow min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
              {item.name}
            </h4>
            <p className="text-xs text-gray-500">Hãng: {item.brand}</p>
            <p className="text-xs text-red-600 font-bold mt-1">
              {itemPrice.toLocaleString("vi-VN")} VNĐ
            </p>

            {/* Nút +/- Số lượng */}
            <div className="flex items-center space-x-1 mt-2">
              <button
                onClick={() => handleDecreaseQuantity(item.id)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-5 h-5 rounded transition text-xs"
              >
                −
              </button>
              <span className="text-blue-600 font-bold w-5 text-center text-xs">
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncreaseQuantity(item.id)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-5 h-5 rounded transition text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Cột bên phải: Giá tổng + Nút xóa */}
        <div className="flex flex-col items-end ml-2 flex-shrink-0">
          <p className="text-xs text-red-600 font-bold">
            {itemTotal.toLocaleString("vi-VN")} VNĐ
          </p>
          <button
            onClick={() => handleRemove(item.id)}
            className="text-red-500 hover:text-red-700 text-lg font-bold mt-1"
            title="Xóa sản phẩm"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  const totalPrice = calculateTotal();

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Sidebar Giỏ hàng */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden flex flex-col">
        {/* Header - Sticky */}
        <div className="p-4 border-b flex justify-between items-center bg-white flex-shrink-0">
          <h3 className="text-xl font-bold text-blue-800">
            🛒 Giỏ Hàng ({localCartItems.length})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-3xl font-light leading-none w-8 h-8 flex items-center justify-center"
            title="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {/* Nội dung chính - Scroll */}
        {!showConsultForm ? (
          <>
            {/* Danh sách sản phẩm */}
            <div className="flex-grow overflow-y-auto p-4">
              {localCartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Giỏ hàng của bạn hiện đang trống.
                </p>
              ) : (
                <div>
                  {localCartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Tóm tắt đơn hàng - Sticky bottom */}
            <div className="p-4 border-t bg-gray-50 flex-shrink-0">
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Số sản phẩm:</span>
                  <span className="font-bold text-gray-800">
                    {localCartItems.length}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Tổng số lượng:</span>
                  <span className="font-bold text-gray-800">
                    {totalQuantity}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Tổng tiền:</span>
                  <span className="font-bold text-lg text-red-600">
                    {totalPrice.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              </div>

              {/* Nút tư vấn */}
              <button
                onClick={() => setShowConsultForm(true)}
                disabled={localCartItems.length === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded transition duration-200 mb-2"
              >
                TƯ VẤN NGAY VỀ ĐƠN HÀNG
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition duration-200"
              >
                Tiếp tục mua hàng
              </button>
            </div>
          </>
        ) : (
          /* FORM TƯ VẤN */
          <>
            {/* Form - Scroll */}
            <form
              onSubmit={handleSubmitOrder}
              className="flex-grow overflow-y-auto p-4"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-4">
                📋 Thông tin đặt hàng
              </h3>

              <div className="space-y-3 mb-4">
                {/* Tên khách hàng */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khách hàng *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Nhập tên của bạn"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Nhập địa chỉ chi tiết"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    required
                  ></textarea>
                </div>

                {/* Tóm tắt đơn hàng */}
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">
                    📦 Tóm tắt đơn hàng
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số sản phẩm:</span>
                      <span className="font-bold">{localCartItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng số lượng:</span>
                      <span className="font-bold">{totalQuantity}</span>
                    </div>
                    <div className="border-t pt-1 flex justify-between">
                      <span className="font-bold text-gray-800">
                        Tổng tiền:
                      </span>
                      <span className="font-bold text-red-600 text-sm">
                        {totalPrice.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Nút hành động - Fixed bottom */}
            <div className="p-4 border-t bg-white flex space-x-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowConsultForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition"
              >
                Quay lại
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded transition"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi đơn hàng"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartView;
