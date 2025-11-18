import React from 'react';
import { ShoppingBag, User, Search, Menu, Sparkles } from 'lucide-react';
import { AppContextType } from '../types';

interface NavBarProps {
  ctx: AppContextType;
  toggleMenu: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ ctx, toggleMenu }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-royal-900">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => ctx.setView('HOME')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-royal-900 to-royal-700 rounded-xl flex items-center justify-center text-white mr-3 shadow-lg shadow-royal-900/20">
              <span className="text-xl font-bold">ف</span>
            </div>
            <span className="text-2xl font-black text-royal-900 tracking-tight">فخامة</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-royal-700 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="وش بخاطرك اليوم؟ ساعة، عطر..."
                className="block w-full pl-10 pr-12 py-3 border-none rounded-2xl bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lavender-400/50 focus:bg-white transition-all"
                value={ctx.searchQuery}
                onChange={(e) => ctx.setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <button 
              onClick={() => ctx.setView('USER_DASHBOARD')}
              className="p-3 rounded-xl text-gray-500 hover:text-royal-900 hover:bg-gray-50 transition-colors hidden sm:block"
            >
              <User size={22} />
            </button>
            
            <button 
              onClick={() => ctx.setView('CART')}
              className="p-3 rounded-xl text-royal-900 hover:bg-royal-50 transition-colors relative group"
            >
              <ShoppingBag size={22} />
              {ctx.cart.length > 0 && (
                <span className="absolute top-2 left-2 w-5 h-5 bg-red-500 border-2 border-white text-white text-[10px] font-bold flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  {ctx.cart.length}
                </span>
              )}
            </button>
            
             <button 
              className="md:hidden p-3 rounded-xl text-gray-500"
            >
              <Search size={22} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};