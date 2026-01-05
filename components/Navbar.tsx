
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { ADMIN_EMAIL } from '../constants';

const Navbar: React.FC = () => {
  const { user, cart } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold meesho-pink">Hootme</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-xl relative">
          <input 
            type="text" 
            placeholder="Search for Products, Brands and More" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {user?.email === ADMIN_EMAIL && (
            <Link to="/admin" className="hidden md:flex flex-col items-center text-gray-600 hover:text-pink-600">
              <i className="fa-solid fa-user-shield text-xl"></i>
              <span className="text-xs mt-1">Admin</span>
            </Link>
          )}
          
          <Link to="/profile" className="hidden md:flex flex-col items-center text-gray-600 hover:text-pink-600">
            <i className="fa-regular fa-user text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-pink-600 relative">
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            <span className="text-xs mt-1">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Search Bar - Mobile */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            placeholder="Search for Products, Brands and More" 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
