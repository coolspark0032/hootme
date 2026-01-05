
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { MockAuthService } from '../services/mockFirebase';

const Profile: React.FC = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    MockAuthService.logout();
    setUser(null);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-6">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-3xl font-bold">
          {user.displayName.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold capitalize">
            {user.role} Account
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          <Link to="/orders" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-box text-pink-500 w-5"></i>
              <span className="font-medium">My Orders</span>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-300"></i>
          </Link>
          
          <Link to="/cart" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-cart-shopping text-pink-500 w-5"></i>
              <span className="font-medium">My Cart</span>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-300"></i>
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 text-red-500">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-right-from-bracket w-5"></i>
              <span className="font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400">
        Hootme Version 1.0.0
      </div>
    </div>
  );
};

export default Profile;
