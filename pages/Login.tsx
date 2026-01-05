
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { MockAuthService } from '../services/mockFirebase';
import { ADMIN_EMAIL } from '../constants';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert("Please enter a valid email");
      return;
    }
    const user = await MockAuthService.login(email, name || 'User');
    setUser(user);
    
    if (user.email === ADMIN_EMAIL) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const isAdminEmail = email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md space-y-8 transition-all duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-black text-pink-500 italic">Hootme</h1>
          <p className="text-gray-500 mt-2">
            {isAdminEmail ? "Welcome Back, Chief Admin" : "Login or Signup to continue"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              {isAdminEmail && (
                <span className="flex items-center gap-1 text-[10px] bg-pink-600 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                  <i className="fa-solid fa-shield-check"></i> ADMIN VERIFIED
                </span>
              )}
            </div>
            <input 
              type="email" 
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                isAdminEmail ? 'border-pink-500 ring-2 ring-pink-100' : 'focus:ring-pink-500'
              }`} 
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none" 
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className={`w-full text-white py-3 rounded-lg font-bold text-lg transition-all shadow-lg ${
              isAdminEmail 
                ? 'bg-gray-900 hover:bg-black shadow-gray-200' 
                : 'bg-pink-500 hover:bg-pink-600 shadow-pink-100'
            }`}
          >
            {isAdminEmail ? 'Access Admin Panel' : 'Continue Shopping'}
          </button>
        </form>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            Admin access is restricted to verified email addresses only. If you are the owner, please use your official gmail to manage the dashboard.
          </p>
        </div>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree to Hootme's <span className="underline">Terms</span> and <span className="underline">Privacy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
