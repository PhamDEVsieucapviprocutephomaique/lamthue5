import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SON DEP</h3>
            <p className="text-blue-200">
              Chuyên cung cấp các loại sơn cao cấp với chất lượng vượt trội và
              dịch vụ chuyên nghiệp.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">LIÊN KẾT NHANH</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/san-pham"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/tin-tuc"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/lien-he"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">SẢN PHẨM</h4>
            <ul className="space-y-2 text-blue-200">
              <li className="hover:text-white transition duration-300 cursor-pointer">
                Sơn nội thất
              </li>
              <li className="hover:text-white transition duration-300 cursor-pointer">
                Sơn ngoại thất
              </li>
              <li className="hover:text-white transition duration-300 cursor-pointer">
                Sơn chống thấm
              </li>
              <li className="hover:text-white transition duration-300 cursor-pointer">
                Sơn trang trí
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">THÔNG TIN LIÊN HỆ</h4>
            <ul className="space-y-2 text-blue-200">
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
              <li>Điện thoại: (0123) 456 789</li>
              <li>Email: info@sondep.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300">
          <p>&copy; 2023 SON DEP. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
