import React, { useEffect, useState, useCallback } from 'react';
import { 
  TrendingUp, 
  Globe, 
  BarChart3,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  UserPlus,
  FileText,
  Briefcase,
  MapPin,
  AlertCircle,
  RefreshCw,
  Activity,
  Clock,
} from 'lucide-react';

import { baseStats, recentTransactions } from '../data/dummy';


const EnhancedDashboard = () => {
  const [stats, setStats] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [weatherError, setWeatherError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Performance metrics
  const performanceData = [
    { label: 'Sales', value: 78, color: 'bg-emerald-500' },
    { label: 'Traffic', value: 85, color: 'bg-blue-500' },
    { label: 'Conversion', value: 62, color: 'bg-purple-500' },
    { label: 'Retention', value: 91, color: 'bg-orange-500' }
  ];

  // Request location permission and get coordinates
  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setWeatherError('Geolocation is not supported by this browser');
      setLocationPermission('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData({ latitude, longitude });
        setLocationPermission('granted');
        setWeatherError(null);
      },
      (error) => {
        console.error('Location error:', error);
        setLocationPermission('denied');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setWeatherError('Location access denied by user');
            break;
          case error.POSITION_UNAVAILABLE:
            setWeatherError('Location information unavailable');
            break;
          case error.TIMEOUT:
            setWeatherError('Location request timed out');
            break;
          default:
            setWeatherError('An unknown error occurred');
            break;
        }
      }
    );
  };

  // Fetch cryptocurrency data
  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      
      const cryptoArray = Object.entries(data).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        symbol: key === 'bitcoin' ? 'BTC' : key === 'ethereum' ? 'ETH' : key === 'cardano' ? 'ADA' : 'DOT',
        price: value.usd,
        change24h: value.usd_24h_change
      }));
      
      setCryptoData(cryptoArray);
    } catch (err) {
      console.error('Error fetching crypto data:', err);
    }
  };

  // Fetch weather data
  const fetchWeatherData = useCallback(async (latitude, longitude) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`);
    const data = await response.json();
    
    const geocodeResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const geocodeData = await geocodeResponse.json();
    
    setWeatherData({
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      condition: getWeatherCondition(data.current.weather_code),
      location: geocodeData.city || geocodeData.locality || 'Unknown Location',
      country: geocodeData.countryName || ''
    });
  } catch (err) {
    console.error('Error fetching weather data:', err);
    setWeatherError('Failed to fetch weather data');
  }
}, []);


  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Depositing rime fog', 51: 'Light drizzle',
      53: 'Moderate drizzle', 55: 'Dense drizzle', 61: 'Slight rain',
      63: 'Moderate rain', 65: 'Heavy rain'
    };
    return conditions[code] || 'Unknown';
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const initDashboard = async () => {
      setLoading(true);
      setStats(baseStats);
      await fetchCryptoData();
      setLoading(false);
    };

    initDashboard();
  }, []);

  useEffect(() => {
  if (locationData) {
    fetchWeatherData(locationData.latitude, locationData.longitude);
  }
}, [locationData, fetchWeatherData]);


  const StatCard = ({ stat, index }) => (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{stat.title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{stat.description}</p>
          <div className="flex items-center space-x-1">
            {stat.trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">vs last month</span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <stat.icon className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
          <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
              Business Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Welcome back! Here's your business overview for today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {currentTime.toLocaleDateString([], { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            stats.map((stat, index) => <StatCard key={index} stat={stat} index={index} />)
          )}
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
              <Activity className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50/70 dark:bg-slate-700/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${
                      transaction.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                      transaction.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      transaction.color === 'red' ? 'from-red-500 to-red-600' :
                      'from-purple-500 to-purple-600'
                    }`}>
                      <transaction.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{transaction.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.time}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200">
              View All Transactions
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Performance</h3>
              <BarChart3 className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-6">
              {performanceData.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{metric.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div 
                      className={`${metric.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Weather</h3>
              <Globe className="w-5 h-5 text-slate-500" />
            </div>
            
            {locationPermission === 'prompt' && (
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                  Allow location access for weather
                </p>
                <button
                  onClick={requestLocationPermission}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  Enable Location
                </button>
              </div>
            )}

            {locationPermission === 'denied' && (
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-red-600 dark:text-red-400 mb-4 text-sm">
                  {weatherError || 'Location access denied'}
                </p>
                <button
                  onClick={requestLocationPermission}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {locationPermission === 'granted' && weatherData && (
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {weatherData.temperature}°C
                </div>
                <div className="text-slate-600 dark:text-slate-400 mb-1">{weatherData.condition}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Humidity: {weatherData.humidity}%
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{weatherData.location}</span>
                </div>
              </div>
            )}

            {locationPermission === 'granted' && !weatherData && !weatherError && (
              <div className="text-center text-slate-500 dark:text-slate-400">
                <div className="animate-spin w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full mx-auto mb-2"></div>
                Loading weather...
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crypto Prices */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Crypto Market</h3>
              <TrendingUp className="w-5 h-5 text-slate-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cryptoData.map((crypto, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50/70 dark:bg-slate-700/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{crypto.symbol}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{crypto.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white">
                      ${crypto.price?.toLocaleString()}
                    </div>
                    <div className={`text-sm ${crypto.change24h > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {crypto.change24h > 0 ? '+' : ''}{crypto.change24h?.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h3>
              <Zap className="w-5 h-5 text-slate-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Add User', icon: UserPlus, gradient: 'from-blue-500 to-blue-600' },
                { label: 'New Report', icon: FileText, gradient: 'from-emerald-500 to-emerald-600' },
                { label: 'Create Project', icon: Briefcase, gradient: 'from-purple-500 to-purple-600' },
                { label: 'Export Data', icon: Download, gradient: 'from-orange-500 to-orange-600' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="group flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50/70 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;