import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
  onClick: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(42,33,80,0.15)] hover:-translate-y-1 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(product.id)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-[#F3F4F6] overflow-hidden cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-royal-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider">
              جديد
            </span>
          )}
          {product.isTrending && (
            <span className="bg-white/90 backdrop-blur-md text-royal-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider border border-royal-900/10">
              الأكثر طلباً
            </span>
          )}
        </div>

        {/* Side Actions (Wishlist & Quick View) */}
        <div className={`absolute top-4 left-4 flex flex-col gap-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-lg transition-colors"
            onClick={(e) => { e.stopPropagation(); /* Add wishlist logic */ }}
          >
            <Heart size={18} className={isHovered ? 'scale-100' : 'scale-90'} />
          </button>
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-royal-900 hover:bg-royal-50 shadow-lg transition-colors"
            onClick={(e) => { e.stopPropagation(); onClick(product.id); }}
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Add to Cart Overlay Button */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className="w-full py-3.5 bg-royal-900 text-white rounded-xl font-medium text-sm shadow-xl hover:bg-royal-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            إضافة للسلة
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-gray-700 pt-0.5">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-royal-900 text-lg leading-snug mb-2 group-hover:text-royal-700 transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-xl font-black text-royal-900 font-sans">{product.price}</span>
          <span className="text-xs text-gray-500 font-medium">ر.س</span>
          
          {/* Fake discount visual for demo if price > 1000 */}
          {product.price > 1000 && (
            <span className="text-sm text-gray-300 line-through mr-auto font-sans decoration-gray-300">
              {Math.round(product.price * 1.2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};