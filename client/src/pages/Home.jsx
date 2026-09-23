import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt, FaUsers, FaChevronDown } from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400); // 400ms debounce
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-[#090b18] text-white rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                {/* Concert Background Image & Overlays */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#090b18]/80 via-[#090b18]/60 to-[#090b18]"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none"></div>

                {/* Top Left Floating Badge */}
                <div className="hidden lg:flex absolute top-10 left-8 z-20 items-center gap-3 bg-[#0d1024]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-dot shadow-[0_0_8px_#34d399]"></div>
                    <div className="text-left">
                        <div className="text-white font-bold text-xs">Live Events</div>
                        <div className="text-gray-400 text-[10px]">Happening Near You</div>
                    </div>
                </div>

                {/* Top Right Floating Badge */}
                <div className="hidden lg:flex absolute top-10 right-8 z-20 items-center gap-3 bg-[#0d1024]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl">
                    <div className="w-8 h-8 bg-purple-900/50 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-300">
                        <FaUsers className="text-sm" />
                    </div>
                    <div className="text-left">
                        <div className="text-gray-400 text-[10px]">Trusted by</div>
                        <div className="text-white font-bold text-xs">10K+ Event Lovers</div>
                    </div>
                </div>

                {/* Hero Center Content */}
                <div className="relative px-6 py-16 sm:py-24 text-center flex flex-col items-center z-10">
                    <span className="bg-purple-950/50 text-purple-200 border border-purple-500/30 backdrop-blur-md px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm">
                        WELCOME TO BOOKMYEVENT
                    </span>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-white drop-shadow-md max-w-4xl">
                        Find Your Next <br />
                        <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-sky-400 bg-clip-text text-transparent">
                            Unforgettable
                        </span> Experience
                    </h1>

                    <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
                        Discover the best tech conferences, late-night music festivals, and hands-on workshops happening directly in your area. Secure your spot today.
                    </p>

                    {/* Search Bar */}
                    <div className="w-full max-w-2xl mx-auto relative flex items-center mb-10 group shadow-[0_0_35px_rgba(99,102,241,0.25)] rounded-full">
                        <FaSearch className="absolute left-6 text-gray-500 text-xl group-focus-within:text-indigo-600 transition-colors z-10" />
                        <input
                            type="text"
                            placeholder="Search events by title..."
                            className="w-full pl-16 pr-16 py-4.5 rounded-full text-base sm:text-lg text-slate-900 bg-[#f4f7ff] border-2 border-transparent focus:border-indigo-400 focus:outline-none transition-all placeholder-gray-500 font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="absolute right-2 w-11 h-11 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/40 transition-all transform active:scale-95">
                            <FaSearch className="text-sm" />
                        </button>
                    </div>

                    {/* Decorative Sketch Annotations */}
                    <div className="hidden md:flex justify-between w-full max-w-4xl px-8 pointer-events-none -mt-4 mb-4 text-xs text-gray-400 font-serif italic">
                        <div className="flex flex-col items-start transform -rotate-6">
                            <span>Events</span>
                            <span>Bring People</span>
                            <span className="flex items-center gap-1">Together <span className="text-lg">⤷</span></span>
                        </div>
                        <div className="flex flex-col items-end transform rotate-6 text-right">
                            <span>Good</span>
                            <span>Events</span>
                            <span>Brighter</span>
                            <span className="flex items-center gap-1"><span className="text-lg">⤶</span> Tomorrows</span>
                        </div>
                    </div>

                    {/* Scroll Down Indicator */}
                    <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition mt-2">
                        <div className="w-5 h-8 border-2 border-gray-400/70 rounded-full flex justify-center pt-1.5 mb-1.5">
                            <div className="w-1 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium tracking-wide">Explore Events</span>
                        <FaChevronDown className="text-[10px] text-gray-400 animate-bounce mt-1" />
                    </div>
                </div>
            </div>

            {/* Why Choose Us / Features row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-[#0e1122]/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/30 text-purple-300 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-950/50 group-hover:scale-110 transition duration-300">
                        <FaRegClock />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Fast Booking</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.</p>
                </div>

                <div className="bg-[#0e1122]/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/30 text-purple-300 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-950/50 group-hover:scale-110 transition duration-300">
                        <FaTicketAlt />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Seamless Access</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Download tickets instantly or manage them right from your personal dashboard easily.</p>
                </div>

                <div className="bg-[#0e1122]/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/30 text-purple-300 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-950/50 group-hover:scale-110 transition duration-300">
                        <FaShieldAlt />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Secure Platform</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">All transactions and registrations are bounded by cutting-edge security and 2FA OTP tech.</p>
                </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-8 px-2 border-b border-white/10 pb-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Upcoming Events</h2>
                <div className="text-purple-300 text-sm font-medium bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
                    {events.length} results found
                </div>
            </div>

            {/* Events Grid */}
            {loading ? (
                <div className="text-center py-20 text-xl font-semibold text-gray-400">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-xl text-gray-400 bg-[#0e1122]/50 border border-white/10 rounded-2xl">No events found matching your search.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div key={event._id} className="bg-[#0e1122]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 flex flex-col group">
                            <div className="h-48 bg-slate-900 overflow-hidden relative">
                                {event.image ? (
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-gray-400 font-bold text-2xl">
                                        {event.category || 'Event'}
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-[#090b18]/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                                    {event.ticketPrice === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : <span className="text-white">₹{event.ticketPrice}</span>}
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-2">{event.category}</div>
                                <h2 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-purple-300 transition">{event.title}</h2>
                                
                                <div className="flex flex-col gap-2 mb-6 text-gray-300 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-purple-400 text-xs" />
                                        <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-purple-400 text-xs" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-4">{event.availableSeats} of {event.totalSeats} seats remaining</p>
                                    
                                    <Link to={`/events/${event._id}`} className="block w-full text-center bg-[#191e36] hover:bg-purple-600 text-white font-semibold py-2.5 rounded-xl transition duration-300 border border-white/10 shadow-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer Section */}
            <footer className="mt-20 pt-16 pb-12 border-t border-white/10 text-center">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm shadow-md">
                        <FaCalendarAlt />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
                        BookMy<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Event</span>
                    </span>
                </div>
                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                    The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let's make memories together.
                </p>
                <div className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                    &copy; {new Date().getFullYear()} BookMyEvent Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;