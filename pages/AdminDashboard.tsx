
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MockFirestoreService } from '../services/mockFirebase';
import { DashboardStats } from '../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await MockFirestoreService.getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-8 text-center flex flex-col items-center gap-3">
    <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500 font-medium">Authorizing admin access...</p>
  </div>;

  return (
    <div className="space-y-8">
      {/* Admin Alert Banner */}
      <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-pink-500 p-2 rounded-lg">
            <i className="fa-solid fa-lock text-sm"></i>
          </div>
          <div>
            <h2 className="text-sm font-bold">Secure Admin Session Active</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Restricted Management Area</p>
          </div>
        </div>
        <Link to="/profile" className="text-xs font-bold border border-white/20 px-3 py-1 rounded hover:bg-white/10 transition-colors">
          Admin Profile
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Operational Insights</h1>
        <div className="text-sm text-gray-500">Hootme Control Center</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-pink-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Orders</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
            </div>
            <div className="bg-pink-50 p-3 rounded-full text-pink-500">
              <i className="fa-solid fa-bag-shopping text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{stats.totalRevenue}</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-full text-green-500">
              <i className="fa-solid fa-indian-rupee-sign text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalUsers}</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full text-blue-500">
              <i className="fa-solid fa-users text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Visitors</p>
              <h3 className="text-2xl font-bold mt-1">{stats.dailyVisitors}</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-full text-purple-500">
              <i className="fa-solid fa-chart-line text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-gear text-pink-500"></i> Platform Management
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/products" className="bg-gray-50 p-6 rounded-xl text-center hover:bg-pink-50 hover:text-pink-600 transition-all border border-transparent hover:border-pink-200 group">
              <i className="fa-solid fa-box-open text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
              <p className="font-bold text-sm">Product Catalog</p>
              <p className="text-[10px] text-gray-400 mt-1">Add, Edit or Remove</p>
            </Link>
            <Link to="/admin/orders" className="bg-gray-50 p-6 rounded-xl text-center hover:bg-pink-50 hover:text-pink-600 transition-all border border-transparent hover:border-pink-200 group">
              <i className="fa-solid fa-truck-fast text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
              <p className="font-bold text-sm">Active Orders</p>
              <p className="text-[10px] text-gray-400 mt-1">Status & Delivery</p>
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Admin Shortcuts</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <i className="fa-solid fa-plus text-pink-500 text-xs"></i>
                </div>
                <span className="text-sm font-semibold">New Listing</span>
              </div>
              <Link to="/admin/products" className="bg-pink-500 text-white p-1 px-4 rounded-lg text-xs font-bold shadow-sm">CREATE</Link>
            </li>
            <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <i className="fa-solid fa-clock-rotate-left text-pink-500 text-xs"></i>
                </div>
                <span className="text-sm font-semibold">Recent Activity</span>
              </div>
              <Link to="/admin/orders" className="text-pink-600 font-bold text-xs hover:underline">VIEW LOGS</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
