// src/components/ChartCard.jsx
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const ChartCard = ({ title, children, icon: Icon, value, trend, subtitle, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isHovered 
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              <Icon size={20} />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
        </div>
        {value && (
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{value}</div>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={16} className={trend < 0 ? 'rotate-180' : ''} />
                <span className="ml-1">{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default ChartCard;