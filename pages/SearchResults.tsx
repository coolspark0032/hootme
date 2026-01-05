
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MockFirestoreService } from '../services/mockFirebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await MockFirestoreService.getProducts();
      const filtered = data.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
      setLoading(false);
    };
    fetch();
  }, [query]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">
        Showing results for "<span className="text-pink-600">{query}</span>"
        <span className="text-gray-400 text-sm font-normal ml-2">({products.length} Items found)</span>
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="bg-gray-200 animate-pulse aspect-[4/6] rounded-lg"></div>)}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center">
          <i className="fa-solid fa-magnifying-glass text-6xl text-gray-100 mb-4"></i>
          <p className="text-gray-500 font-medium">Sorry, we couldn't find anything matching your search.</p>
          <button onClick={() => window.history.back()} className="mt-4 text-pink-600 font-bold underline">Go Back</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
