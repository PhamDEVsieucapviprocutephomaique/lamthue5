import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          LIÊN HỆ
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              THÔNG TIN LIÊN HỆ
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-800 text-white p-3 rounded-lg mr-4">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-lg">Địa chỉ</h3>
                  <p className="text-gray-600">
                    123 Đường ABC, Phường XYZ, Quận 1, TP.HCM
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-800 text-white p-3 rounded-lg mr-4">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-lg">Điện thoại</h3>
                  <p className="text-gray-600">
                    (0123) 456 789 - (0987) 654 321
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-800 text-white p-3 rounded-lg mr-4">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">
                    info@sondep.com - support@sondep.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-800 text-white p-3 rounded-lg mr-4">
                  ⏰
                </div>
                <div>
                  <h3 className="font-bold text-lg">Giờ làm việc</h3>
                  <p className="text-gray-600">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                  <p className="text-gray-600">Chủ nhật: 8:00 - 12:00</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Bản đồ</h3>
              <div className="h-64 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                <span className="text-blue-800 font-medium">
                  Google Maps sẽ được tích hợp ở đây
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              GỬI TIN NHẮN
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Họ và tên *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Nội dung *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                GỬI TIN NHẮN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
