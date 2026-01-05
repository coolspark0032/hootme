
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MockFirestoreService } from '../services/mockFirebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await MockFirestoreService.getProducts(id);
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold capitalize">{id} Collection</h1>
        <span className="text-gray-400 text-sm">({products.length} Items)</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="bg-gray-200 animate-pulse aspect-[4/6] rounded-lg"></div>)}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center text-gray-500">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
