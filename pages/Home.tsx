
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { MockFirestoreService } from '../services/mockFirebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const banners = [
  {
    title: "Lowest Prices Best Quality",
    subtitle: "10 Lakh+ Styles | 650+ Categories",
    bg: "from-pink-500 to-purple-600",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=100&w=1200",
    tags: ["Free Delivery", "Cash on Delivery"]
  },
  {
    title: "Trending Beauty & Care",
    subtitle: "Upto 70% Off on Top Brands",
    bg: "from-pink-400 to-rose-500",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=100&w=1200",
    tags: ["Authentic Products", "Easy Returns"]
  },
  {
    title: "Exclusive Jewellery Sale",
    subtitle: "Traditional & Modern Styles",
    bg: "from-amber-400 to-orange-600",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=100&w=1200",
    tags: ["Best Designs", "Safe Packing"]
  }
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await MockFirestoreService.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Animated Banner Slider */}
      <div className="relative h-[250px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div 
              key={index}
              className={`min-w-full h-full bg-gradient-to-r ${banner.bg} text-white relative`}
            >
              <div className="absolute inset-0 flex items-center p-8 md:p-16 z-10">
                <div className="max-w-md space-y-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold leading-tight animate-fadeIn drop-shadow-lg">
                    {banner.title}
                  </h1>
                  <p className="text-lg opacity-90 animate-fadeIn delay-100 font-medium">
                    {banner.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {banner.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs md:text-sm border border-white/30">
                        <i className="fa-solid fa-circle-check"></i> {tag}
                      </div>
                    ))}
                  </div>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
                 <img src={banner.img} alt="" className="h-full w-full object-cover opacity-60 mix-blend-overlay" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-white shadow-md' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Categories Row */}
      <section className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto no-scrollbar border border-gray-100">
        <h2 className="text-lg font-bold mb-4 px-2">Top Categories</h2>
        <div className="flex gap-6 min-w-max pb-2 px-2">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all text-xl shadow-sm border border-pink-100">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-pink-500">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold border-l-4 border-pink-500 pl-3">Products For You</h2>
          <div className="flex gap-2">
             <button className="px-4 py-1.5 rounded-full border border-gray-200 text-sm hover:bg-gray-50 flex items-center gap-2">
               <i className="fa-solid fa-sliders text-xs"></i> Filter
             </button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-[4/6]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / Mobile Promo */}
      <div className="bg-pink-50 rounded-2xl p-8 text-center space-y-4 border border-pink-100">
        <h3 className="text-xl font-bold text-gray-800">Become a Reseller with Hootme</h3>
        <p className="text-gray-600 max-w-md mx-auto">Start your online business today with zero investment and earn up to ₹25,000 per month.</p>
        <button className="meesho-pink-bg text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-100">Learn More</button>
      </div>
    </div>
  );
};

export default Home;
