import React from 'react';
import { Line, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,ComposedChart } from 'recharts';
import { TrendingUp, Users, DollarSign, Zap, Target } from 'lucide-react';
import ChartCard from '../components/card';

// Enhanced sample data
const monthlyData = [
  { name: 'Jan', users: 4200, sales: 24000, revenue: 48000, growth: 12 },
  { name: 'Feb', users: 3800, sales: 19800, revenue: 39600, growth: -8 },
  { name: 'Mar', users: 5100, sales: 32000, revenue: 64000, growth: 25 },
  { name: 'Apr', users: 4700, sales: 28900, revenue: 57800, growth: 18 },
  { name: 'May', users: 6200, sales: 41000, revenue: 82000, growth: 32 },
  { name: 'Jun', users: 5800, sales: 38500, revenue: 77000, growth: 24 }
];

const COLORS = {
  primary: '#6366f1',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6'
};


// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <p className="font-semibold text-gray-800 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Analytics Dashboard</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ChartCard
            title="Total Users"
            icon={Users}
            value="29.8K"
            trend={15}
            subtitle="Active users"
            className="bg-gradient-to-tr from-blue-600 to-indigo-300 dark:from-blue-700 dark:to-indigo-900/20"
          />
          <ChartCard
            title="Revenue"
            icon={DollarSign}
            value="$368K"
            trend={8}
            subtitle="This month"
            className="bg-gradient-to-tr from-green-300 to-emerald-500 dark:from-green-700 dark:to-emerald-900/20"
          />
          <ChartCard
            title="Conversion"
            icon={Target}
            value="3.2%"
            trend={-2}
            subtitle="Overall rate"
            className="bg-gradient-to-tr from-yellow-300 to-orange-500 dark:from-yellow-700 dark:to-orange-900/20"
          />
          <ChartCard
            title="Performance"
            icon={Zap}
            value="92/100"
            trend={5}
            subtitle="Site score"
            className="bg-gradient-to-tr from-purple-400 to-pink-500 dark:from-purple-700 dark:to-pink-900/20"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Area Chart */}
          <ChartCard 
            title="User Growth Trend" 
            icon={TrendingUp}
            subtitle="Monthly active users"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke={COLORS.primary}
                  strokeWidth={3}
                  fill="url(#colorUsers)"
                  dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: COLORS.primary, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Enhanced Composed Chart */}
          <ChartCard 
            title="Revenue & Growth" 
            icon={DollarSign}
            subtitle="Monthly performance"
          >
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  yAxisId="left"
                  dataKey="revenue" 
                  fill={COLORS.secondary}
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="growth" 
                  stroke={COLORS.accent}
                  strokeWidth={3}
                  dot={{ fill: COLORS.accent, strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </main>
  );
};

export default Charts;