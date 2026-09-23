import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-[#0b0e1e]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 flex items-center justify-center text-white border border-purple-400/30 shadow-lg shadow-purple-900/40 group-hover:scale-105 transition duration-300">
                            <FaCalendarAlt className="text-lg" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white flex items-center">
                            BookMy<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Event</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6 sm:gap-8">
                        <Link to="/" className="text-gray-300 hover:text-white font-medium text-sm sm:text-base transition-colors">
                            Events
                        </Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-300 hover:text-white font-medium text-sm sm:text-base transition-colors">
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-[#191e36] hover:bg-[#232a4a] text-gray-200 border border-white/15 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white font-medium text-sm sm:text-base transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-[#191e36] hover:bg-[#232a4a] text-gray-200 border border-white/15 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;