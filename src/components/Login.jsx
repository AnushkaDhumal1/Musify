import React from 'react';
import { assets } from "../assets/assets";
import  { useState } from "react";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = ({onSwitchToRegister}) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const{login} = useAuth();
             
        const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');


        if(!email || !password ){
          setError('Please fill all the fields.');
          toast.error('Please fill all the fields.');
          return;
        }

        setLoading(true);
        try{
            const result = await login(email, password);
            if(!result.success){
              toast.error(result.message);
                setError(result.message);
            }
            
        }catch(error){
            setError(error.message);
            toast.error('An unexpected error occurred. Please try again later.');
            
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/*Header*/}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center mb-6">
                            <img src={assets.MusicLogo} alt="logo" className="w-16 h-16" />
                            <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">
                    Continue Listning
                </p>

                {/*Login form*/}
                <div className="bg-gray-900/80 backdrop-plug-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className='block text-sm text-gray-200 mb-2'>Password</label>
                            <input
                                type="password"
                                name='password'
                                id='password'
                                autoComplete='new-password'
                                required
                                className='block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                                placeholder='Enter your Password' 
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                        </div>
                        {/* Submit Button*/}
                        <button className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105'>
                            {loading ? (
                               <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>      
                            ): (
                                'Signing In'
                            )}
                        </button>
                    </form>

                     {/* Switch to Register */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?
                        <button className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer" onClick={onSwitchToRegister}>Sign up hear</button>
                    </p>
                  </div>

                </div>
            </div>
        </div>
    )
}

export default Login;