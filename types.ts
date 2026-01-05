
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  category: string;
  images: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  address: Address;
  status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'COD' | 'Online';
  createdAt: number;
}

export interface Address {
  fullName: string;
  mobile: string;
  houseNo: string;
  area: string;
  pincode: string;
  city: string;
  state: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  dailyVisitors: number;
}
