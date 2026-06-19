import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import axios from 'axios';

import AdminProducts from './Products';
import AdminProductForm from './ProductForm';
import AdminOrders from './Orders';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        // In a real app, you'd have a specific /api/admin/stats endpoint
        // Here we'll just fetch all orders and products to calculate (mocking)
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('/api/orders'),
          axios.get('/api/products')
        ]);

        const totalRevenue = ordersRes.data.reduce((sum, order) => sum + order.totalAmount, 0);

        setStats({
          users: 15, // Mock value since we don't have a getUsers endpoint
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          revenue: totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching admin stats', error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 px-4">Admin Panel</h2>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary text-white font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${stats.revenue.toFixed(2)}`} icon={DollarSign} color="bg-green-500" />
                <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} color="bg-blue-500" />
                <StatCard title="Products" value={stats.products} icon={Package} color="bg-purple-500" />
                <StatCard title="Users" value={stats.users} icon={Users} color="bg-orange-500" />
              </div>
            </div>
          } />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/products/new" element={<AdminProductForm />} />
          <Route path="/products/edit/:id" element={<AdminProductForm />} />
          <Route path="/orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-4">
    <div className={`p-4 rounded-full text-white ${color}`}>
      <Icon className="h-8 w-8" />
    </div>
    <div>
      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  </div>
);

export default AdminDashboard;
