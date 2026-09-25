import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle } from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading dashboard...</div>;

    return (
        <div className="max-w-6xl mx-auto text-white">
            <div className="bg-[#0e1122]/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-white/10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>
                <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black uppercase tracking-widest shrink-0 border border-purple-400/30 shadow-lg shadow-purple-900/30">
                    {user?.name.charAt(0)}
                </div>
                <div className="flex flex-col items-center sm:items-start relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Welcome, {user?.name}!</h1>
                    <p className="text-purple-300 text-sm flex items-center justify-center sm:justify-start gap-2 bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot"></span> User Dashboard
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                    <FaTicketAlt className="text-purple-400" /> My Booking Requests
                </h2>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-[#0e1122]/90 backdrop-blur-md rounded-3xl shadow-xl p-12 text-center border border-white/10">
                    <div className="w-20 h-20 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaTicketAlt className="text-purple-400 text-3xl" />
                    </div>
                    <p className="text-xl text-gray-400 mb-6 mt-4 font-medium">You haven't booked any events yet.</p>
                    <Link to="/" className="inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-purple-900/40 border border-white/10">
                        Browse Events
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-[#0e1122]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 transition border border-white/10 flex flex-col">
                            <div className="p-6 border-b border-white/10 flex-grow">
                                {booking.eventId ? (
                                    <>
                                        <div className="flex justify-between items-start mb-4 gap-3">
                                            <h3 className="text-lg font-bold text-white leading-tight">{booking.eventId.title}</h3>
                                            <div className="flex flex-col gap-1.5 items-end shrink-0">
                                                <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-wider border ${booking.status === 'confirmed' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' :
                                                    booking.status === 'cancelled' ? 'bg-red-950/80 text-red-300 border-red-500/30' :
                                                        'bg-amber-950/80 text-amber-300 border-amber-500/30'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                                {booking.status !== 'cancelled' && (
                                                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-wider border ${booking.paymentStatus === 'paid' ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' : 'bg-slate-800 text-gray-300 border-slate-700'
                                                        }`}>
                                                        {booking.paymentStatus.replace('_', ' ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400 mb-4 space-y-1.5">
                                            <p><strong className="text-gray-300">Date:</strong> {new Date(booking.eventId.date).toLocaleDateString()}</p>
                                            <p><strong className="text-gray-300">Amount:</strong> {booking.amount === 0 ? <span className="text-emerald-400 font-bold">Free</span> : `₹${booking.amount}`}</p>
                                            <p><strong className="text-gray-300">Requested:</strong> {new Date(booking.bookedAt).toLocaleDateString()}</p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-red-400 italic">Event details unavailable (might have been deleted)</p>
                                )}
                            </div>
                            <div className="p-4 bg-[#14182e]/80 flex justify-between items-center shrink-0">
                                {booking.eventId && booking.status !== 'cancelled' ? (
                                    <>
                                        <Link to={`/events/${booking.eventId._id}`} className="text-purple-400 font-semibold text-sm hover:text-purple-300 hover:underline">View Event</Link>
                                        <button
                                            onClick={() => cancelBooking(booking._id)}
                                            className="text-red-400 font-semibold text-sm hover:text-red-300 transition flex items-center gap-1"
                                        >
                                            <FaTimesCircle /> Cancel
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full text-center text-sm text-gray-500 italic">Booking Cancelled</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;