import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { setCredentials } from '../features/authSlice';
import toast, { Toaster } from 'react-hot-toast';

// Define the shape of the form data
interface LoginFormData {
  email: string;
  password?: string;
}

const LoginPage = () => {
  // 1. Add 'formState: { errors }' to extract validation errors
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data);
      const userRole = response.data.user.role; // Get role from backend
      
      dispatch(setCredentials({
        user: response.data.user,
        token: response.data.token
      }));

      toast.success(`Welcome back, ${response.data.user.name}!`);

      // 🚦 REDIRECTION LOGIC
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'instructor') {
        navigate('/instructor/dashboard');
      } else {
        navigate('/student/dashboard'); // Default for students
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login Failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to Learner LMS</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              {...register('email', { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })} 
              type="email" 
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {/* 3. SHOW VALIDATION ERROR */}
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              {...register('password', { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })} 
              type="password" 
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;