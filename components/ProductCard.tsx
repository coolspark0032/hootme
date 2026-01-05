
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../App';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // High-quality placeholder if the link is broken
    e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all duration-300">
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors shadow-sm"
      >
        <i className={`${isWishlisted ? 'fa-solid fa-heart text-pink-500' : 'fa-regular fa-heart'} text-lg`}></i>
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden bg-gray-50">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.98] contrast-[1.02]"
          />
        </div>
        
        <div className="p-3">
          <h3 className="text-xs md:text-sm text-gray-600 truncate mb-1 font-medium">{product.name}</h3>
          <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
            <span className="text-base md:text-lg font-bold text-gray-900">₹{product.price}</span>
            <span className="text-[10px] md:text-xs text-gray-400 line-through">₹{product.mrp}</span>
            <span className="text-[10px] md:text-xs text-green-600 font-bold">{discount}% off</span>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <div className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm flex items-center gap-1 font-bold">
              {product.rating} <i className="fa-solid fa-star text-[8px]"></i>
            </div>
            <span className="text-[10px] text-gray-400">{product.reviews} reviews</span>
          </div>
          
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Free Delivery</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
