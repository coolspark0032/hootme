
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MockFirestoreService } from '../services/mockFirebase';
import { Product } from '../types';
import { useAppContext } from '../App';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');
  
  const { addToCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await MockFirestoreService.getProductById(id);
        if (data) {
          setProduct(data);
          setMainImage(data.images[0]);
          if (data.sizes.length) setSelectedSize(data.sizes[0]);
          if (data.colors.length) setSelectedColor(data.colors[0]);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center flex flex-col items-center gap-4">
    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    <p>Finding the perfect product...</p>
  </div>;
  
  if (!product) return <div className="p-8 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300" 
            />
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`w-20 h-24 rounded-md border-2 overflow-hidden flex-shrink-0 transition-all ${mainImage === img ? 'border-pink-500 scale-105' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
            
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
              <span className="text-green-600 font-bold">{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% Off</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                {product.rating} <i className="fa-solid fa-star text-[8px]"></i>
              </div>
              <span className="text-gray-400 text-xs">{product.reviews} Ratings</span>
            </div>
          </div>

          {/* Size Select */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-700">Select Size</p>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm transition-all font-medium ${selectedSize === size ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 sticky bottom-0 bg-white md:relative">
            <button 
              onClick={handleAddToCart}
              className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded-lg font-bold hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-100 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-bolt"></i> Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t">
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-1">
                 <i className="fa-solid fa-truck text-gray-500 text-sm"></i>
              </div>
              <p className="text-[10px] text-gray-500">Free Delivery</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-1">
                 <i className="fa-solid fa-rotate-left text-gray-500 text-sm"></i>
              </div>
              <p className="text-[10px] text-gray-500">7 Day Returns</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-1">
                 <i className="fa-solid fa-hand-holding-dollar text-gray-500 text-sm"></i>
              </div>
              <p className="text-[10px] text-gray-500">Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
