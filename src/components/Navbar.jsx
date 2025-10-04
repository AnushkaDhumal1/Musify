import { ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import React from 'react'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = () =>{
        logout();
    }
    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-block p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center">
                        <ChevronLeft className='w-4 h-4 text-white' />
                    </div>
                    <div className="w-8 h-8 bg-block p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center">
                        <ChevronRight className='w-4 h-4 text-white' />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
                        Explore Premium
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-2xl">
                    <User className="w-4 h-4 text-white" />
                    <span className="text-white text-sm hidden sm:inline">
                        {user?.email?.split("@")[0]}
                    </span>
                </div>

                <button 
                onClick={handleLogout}
                title='LogOut'
                className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-2xl text-[15px] cursor-pointer transition-colors flex items-center gap-1">
                <LogOut className='w-4 h-4' />
                <span className="hidden sm:inline">LogOut</span>
                </button>
            </div>
        </>
    )
}

export default Navbar;