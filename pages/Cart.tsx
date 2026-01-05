
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useAppContext();
  const navigate = useNavigate();

  const totalMRP = cart.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
  const totalDiscount = cart.reduce((acc, item) => acc + (item.mrp - item.price) * item.quantity, 0);
  const totalAmount = totalMRP - totalDiscount;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-cart-arrow-down text-6xl text-gray-300"></i>
        </div>
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500">Add something to make me happy :)</p>
        <Link to="/" className="bg-pink-500 text-white px-8 py-3 rounded-lg font-bold">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          Cart <span className="text-gray-400 font-normal">({cart.length} items)</span>
        </h1>
        
        {cart.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <div className="w-24 h-32 rounded-lg overflow-hidden border flex-shrink-0">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow space-y-1">
              <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                {item.selectedColor && <span>| Color: {item.selectedColor}</span>}
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <span className="text-lg font-bold">₹{item.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{item.mrp}</span>
                <span className="text-green-600 text-xs font-bold">₹{item.mrp - item.price} off</span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button 
                    onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 sticky top-24">
          <h2 className="font-bold text-lg border-b pb-4">Price Details</h2>
          
          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-₹{totalDiscount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            
            <div className="border-t pt-4 flex justify-between font-bold text-gray-900 text-lg">
              <span>Order Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-600 shadow-md shadow-pink-200 transition-all mt-4"
          >
            Continue to Checkout
          </button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 py-2">
            <i className="fa-solid fa-shield-halved"></i>
            <span>100% Safe and Secure Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
