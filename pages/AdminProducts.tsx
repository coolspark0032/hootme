
import React, { useState, useEffect } from 'react';
import { MockFirestoreService, MockStorageService } from '../services/mockFirebase';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    mrp: 0,
    category: 'fashion',
    images: [] as string[],
    stock: 0,
    sizes: [] as string[],
    colors: [] as string[]
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await MockFirestoreService.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await MockStorageService.uploadImage(file);
      setNewProduct({ ...newProduct, images: [...newProduct.images, url] });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await MockFirestoreService.addProduct({
      ...newProduct,
      rating: 0,
      reviews: 0,
    } as any);
    setShowForm(false);
    fetchProducts();
    alert("Product added successfully!");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this product?")) {
      await MockFirestoreService.deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-pink-600"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl shadow-md border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Product Name" className="p-3 border rounded focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            <select className="p-3 border rounded focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input required type="number" placeholder="Price (Selling)" className="p-3 border rounded focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
            <input required type="number" placeholder="MRP (Original)" className="p-3 border rounded focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => setNewProduct({...newProduct, mrp: Number(e.target.value)})} />
            <input required type="number" placeholder="Stock" className="p-3 border rounded focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
            <input type="file" className="p-3 border rounded" onChange={handleFileChange} />
          </div>
          <textarea placeholder="Description" className="w-full p-3 border rounded focus:ring-1 focus:ring-pink-500 outline-none h-24" onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
          
          <div className="flex gap-4">
            {newProduct.images.map((img, i) => (
              <img key={i} src={img} className="w-16 h-16 object-cover rounded border" alt="" />
            ))}
          </div>

          <button type="submit" className="bg-pink-500 text-white px-8 py-3 rounded font-bold">Save Product</button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-bold text-gray-700">Product</th>
              <th className="p-4 font-bold text-gray-700">Category</th>
              <th className="p-4 font-bold text-gray-700">Price</th>
              <th className="p-4 font-bold text-gray-700">Stock</th>
              <th className="p-4 font-bold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.images[0]} className="w-10 h-10 object-cover rounded" alt="" />
                  <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                </td>
                <td className="p-4 capitalize">{p.category}</td>
                <td className="p-4 font-bold">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-8 text-center text-gray-400">Loading products...</div>}
      </div>
    </div>
  );
};

export default AdminProducts;
