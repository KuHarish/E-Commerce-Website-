const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    price: 299.99,
    stock: 45
  },
  {
    name: 'Ultra-Slim 4K Smart TV',
    description: '55-inch 4K UHD Smart TV with HDR10+, built-in voice assistant, and ultra-slim bezel design.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    price: 699.99,
    stock: 12
  },
  {
    name: 'Classic Leather Jacket',
    description: 'Genuine leather motorcycle jacket with asymmetrical zip closure, multiple pockets, and a tailored fit.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    price: 199.99,
    stock: 20
  },
  {
    name: 'Minimalist Cotton T-Shirt',
    description: 'Everyday essential t-shirt made from 100% organic cotton. Breathable, durable, and extremely comfortable.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    price: 24.99,
    stock: 100
  },
  {
    name: 'Polarized Aviator Sunglasses',
    description: 'Classic aviator style with polarized lenses providing 100% UV protection and glare reduction.',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    price: 89.99,
    stock: 35
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, sleep analysis, GPS, and waterproof design.',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    price: 149.99,
    stock: 60
  },
  {
    name: 'Ceramic Pour-Over Coffee Maker',
    description: 'Elegant ceramic coffee dripper designed for the perfect pour-over brew. Includes matching mug.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1520024146169-3240400354ae?w=800&q=80',
    price: 45.00,
    stock: 25
  },
  {
    name: 'Modern Accent Chair',
    description: 'Mid-century modern accent chair with plush velvet upholstery and solid wood legs.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    price: 249.99,
    stock: 8
  }
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'ecommerce_app_db'
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Clear existing products to prevent duplicates on rerun
    await Product.deleteMany({});
    console.log('Existing products removed');

    // Insert new products
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
