
import React, { useState, useEffect } from 'react';
import { MockFirestoreService } from '../services/mockFirebase';
import { Order } from '../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await MockFirestoreService.getOrders();
    setOrders(data.sort((a, b) => b.createdAt - a.createdAt));
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: Order['status']) => {
    await MockFirestoreService.updateOrderStatus(id, status);
    fetchOrders();
    alert(`Order ${id} updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-bold text-gray-700">Order ID</th>
              <th className="p-4 font-bold text-gray-700">Customer</th>
              <th className="p-4 font-bold text-gray-700">Items</th>
              <th className="p-4 font-bold text-gray-700">Total</th>
              <th className="p-4 font-bold text-gray-700">Status</th>
              <th className="p-4 font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{o.id}</td>
                <td className="p-4">
                  <p className="font-bold text-sm">{o.address.fullName}</p>
                  <p className="text-xs text-gray-500">{o.address.city}, {o.address.state}</p>
                </td>
                <td className="p-4">
                  <span className="text-sm">{o.items.length} items</span>
                </td>
                <td className="p-4 font-bold">₹{o.totalAmount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    o.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                    o.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                    'bg-pink-100 text-pink-600'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={o.status}
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value as Order['status'])}
                    className="p-2 border rounded text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-8 text-center text-gray-400">Loading orders...</div>}
        {!loading && orders.length === 0 && <div className="p-8 text-center text-gray-400">No orders found.</div>}
      </div>
    </div>
  );
};

export default AdminOrders;
