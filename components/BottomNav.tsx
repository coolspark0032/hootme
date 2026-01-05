
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../App';

const BottomNav: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useAppContext();

  const isActive = (path: string) => pathname === path ? 'meesho-pink' : 'text-gray-500';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 z-50">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
        <i className="fa-solid fa-house text-lg"></i>
        <span className="text-[10px]">Home</span>
      </Link>
      
      <Link to="/category/fashion" className={`flex flex-col items-center gap-1 ${isActive('/category/fashion')}`}>
        <i className="fa-solid fa-list-ul text-lg"></i>
        <span className="text-[10px]">Categories</span>
      </Link>

      <Link to="/orders" className={`flex flex-col items-center gap-1 ${isActive('/orders')}`}>
        <i className="fa-solid fa-bag-shopping text-lg"></i>
        <span className="text-[10px]">Orders</span>
      </Link>

      <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}>
        <i className="fa-solid fa-user text-lg"></i>
        <span className="text-[10px]">Account</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
