import React, { useEffect } from "react";

const VideoModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          className="absolute -top-12 right-0 text-white text-4xl hover:text-red-500 transition duration-300 z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Video Container */}
        <div className="relative pt-[56.25%]">
          {" "}
          {/* 16:9 Aspect Ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
            src="https://www.youtube.com/embed/0VNbvLBhAV8?autoplay=1"
            title="Video giới thiệu"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 rounded-b-lg text-center">
          <p className="text-gray-600">
            Công ty Thanhdanh - Chất lượng tạo nên thương hiệu
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
