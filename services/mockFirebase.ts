
import { Product, User, Order, DashboardStats } from '../types';
import { INITIAL_PRODUCTS, ADMIN_EMAIL } from '../constants';
import { auth, db, storage } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  setDoc,
  Timestamp 
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const STORAGE_KEYS = {
  PRODUCTS: 'hootme_products_v5', // Forced refresh for Mascara image fix
  ORDERS: 'hootme_orders',
  USERS: 'hootme_users',
  CURRENT_USER: 'hootme_current_user',
  WISHLIST: 'hootme_wishlist'
};

// Fallback for LocalStorage when Firestore is used as primary
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize Products if empty in local storage
if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
  saveToStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export const MockAuthService = {
  login: async (email: string, displayName: string): Promise<User> => {
    const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    let user = users.find(u => u.email === email);
    
    if (!user) {
      user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        displayName,
        role: email === ADMIN_EMAIL ? 'admin' : 'user',
        createdAt: Date.now()
      };
      users.push(user);
      saveToStorage(STORAGE_KEYS.USERS, users);
    }
    
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  },
  
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  
  getCurrentUser: (): User | null => {
    return getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  
  getAllUsers: (): User[] => {
    return getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  }
};

export const MockFirestoreService = {
  // Products
  getProducts: async (category?: string): Promise<Product[]> => {
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    if (category) return products.filter(p => p.category === category);
    return products;
  },
  
  getProductById: async (id: string): Promise<Product | undefined> => {
    const products = await MockFirestoreService.getProducts();
    return products.find(p => p.id === id);
  },
  
  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    products.push(newProduct);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  },
  
  updateProduct: async (id: string, updates: Partial<Product>): Promise<void> => {
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    }
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const filtered = products.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PRODUCTS, filtered);
  },
  
  // Orders
  getOrders: async (userId?: string): Promise<Order[]> => {
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    if (userId) return orders.filter(o => o.userId === userId);
    return orders;
  },
  
  createOrder: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    const newOrder = {
      ...order,
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: Date.now()
    } as Order;
    orders.push(newOrder);
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  },
  
  updateOrderStatus: async (id: string, status: Order['status']): Promise<void> => {
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      saveToStorage(STORAGE_KEYS.ORDERS, orders);
    }
  },
  
  // Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const products = await MockFirestoreService.getProducts();
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    
    return {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalRevenue: orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
      dailyVisitors: Math.floor(Math.random() * 500) + 100 
    };
  }
};

export const MockStorageService = {
  uploadImage: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
