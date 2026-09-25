import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                await api.post('/bookings', { eventId: event._id, otp });
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                // Update local seats count dynamically after booking
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
    if (error && !event) return <div className="text-center py-20 text-xl text-red-500">{error || 'Event not found'}</div>;

    const isSoldOut = event.availableSeats <= 0;

    return (
        <div className="max-w-4xl mx-auto bg-[#0e1122]/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden mt-8 text-white">
            {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
            ) : (
                <div className="w-full h-64 bg-slate-900 flex items-center justify-center text-purple-400/50 text-6xl font-black uppercase tracking-widest border-b border-white/10">
                    {event.category}
                </div>
            )}

            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-8">
                    <div className="flex-1">
                        <div className="inline-block bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
                            {event.category}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{event.title}</h1>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 font-normal">{event.description}</p>
                    </div>

                    <div className="bg-[#14182e]/90 p-6 sm:p-8 rounded-2xl border border-white/10 min-w-[300px] w-full md:w-auto shrink-0 shadow-xl">
                        <h3 className="text-xl font-extrabold text-white mb-6 border-b border-white/10 pb-3">Booking Details</h3>

                        <div className="space-y-5 mb-8">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                                    <FaMoneyBillWave />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ticket Price</p>
                                    <p className="font-extrabold text-white text-lg">{event.ticketPrice === 0 ? <span className="text-emerald-400">Free</span> : `₹${event.ticketPrice}`}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                                    <FaChair />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</p>
                                    <p className="font-extrabold text-white">
                                        <span className={event.availableSeats < 10 ? 'text-amber-400' : 'text-emerald-400'}>{event.availableSeats}</span> / {event.totalSeats} seats
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</p>
                                    <p className="font-extrabold text-white">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
                                    <p className="font-extrabold text-white">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {showOTP && (
                            <div className="mb-4">
                                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Enter OTP to Confirm</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="6-digit code"
                                    className="w-full px-4 py-3 rounded-xl bg-[#1d2342] text-white border border-white/10 focus:border-purple-500 outline-none transition font-bold tracking-widest text-center text-xl"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-base transition shadow-lg border border-white/10 ${isSoldOut || (successMsg && !showOTP)
                                ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white active:scale-95'
                                }`}
                        >
                            {bookingLoading ? 'Processing...' : (showOTP ? 'Verify OTP & Confirm' : (successMsg && !showOTP ? 'Request Sent' : (isSoldOut ? 'Sold Out' : 'Confirm Registration')))}
                        </button>
                        {error && <p className="text-red-300 mt-4 text-center font-medium bg-red-950/60 p-3 rounded-xl border border-red-500/30 text-sm">{error}</p>}
                        {successMsg && <p className="text-emerald-300 mt-4 text-center font-medium bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30 text-sm">{successMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;