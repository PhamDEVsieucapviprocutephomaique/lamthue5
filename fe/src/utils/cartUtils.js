// src/utils/cartUtils.js

const CART_STORAGE_KEY = "shoppingCart";

// Hàm lấy giỏ hàng hiện tại từ Local Storage
export const getCartItems = () => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Lỗi khi đọc giỏ hàng từ Local Storage:", e);
    return [];
  }
};

// Hàm lưu giỏ hàng vào Local Storage
const saveCartItems = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (e) {
    console.error("Lỗi khi lưu giỏ hàng vào Local Storage:", e);
  }
};

// Hàm Thêm sản phẩm vào giỏ hàng (mặc định số lượng 1)
export const addToCart = (product) => {
  const currentCart = getCartItems();

  // Tạo đối tượng sản phẩm mới chỉ lấy các trường cần thiết
  const newItem = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    categoryName: product.categoryName,
    price: product.price, // Giá đã format
    image: product.image,
    quantity: 1, // Mặc định là 1
  };

  // Kiểm tra nếu sản phẩm đã tồn tại, tăng số lượng (tạm thời bỏ qua logic tăng số lượng theo yêu cầu hiện tại, chỉ thêm mới)
  // Để đơn giản theo yêu cầu hiện tại (chỉ cần lưu sản phẩm), ta chỉ thêm mới:

  // Nếu muốn đảm bảo sản phẩm không trùng lặp, bạn có thể uncomment đoạn này:
  // const existingIndex = currentCart.findIndex(item => item.id === product.id);
  // if (existingIndex !== -1) {
  //     currentCart[existingIndex].quantity += 1;
  // } else {
  //     currentCart.push(newItem);
  // }

  currentCart.push(newItem); // Thêm vào giỏ hàng, kể cả khi trùng lặp (dễ dàng hơn khi xóa/sửa)

  saveCartItems(currentCart);

  // Trả về tổng số lượng sản phẩm sau khi thêm
  return currentCart.reduce((total, item) => total + item.quantity, 0);
};

// Hàm xóa toàn bộ giỏ hàng
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

// Hàm xóa 1 sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => {
  const currentCart = getCartItems();
  const updatedCart = currentCart.filter((item) => item.id !== productId);
  saveCartItems(updatedCart);
};

export default { addToCart, getCartItems, removeFromCart, clearCart };
