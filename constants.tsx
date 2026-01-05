
import React from 'react';

export const ADMIN_EMAIL = 'coolspark0032@gmail.com';

export const CATEGORIES = [
  { id: 'fashion', name: 'Fashion', icon: <i className="fa-solid fa-shirt"></i> },
  { id: 'beauty', name: 'Beauty', icon: <i className="fa-solid fa-wand-magic-sparkles"></i> },
  { id: 'jewellery', name: 'Jewellery', icon: <i className="fa-solid fa-gem"></i> },
  { id: 'home', name: 'Home', icon: <i className="fa-solid fa-house"></i> },
  { id: 'kids', name: 'Kids', icon: <i className="fa-solid fa-child"></i> },
  { id: 'electronics', name: 'Electronics', icon: <i className="fa-solid fa-laptop"></i> },
];

// Custom images provided by user - using highest quality Unsplash equivalents
const USER_IMAGE_1 = "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=100&w=1200"; 
const USER_IMAGE_2 = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=100&w=1200"; 

export const INITIAL_PRODUCTS: any[] = [
  {
    id: 'premium-1',
    name: 'Luxury Makeup Essentials Kit',
    description: 'A complete collection of premium cosmetics including lipsticks, brushes, and palettes for a professional look.',
    price: 999,
    mrp: 2499,
    category: 'beauty',
    images: [USER_IMAGE_1],
    rating: 4.9,
    reviews: 5200,
    sizes: ['Professional Kit'],
    colors: ['Multi'],
    stock: 50
  },
  {
    id: 'premium-2',
    name: 'Ultimate Professional Beauty Set',
    description: 'The complete professional makeup set featuring high-pigment palettes and expert brushes for a flawless finish.',
    price: 1299,
    mrp: 3499,
    category: 'beauty',
    images: [USER_IMAGE_2],
    rating: 5.0,
    reviews: 3800,
    sizes: ['Grand Set'],
    colors: ['Natural Glow'],
    stock: 35
  },
  {
    id: '1',
    name: 'Elegant Floral Kurti',
    description: 'Beautiful cotton floral kurti perfect for casual wear. Comfortable and stylish high-quality fabric.',
    price: 399,
    mrp: 899,
    category: 'fashion',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=100&w=1200',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=100&w=1200'
    ],
    rating: 4.2,
    reviews: 1250,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Blue'],
    stock: 50
  },
  {
    id: '2',
    name: "Men's Premium Casual Sneakers",
    description: 'Lightweight breathable sneakers for men. Durable sole and stylish design for daily use.',
    price: 549,
    mrp: 1299,
    category: 'fashion',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.5,
    reviews: 890,
    sizes: ['7', '8', '9', '10'],
    colors: ['White', 'Black'],
    stock: 30
  },
  {
    id: '5',
    name: 'Kundan Pearl Earrings',
    description: 'Trending traditional Kundan earrings with premium pearl drops. Perfect for weddings and festive seasons.',
    price: 199,
    mrp: 599,
    category: 'jewellery',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.8,
    reviews: 2100,
    sizes: ['Free Size'],
    colors: ['Gold'],
    stock: 120
  },
  {
    id: '6',
    name: 'Matte Liquid Lipstick',
    description: 'Long-lasting 12-hour stay matte liquid lipstick. Smudge-proof and deeply pigmented.',
    price: 149,
    mrp: 399,
    category: 'beauty',
    images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.4,
    reviews: 4500,
    sizes: ['Standard'],
    colors: ['Ruby Red', 'Nude Pink'],
    stock: 500
  },
  {
    id: '10',
    name: 'Waterproof HD Mascara',
    description: 'Extra volume waterproof mascara for dramatic lashes. Clump-free formula for HD look.',
    price: 199,
    mrp: 499,
    category: 'beauty',
    images: ['https://images.unsplash.com/photo-1631214524020-5e1839762c71?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.6,
    reviews: 3400,
    sizes: ['10ml'],
    colors: ['Jet Black'],
    stock: 300
  },
  {
    id: '11',
    name: 'Temple Jewellery Set',
    description: 'Gold-plated traditional temple necklace set with earrings. Goddess Lakshmi motif intricately designed.',
    price: 499,
    mrp: 1499,
    category: 'jewellery',
    images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.9,
    reviews: 850,
    sizes: ['Adjustable'],
    colors: ['Antique Gold'],
    stock: 45
  },
  {
    id: '12',
    name: '24K Gold Face Oil',
    description: 'Luxury brightening face oil with real gold flakes. Anti-aging, hydrating and rejuvenating.',
    price: 349,
    mrp: 999,
    category: 'beauty',
    images: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.7,
    reviews: 1200,
    sizes: ['30ml'],
    colors: ['Gold'],
    stock: 100
  },
  {
    id: '23',
    name: 'Traditional Jhumka Set',
    description: 'Gold-plated ethnic jhumka set with intricate handwork. Lightweight and stunning.',
    price: 179,
    mrp: 499,
    category: 'jewellery',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.5,
    reviews: 950,
    sizes: ['One Size'],
    colors: ['Antique Gold'],
    stock: 75
  },
  {
    id: '24',
    name: 'Oxidised Silver Choker',
    description: 'Boho style oxidised silver choker set with glass work. Perfect for ethnic fusion looks.',
    price: 249,
    mrp: 799,
    category: 'jewellery',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=100&w=1200'],
    rating: 4.7,
    reviews: 1100,
    sizes: ['Adjustable'],
    colors: ['Silver'],
    stock: 90
  }
];
