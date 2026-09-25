import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-white">
            <div className="bg-[#0e1122]/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/10 relative overflow-hidden transform transition-all hover:-translate-y-1">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-emerald-600/20 blur-3xl rounded-full pointer-events-none"></div>
                <FaCheckCircle className="text-emerald-400 text-7xl mx-auto mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                <h1 className="text-3xl font-black text-white mb-4 tracking-tight">Booking Confirmed!</h1>
                <p className="text-gray-300 mb-8 text-base leading-relaxed">Your ticket request has been submitted successfully. A confirmation notice will be updated on your dashboard.</p>
                <div className="space-y-4">
                    <Link to="/dashboard" className="block w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-purple-900/40 border border-white/10">
                        View My Tickets
                    </Link>
                    <Link to="/" className="block w-full bg-[#161a33] hover:bg-[#1f2447] text-gray-200 font-bold py-3.5 px-6 rounded-xl border border-white/10 transition">
                        Discover More Events
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;