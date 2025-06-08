// src/pages/Dashboard.jsx
import React from 'react';
import { Users, TrendingUp, IndianRupee, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Revenue', value: '45,210', change: '+8%', icon: IndianRupee, color: 'green' },
    { title: 'Orders', value: '1,234', change: '+23%', icon: ShoppingCart, color: 'purple' },
    { title: 'Growth', value: '12.5%', change: '+3%', icon: TrendingUp, color: 'orange' }
  ];

  return (
    <main className="p-6 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
            Add User
          </button>
          <button className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
            Create Report
          </button>
          <button className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30">
            New Project
          </button>
          <button className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30">
            Settings
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;