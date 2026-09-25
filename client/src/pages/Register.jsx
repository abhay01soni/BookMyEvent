import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-[#0e1122]/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-purple-950/40 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/30 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none"></div>

            <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Create an Account</h2>
                <p className="text-gray-400 text-sm">Join BookMyEvent today</p>
            </div>

            {error && <div className="bg-red-950/60 text-red-300 border border-red-500/30 p-3 rounded-xl mb-6 text-center text-sm relative z-10">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {!showOTP ? (
                    <>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4.5 py-3.5 rounded-xl bg-[#151930] text-white border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder-gray-500 font-medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4.5 py-3.5 rounded-xl bg-[#151930] text-white border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder-gray-500 font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4.5 py-3.5 rounded-xl bg-[#151930] text-white border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder-gray-500 font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <p className="text-sm text-emerald-300 bg-emerald-950/60 p-3 mb-4 rounded-xl border border-emerald-500/30 text-center">
                            An OTP has been sent to your email. Please verify your account.
                        </p>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Verification Code (OTP)</label>
                        <input
                            type="text"
                            required
                            placeholder="6-digit code"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151930] text-white border border-white/10 focus:border-purple-500 outline-none transition font-bold tracking-widest text-center text-xl"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/40 active:scale-95 cursor-pointer border border-white/10 mt-2"
                >
                    {loading ? 'Processing...' : (showOTP ? 'Verify & Complete' : 'Sign Up')}
                </button>
            </form>

            {!showOTP && (
                <p className="text-center mt-6 text-gray-400 text-sm relative z-10">
                    Already have an account? <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition hover:underline ml-1">Sign in</Link>
                </p>
            )}
        </div>
    );
};

export default Register;