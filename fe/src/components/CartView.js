// src/components/CartView.js
import React, { useState, useEffect } from "react";
// *** IMPORT MỚI ***
import { getCartItems, removeFromCart } from "../utils/cartUtils";

const CartView = ({ isOpen, onClose }) => {
  const [localCartItems, setLocalCartItems] = useState([]);

  // Load dữ liệu từ Local Storage mỗi khi Modal mở
  useEffect(() => {
    if (isOpen) {
      setLocalCartItems(getCartItems());
    }
  }, [isOpen]);

  // Xử lý khi nhấn nút Xóa
  const handleRemove = (productId) => {
    removeFromCart(productId);
    // Cập nhật lại state sau khi xóa khỏi localStorage
    setLocalCartItems(getCartItems());
  };

  if (!isOpen) return null;

  // Component nhỏ cho từng sản phẩm trong giỏ
  const CartItem = ({ item }) => {
    // Tính tổng phụ (Subtotal) cho sản phẩm này
    // Lưu ý: Tạm thời không cần tính Subtotal theo yêu cầu, chỉ hiển thị thông tin

    return (
      <div className="flex justify-between items-start py-4 border-b">
        <div className="flex items-center space-x-4 flex-grow">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded flex-shrink-0"
          />

          {/* Tên và thông tin chi tiết */}
          <div>
            <h4 className="font-semibold text-gray-800">{item.name}</h4>
            <p className="text-sm text-gray-500">Hãng: {item.brand}</p>
            <p className="text-sm text-gray-500">Loại: {item.categoryName}</p>
            <p className="text-sm text-red-600 font-bold mt-1">
              Giá: {item.price}
            </p>
            <p className="text-sm text-blue-600">Số lượng: {item.quantity}</p>
          </div>
        </div>

        {/* Nút xóa sản phẩm */}
        <button
          onClick={() => handleRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition duration-200 flex-shrink-0 ml-4"
          title="Xóa sản phẩm"
        >
          &times;
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Sidebar Giỏ hàng */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold text-blue-800">
            🛒 Giỏ Hàng ({localCartItems.length} mục)
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-3xl font-light leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          {localCartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Giỏ hàng của bạn hiện đang trống.
            </p>
          ) : (
            <div>
              {localCartItems.map((item, index) => (
                // Sử dụng index làm key tạm thời vì sản phẩm có thể trùng ID
                <CartItem key={index} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* *** NÚT TƯ VẤN *** */}
        <div className="p-6 border-t flex flex-col space-y-3">
          <button
            onClick={() =>
              alert("Chuyển hướng đến trang Tư vấn hoặc Form liên hệ!")
            }
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-200"
          >
            TƯ VẤN NGAY VỀ ĐƠN HÀNG
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded transition duration-200"
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
