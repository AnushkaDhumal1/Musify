import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Register from './Register';


const AuthWrapper = ({children}) => {
    const {isAuthenticated, loading} = useAuth();
    const [showRegister, setShowRegister] = useState(false); 

    if(loading){
     return(
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb04"></div>
                <p className="text-white text-lg">Loading...</p>
            </div>
        </div>
     )
    }

    if(!isAuthenticated()){
        return showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
        ):(
            <Login onSwitchToRegister={() => setShowRegister(true)} />
        );
    }
    
  return children;
}

export default AuthWrapper;