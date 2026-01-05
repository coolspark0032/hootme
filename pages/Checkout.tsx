
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Address } from '../types';
import { MockFirestoreService } from '../services/mockFirebase';

const Checkout: React.FC = () => {
  const { cart, user, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>({
    fullName: '',
    mobile: '',
    houseNo: '',
    area: '',
    pincode: '',
    city: '',
    state: ''
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await MockFirestoreService.createOrder({
        userId: user.id,
        items: cart,
        totalAmount,
        address,
        status: 'Placed',
        paymentMethod: 'COD'
      });
      clearCart();
      alert("Order Placed Successfully!");
      navigate('/orders');
    } catch (error) {
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-8">Delivery Address</h1>
      
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold border-b pb-2 flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-pink-500"></i> Contact Details
            </h3>
            <input 
              required name="fullName" placeholder="Full Name" 
              className="w-full p-3 border rounded focus:outline-pink-500" 
              onChange={handleInputChange} 
            />
            <input 
              required name="mobile" placeholder="Mobile Number" 
              className="w-full p-3 border rounded focus:outline-pink-500" 
              onChange={handleInputChange} 
            />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-bold border-b pb-2 flex items-center gap-2">
              <i className="fa-solid fa-house-chimney text-pink-500"></i> Address
            </h3>
            <input 
              required name="houseNo" placeholder="House no./ Building Name" 
              className="w-full p-3 border rounded focus:outline-pink-500" 
              onChange={handleInputChange} 
            />
            <input 
              required name="area" placeholder="Road Name / Area / Colony" 
              className="w-full p-3 border rounded focus:outline-pink-500" 
              onChange={handleInputChange} 
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                required name="pincode" placeholder="Pincode" 
                className="w-full p-3 border rounded focus:outline-pink-500" 
                onChange={handleInputChange} 
              />
              <input 
                required name="city" placeholder="City" 
                className="w-full p-3 border rounded focus:outline-pink-500" 
                onChange={handleInputChange} 
              />
            </div>
            <input 
              required name="state" placeholder="State" 
              className="w-full p-3 border rounded focus:outline-pink-500" 
              onChange={handleInputChange} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="font-bold border-b pb-2">Order Summary</h2>
            <div className="flex justify-between font-bold text-xl">
              <span>Total Amount</span>
              <span className="text-pink-600">₹{totalAmount}</span>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800 font-bold flex items-center gap-2">
                <i className="fa-solid fa-circle-check"></i> Cash On Delivery
              </p>
              <p className="text-xs text-green-600 mt-1">Available at your location</p>
            </div>

            <button 
              type="submit"
              className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 shadow-lg shadow-pink-100 transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
