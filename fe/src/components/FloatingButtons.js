import React from "react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 space-y-3">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-blue-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:bg-blue-600 transition duration-300 animate-pulse block"
        title="Chat Zalo"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-5-8c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" />
        </svg>
      </a>

      {/* Facebook Button */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-blue-800 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:bg-blue-900 transition duration-300 animate-bounce block"
        title="Facebook"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Phone Button */}
      <a
        href="tel:0123456789"
        className="w-14 h-14 bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:bg-green-600 transition duration-300 animate-pulse block"
        title="Gọi ngay"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z" />
        </svg>
      </a>

      {/* Messenger Button */}
      <a
        href="https://m.me/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-blue-400 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:bg-blue-500 transition duration-300 animate-bounce block"
        title="Messenger"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.36 2 2 6.36 2 12c0 3.18 1.59 5.98 4 7.64V22l3.46-1.9c.92.25 1.88.4 2.86.4 5.64 0 10-4.36 10-10S17.64 2 12 2zm-1 12l-3-3 6-6 3 3-6 6z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingButtons;
