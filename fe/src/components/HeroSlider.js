import React from "react";

const HeroSlider = () => {
  return (
    <div className="relative h-[700px] overflow-hidden mt-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            SƠN CAO CẤP - ĐẲNG CẤP HOÀN HẢO
          </h1>
          <p className="text-2xl md:text-3xl mb-10">
            Khám phá bộ sưu tập sơn đa dạng với chất lượng vượt trội
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-16 rounded-lg text-xl transition duration-300">
            KHÁM PHÁ NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
