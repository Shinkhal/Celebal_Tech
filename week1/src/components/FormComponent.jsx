import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = {
    India: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Surat", "Visakhapatnam", "Patna", "Vadodara", "Indore", "Thane", "Bhopal", "Coimbatore"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Central Coast", "Wollongong", "Sunshine Coast", "Geelong", "Hobart", "Cairns", "Townsville", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Mackay"],
    UK: ["London", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Newcastle", "Sheffield", "Manchester", "Bristol", "Nottingham", "Leicester", "Coventry", "Bradford", "Cardiff", "Belfast", "Stoke-on-Trent", "Wolverhampton", "Plymouth", "Southampton", "Reading"],
    Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Quebec City", "Winnipeg", "Hamilton", "Kitchener", "London", "Halifax", "Victoria", "Oshawa", "Windsor", "Saskatoon", "St. Catharines", "Regina", "St. John's", "Kelowna"],
    Japan: ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kawasaki", "Kyoto", "Saitama", "Hiroshima", "Sendai", "Chiba", "Kitakyushu", "Sakai", "Niigata", "Hamamatsu", "Kumamoto", "Okayama", "Kagoshima"],
};

const FormComponent = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        phone: "",
        countryCode: "",
        country: "",
        city: "",
        pan: "",
        aadhar: "",
    });
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const validateForm = () => {
        let formError = {};
        let isValid = true;

        for (const field in form) {
            if (!form[field]) {
                isValid = false;
                formError[field] = `${field} is required`;
            } else {
                delete formError[field];
            }
        }

        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            formError.email = "Email is invalid";
            isValid = false;
        }

        if (form.aadhar && form.aadhar.length !== 12) {
            formError.aadhar = "Aadhar number should be 12 digits";
            isValid = false;
        }

        if (form.pan && form.pan.length !== 10) {
            formError.pan = "PAN number should be 10 digits";
            isValid = false;
        }

        if (form.phone && form.phone.length !== 10) {
            formError.phone = "Phone number should be 10 digits";
            isValid = false;
        }

        if (form.password && (form.password.length < 8 || form.password.length > 20 || !/\d/.test(form.password) || !/[a-zA-Z]/.test(form.password) || !/[!@#$%^&*]/.test(form.password))) {
            formError.password = "Password should be between 8 to 20 characters and should contain at least one letter, one number and one special character";
            isValid = false;
        }

        setError(formError);
        setValid(isValid);
    };
    validateForm();
    
}, [form]);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "country") {
            setForm((prev) => ({ ...prev, city: "" }));
        }
        // FIXED: Reset both country and city when country code changes
        if (name === "countryCode") {
            setForm((prev) => ({ ...prev, country: "", city: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valid) {
            console.log("Form submitted successfully", form);
            navigate("/success", { state: form });
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4'>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Registration Form</h2>
            <div className='max-w-lg mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
                            <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            value={form.firstName} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                        />
                        {error.firstName && <p className='text-red-500 text-sm mt-1'>{error.firstName}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            value={form.lastName} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                        />
                        {error.lastName && <p className='text-red-500 text-sm mt-1'>{error.lastName}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="userName">Username</label>
                        <input 
                            type="text" 
                            name="userName" 
                            value={form.userName} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                        />
                        {error.userName && <p className='text-red-500 text-sm mt-1'>{error.userName}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={form.email} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                        />
                        {error.email && <p className='text-red-500 text-sm mt-1'>{error.email}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="password">Password</label>
                        <div className='relative'>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                value={form.password} 
                                onChange={handleChange} 
                                className='w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                            />
                            <button 
                                type="button" 
                                onClick={handleShowPassword} 
                                className='absolute right-2 top-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors'
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {error.password && <p className='text-red-500 text-sm mt-1'>{error.password}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                        <div className='flex gap-2'>
                            <input 
                                type="text" 
                                name="countryCode" 
                                value={form.countryCode} 
                                onChange={handleChange} 
                                className='w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                                placeholder="+91" 
                            />
                            <input 
                                type="text" 
                                name="phone" 
                                value={form.phone} 
                                onChange={handleChange} 
                                className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                            />
                        </div>
                        {(error.countryCode || error.phone) && <p className='text-red-500 text-sm mt-1'>{error.countryCode} {error.phone}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="country">Country</label>
                        <select 
                            name="country" 
                            value={form.country} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white'
                        >
                            <option value="">Select Country</option>
                            {Object.keys(countries).map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {error.country && <p className='text-red-500 text-sm mt-1'>{error.country}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="city">City</label>
                        <select 
                            name="city" 
                            value={form.city} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white'
                        >
                            <option value="">Select City</option>
                            {form.country && countries[form.country].map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {error.city && <p className='text-red-500 text-sm mt-1'>{error.city}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="pan">PAN Number</label>
                        <input 
                            type="text" 
                            name="pan" 
                            value={form.pan} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                        />
                        {error.pan && <p className='text-red-500 text-sm mt-1'>{error.pan}</p>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="aadhar">Aadhar Number</label>
                        <input 
                            type="text" 
                            name="aadhar" 
                            value={form.aadhar} 
                            onChange={handleChange} 
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' 
                        />
                        {error.aadhar && <p className='text-red-500 text-sm mt-1'>{error.aadhar}</p>}
                    </div>
                    <button
                        type='submit'
                        disabled={!valid}
                        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                            valid 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;