'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '+919876543210'; // Change to actual number
const WHATSAPP_MESSAGE = 'Hello Epic Legends, I am interested in your products. Can you please share more details?';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show button after scrolling
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
      }`}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
        
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 bg-slate-800 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
        </div>
      </button>
    </div>
  );
}