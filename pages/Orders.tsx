
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../App';
import { MockFirestoreService } from '../services/mockFirebase';
import { Order } from '../types';

const Orders: React.FC = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const data = await MockFirestoreService.getOrders(user.id);
        setOrders(data.sort((a, b) => b.createdAt - a.createdAt));
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading your orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <i className="fa-solid fa-box-open text-6xl text-gray-200 mb-4"></i>
        <h2 className="text-xl font-bold">No orders yet</h2>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center text-sm">
            <div>
              <span className="text-gray-500">Order ID: </span>
              <span className="font-bold text-gray-800">{order.id}</span>
            </div>
            <div>
              <span className="text-gray-500">Date: </span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={`px-3 py-1 rounded-full font-bold text-xs ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
              order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
              'bg-pink-100 text-pink-600'
            }`}>
              {order.status}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover rounded border" />
                <div className="flex-grow">
                  <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                  <p className="font-bold mt-1">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t bg-pink-50 flex justify-between items-center">
            <div className="text-sm font-medium">Total Paid: <span className="font-bold">₹{order.totalAmount}</span></div>
            <button className="text-pink-600 font-bold text-sm">Track Order</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
