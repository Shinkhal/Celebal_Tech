import React, { useEffect, useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  IndianRupee, 
  ShoppingCart, 
  Globe, 
  BarChart3,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye,
  UserPlus,
  FileText,
  Briefcase,
  MapPin,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'
  const [weatherError, setWeatherError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock business stats with realistic data
  const generateBusinessStats = () => {
    const baseStats = [
      { title: 'Total Revenue', value: '₹2,45,680', change: '+12.5%', icon: IndianRupee, color: 'emerald', trend: 'up' },
      { title: 'Active Users', value: '8,542', change: '+8.2%', icon: Users, color: 'blue', trend: 'up' },
      { title: 'Orders Today', value: '234', change: '-2.1%', icon: ShoppingCart, color: 'purple', trend: 'down' },
      { title: 'Growth Rate', value: '15.8%', change: '+5.4%', icon: TrendingUp, color: 'orange', trend: 'up' },
      { title: 'Conversion Rate', value: '4.2%', change: '+1.8%', icon: Target, color: 'pink', trend: 'up' },
      { title: 'Page Views', value: '45.2K', change: '+18.7%', icon: Eye, color: 'cyan', trend: 'up' }
    ];
    return baseStats;
  };

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
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // Cache location for 5 minutes
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

  // Fetch weather data for given coordinates
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`);
      const data = await response.json();
      
      // Reverse geocoding to get city name
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
  };

  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain'
    };
    return conditions[code] || 'Unknown';
  };

  useEffect(() => {
    const initDashboard = async () => {
      setLoading(true);
      
      // Generate business stats
      setStats(generateBusinessStats());
      
      // Fetch crypto data
      await fetchCryptoData();
      
      setLoading(false);
    };

    initDashboard();
  }, []);

  // Fetch weather when location is available
  useEffect(() => {
    if (locationData) {
      fetchWeatherData(locationData.latitude, locationData.longitude);
    }
  }, [locationData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const StatCard = ({ stat, index }) => (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{stat.title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</p>
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
        <div className={`p-3 rounded-xl bg-gradient-to-r ${
          stat.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
          stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
          stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
          stat.color === 'orange' ? 'from-orange-500 to-orange-600' :
          stat.color === 'pink' ? 'from-pink-500 to-pink-600' :
          'from-cyan-500 to-cyan-600'
        } shadow-lg`}>
          <stat.icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
            <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening with your business today.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            stats.map((stat, index) => <StatCard key={index} stat={stat} index={index} />)
          )}
        </div>

        {/* Secondary Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Crypto Prices */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Crypto Prices</h3>
              <BarChart3 className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-3">
              {cryptoData.map((crypto, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{crypto.symbol}</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{crypto.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white">{formatCurrency(crypto.price)}</div>
                    <div className={`text-sm ${crypto.change24h > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {crypto.change24h > 0 ? '+' : ''}{crypto.change24h?.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Weather</h3>
              <Globe className="w-5 h-5 text-slate-500" />
            </div>
            
            {locationPermission === 'prompt' && (
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                  Allow location access to see local weather
                </p>
                <button
                  onClick={requestLocationPermission}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Enable Location
                </button>
              </div>
            )}

            {locationPermission === 'denied' && (
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-red-600 dark:text-red-400 mb-4 text-sm">
                  {weatherError || 'Location access denied'}
                </p>
                <button
                  onClick={requestLocationPermission}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {locationPermission === 'granted' && weatherData && (
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  {weatherData.temperature}°C
                </div>
                <div className="text-slate-600 dark:text-slate-400 mb-1">{weatherData.condition}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Humidity: {weatherData.humidity}%
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{weatherData.location}{weatherData.country && `, ${weatherData.country}`}</span>
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

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
              <Zap className="w-5 h-5 text-slate-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add User', icon: UserPlus, color: 'blue' },
                { label: 'New Report', icon: FileText, color: 'emerald' },
                { label: 'Create Project', icon: Briefcase, color: 'purple' },
                { label: 'Export Data', icon: Download, color: 'orange' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 group"
                >
                  <action.icon className="w-6 h-6 mb-2 text-slate-400 group-hover:text-blue-500" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
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

export default Dashboard;