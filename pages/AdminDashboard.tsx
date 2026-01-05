
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

  if (!stats) return <div className="p-8">Loading stats...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome back, Admin</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
            </div>
            <div className="bg-pink-50 p-3 rounded-full text-pink-500">
              <i className="fa-solid fa-bag-shopping text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{stats.totalRevenue}</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-full text-green-500">
              <i className="fa-solid fa-indian-rupee-sign text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
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

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Daily Visitors</p>
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
            <i className="fa-solid fa-gear text-pink-500"></i> Management
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/products" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-pink-50 hover:text-pink-600 transition-all border border-transparent hover:border-pink-200">
              <i className="fa-solid fa-box-open text-2xl mb-2"></i>
              <p className="font-bold text-sm">Products</p>
            </Link>
            <Link to="/admin/orders" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-pink-50 hover:text-pink-600 transition-all border border-transparent hover:border-pink-200">
              <i className="fa-solid fa-truck-fast text-2xl mb-2"></i>
              <p className="font-bold text-sm">Orders</p>
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Add New Product</span>
              <Link to="/admin/products" className="bg-pink-500 text-white p-1 px-3 rounded text-xs font-bold">ADD</Link>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">View Recent Orders</span>
              <Link to="/admin/orders" className="text-pink-600 font-bold text-xs underline">VIEW ALL</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
