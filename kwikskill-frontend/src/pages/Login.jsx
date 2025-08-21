import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { loginUser, checkUserProfile } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Firebase Authentication
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      
      try {
        // Backend Authentication
        await loginUser();
        // Check Profile Status
        const profileData = await checkUserProfile();
        
        if (profileData?.name) {
          navigate('/dashboard');
        } else {
          navigate('/create-profile');
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        setError(apiError.message || 'Failed to connect to server');
      }
    } catch (authError) {
      console.error('Auth Error:', authError);
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition
              ${loading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <Link 
            to="/signup" 
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
