
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, CartItem, Product, Order } from './types';
import { MockAuthService, MockFirestoreService } from './services/mockFirebase';
import { ADMIN_EMAIL } from './constants';

// --- Context ---
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// --- Components ---
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import Login from './pages/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(MockAuthService.getCurrentUser());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('hootme_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedWish = localStorage.getItem('hootme_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));
  }, []);

  useEffect(() => {
    localStorage.setItem('hootme_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hootme_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, wishlist, toggleWishlist 
    }}>
      <Router>
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-4 max-w-7xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={user?.email === ADMIN_EMAIL ? <AdminDashboard /> : <Navigate to="/" />} />
              <Route path="/admin/products" element={user?.email === ADMIN_EMAIL ? <AdminProducts /> : <Navigate to="/" />} />
              <Route path="/admin/orders" element={user?.email === ADMIN_EMAIL ? <AdminOrders /> : <Navigate to="/" />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
