
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

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black text-pink-500 italic">Hootme</h1>
          <p className="text-gray-500 mt-2">Login or Signup to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none" 
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email === ADMIN_EMAIL && <p className="text-[10px] text-pink-600 font-bold">Admin mode detected</p>}
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
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-600 transition-all shadow-lg shadow-pink-100"
          >
            Continue with Email
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
        </div>

        <button 
          onClick={() => {
            setEmail('coolspark0032@gmail.com');
            setName('Admin User');
          }}
          className="w-full border border-gray-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5" alt="Google" />
          Quick Admin Login
        </button>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree to Hootme's <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
