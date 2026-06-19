import React, { useState, useEffect } from 'react';
import API from '../api/api'; // Make sure this points to your api.js file
import './Login.css';

export default function Login() {
    // --- UI States ---
    const [modalState, setModalState] = useState('hidden');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // --- Form States ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // --- Modal Controls ---
    const openAdminModal = () => {
        setModalState('entering');
        setTimeout(() => setModalState('entered'), 10);
        document.body.style.overflow = 'hidden';
    };

    const closeAdminModal = () => {
        setModalState('exiting');
        setTimeout(() => {
            setModalState('hidden');
            document.body.style.overflow = '';
            // Reset form when closing
            setEmail('');
            setPassword('');
            setErrorMessage('');
        }, 300);
    };

    // --- Your Custom API Connection ---
// --- Your Custom API Connection ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Clear previous errors

        try {
            // Using your custom API instance!
            const res = await API.post("/admin/login", { email, password });
            
            // Your exact token logic
            localStorage.setItem("adminToken", res.data.token);
            
            // Your exact redirect
            window.location = "/dashboard";
            
        } catch (err) {
            // Beautiful inline error handling capturing your backend's exact message
            console.error("Login Error:", err);
            setErrorMessage(err.response?.data?.message || "Login Failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Animations & Icons ---
    useEffect(() => {
        // Inject Phosphor Icons script
        if (!document.getElementById('phosphor-icons')) {
            const script = document.createElement('script');
            script.id = 'phosphor-icons';
            script.src = "https://unpkg.com/@phosphor-icons/web";
            document.head.appendChild(script);
        }

        // Initialize Scroll Reveals
        const reveals = document.querySelectorAll('.reveal');
        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        reveals.forEach((element) => {
            revealOnScroll.observe(element);
        });

        // Trigger immediately for elements already in view on load
        setTimeout(() => {
            reveals.forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    element.classList.add('active');
                }
            });
        }, 100);

        return () => {
            reveals.forEach((element) => {
                revealOnScroll.unobserve(element);
            });
        };
    }, []);

    return (
        <div className="relative min-h-screen antialiased selection:bg-[#a855f7] selection:text-white bg-[#0a0a0f] text-slate-50 overflow-x-hidden">
            
            {/* Embedded Styles to prevent missing CSS errors in preview */}
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background-color: #0a0a0f;
                    color: #f8fafc;
                    overflow-x: hidden;
                    scroll-behavior: smooth;
                }
                .perspective-container { perspective: 1500px; }
                .preserve-3d { transform-style: preserve-3d; }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(-20deg); }
                    50% { transform: translateY(-20px) rotateX(15deg) rotateY(-20deg); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateZ(60px) translateY(0px); }
                    50% { transform: translateZ(60px) translateY(-15px); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateZ(120px) translateY(0px); }
                    50% { transform: translateZ(120px) translateY(-10px); }
                }
                @keyframes float-slow-alt {
                    0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(20deg); }
                    50% { transform: translateY(-20px) rotateX(15deg) rotateY(20deg); }
                }
                
                .layer-base { animation: float-slow 8s ease-in-out infinite; box-shadow: -30px 30px 60px rgba(0, 0, 0, 0.6); }
                .layer-base-alt { animation: float-slow-alt 8s ease-in-out infinite; box-shadow: 30px 30px 60px rgba(0, 0, 0, 0.6); }
                .layer-middle { animation: float-medium 6s ease-in-out infinite; }
                .layer-top { animation: float-fast 4s ease-in-out infinite; }
                
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                
                .reveal {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
                }
                .reveal.active {
                    opacity: 1;
                    transform: translateY(0);
                }
                .glow-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    z-index: -1;
                    opacity: 0.4;
                    pointer-events: none;
                }
            `}} />

            {/* Ambient Background Lighting */}
            <div className="glow-orb bg-[#6366f1] w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
            <div className="glow-orb bg-[#a855f7] w-[600px] h-[600px] top-[40%] right-[-200px] opacity-20"></div>

            {/* Header with Admin Button */}
            <header className="pt-10 pb-6 px-6 lg:px-12 max-w-7xl mx-auto flex justify-between items-center relative z-50">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                        <i className="ph-bold ph-radar text-2xl"></i>
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white italic">
                        Find <span className="text-slate-400">it !</span>
                    </span>
                </div>
                
                <button onClick={openAdminModal} className="px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-sm font-semibold border border-white/10 hover:bg-white/5 glass transition-all flex items-center gap-2 text-slate-300 hover:text-white hover:border-[#a855f7]/50 group cursor-pointer">
                    <i className="ph-bold ph-shield-star text-lg text-[#a855f7] group-hover:text-[#6366f1] transition-colors"></i>
                    <span className="hidden sm:inline">Admin Panel</span>
                    <span className="sm:hidden">Admin</span>
                </button>
            </header>

            <main className="max-w-7xl mx-auto px-6 lg:px-12">
                
                {/* Hero Section */}
                <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-16 py-12">
                    <div className="w-full lg:w-1/2 z-10 reveal">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#a855f7] text-sm font-semibold tracking-wide mb-6">
                            <i className="ph-fill ph-sparkle"></i>
                            Next-Generation Recovery
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
                            Reunite with your 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"> belongings</span> in a new dimension.
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-400 font-light leading-relaxed max-w-lg mb-8">
                            Smart system to manage lost & found items with precision and speed.
                            We connect what is lost with those who find it through an intuitive, seamless system.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a href="https://github.com/madari-anirudh/lost-and-found-app/releases/download/v1.1/lostandfound.V1.1.apk" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <i className="ph-bold ph-download-simple text-2xl relative z-10"></i>
                                <span className="relative z-10">Download App</span>
                            </a>
                        </div>
                    </div>

                    {/* 3D Layered Illustration */}
                    <div className="w-full lg:w-1/2 h-[500px] perspective-container flex justify-center items-center reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="relative w-[320px] h-[400px] rounded-3xl glass layer-base preserve-3d overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" alt="Map Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent"></div>
                            
                            <div className="absolute top-12 left-[-20px] right-[-20px] p-4 rounded-2xl bg-[#151520]/80 backdrop-blur-md border border-white/10 shadow-2xl layer-middle preserve-3d">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-[#6366f1]/20 flex items-center justify-center text-[#6366f1]">
                                        <i className="ph-fill ph-wallet text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Leather Wallet</h3>
                                        <p className="text-xs text-slate-400">Lost near Central Park</p>
                                    </div>
                                </div>
                                <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80" alt="Wallet" className="w-full h-32 object-cover rounded-xl mb-2" />
                            </div>

                            <div className="absolute bottom-16 right-[-40px] px-5 py-4 rounded-2xl bg-gradient-to-r from-emerald-500/90 to-emerald-400/90 backdrop-blur-xl border border-emerald-300/30 shadow-[0_20px_40px_rgba(16,185,129,0.3)] layer-top flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500">
                                    <i className="ph-bold ph-check"></i>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Match Found!</p>
                                    <p className="text-emerald-100 text-xs">Item located nearby</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Brief Explanation Divider */}
                <section className="py-24 flex flex-col items-center justify-center text-center reveal">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">How it works</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full mb-8"></div>
                    <p className="text-xl text-slate-400 font-light max-w-2xl">
                        The architecture of <span className="italic text-white">Find it !</span> is designed to be invisible yet powerful. 
                        Using intelligent data structuring, reported items are cross-referenced across our entire network instantly.
                    </p>
                </section>

                {/* Feature 1: Intelligent Sorting */}
                <section className="min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-16 py-12">
                    <div className="w-full lg:w-1/2 h-[450px] perspective-container flex justify-center items-center reveal">
                        <div className="relative w-[300px] h-[380px] rounded-[2rem] bg-[#151520] layer-base-alt preserve-3d border border-white/5">
                            <div className="absolute inset-4 grid grid-cols-2 grid-rows-3 gap-3">
                                <div className="rounded-xl bg-slate-800/50 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1584985552399-52e07e8ebbc1?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover opacity-50" alt="Keys" />
                                </div>
                                <div className="rounded-xl bg-slate-800/50 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover opacity-50" alt="Glasses" />
                                </div>
                                <div className="rounded-xl bg-slate-800/50 col-span-2 row-span-2 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Headphones" />
                                    <div className="absolute inset-0 bg-[#6366f1]/20 mix-blend-overlay"></div>
                                </div>
                            </div>

                            <div className="absolute top-[40%] left-[-30px] right-[-30px] h-[60px] glass rounded-xl border-t border-b border-[#a855f7]/50 flex items-center justify-center layer-middle preserve-3d shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                <div className="w-full h-[2px] bg-[#a855f7] animate-pulse relative">
                                    <div className="absolute inset-0 shadow-[0_0_15px_#a855f7]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="w-14 h-14 rounded-2xl bg-[#151520] flex items-center justify-center text-[#a855f7] mb-6 shadow-lg border border-white/5">
                            <i className="ph-fill ph-scan text-3xl"></i>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Intelligent Sorting</h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            Our system captures the core characteristics of every entry. Whether it is a set of keys or a smart device, attributes are categorized visually and textually. 
                            When an item is reported found, the data layers align to suggest the most accurate matches instantly.
                        </p>
                    </div>
                </section>

                {/* Feature 2: Secure Verification */}
                <section className="min-h-[70vh] flex flex-col lg:flex-row items-center justify-between gap-16 py-12 mb-20">
                    <div className="w-full lg:w-1/2 reveal">
                        <div className="w-14 h-14 rounded-2xl bg-[#151520] flex items-center justify-center text-[#6366f1] mb-6 shadow-lg border border-white/5">
                            <i className="ph-fill ph-shield-check text-3xl"></i>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Secure Verification</h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            Recovery is handled with utmost privacy. The platform utilizes a multi-layered verification protocol. Identifiable details are kept hidden until ownership is proven, ensuring that items are returned strictly to their rightful owners through an encrypted communication channel.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2 h-[450px] perspective-container flex justify-center items-center reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="relative w-[280px] h-[360px] rounded-full glass layer-base preserve-3d flex items-center justify-center border-[8px] border-[#151520]/50">
                            <div className="absolute inset-0 rounded-full border border-[#6366f1]/30 animate-[spin_10s_linear_infinite] border-dashed"></div>
                            
                            <div className="w-32 h-32 rounded-3xl bg-[#6366f1]/10 flex items-center justify-center layer-middle preserve-3d border border-[#6366f1]/20 backdrop-blur-md">
                                <i className="ph-fill ph-lock-key text-5xl text-[#6366f1] drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"></i>
                            </div>

                            <div className="absolute top-10 right-[-20px] px-4 py-2 rounded-xl glass border border-white/10 layer-top text-xs font-bold tracking-wider text-slate-300">
                                ENCRYPTED
                            </div>
                            <div className="absolute bottom-20 left-[-40px] px-4 py-2 rounded-xl glass border border-white/10 layer-top text-xs font-bold tracking-wider text-slate-300 flex items-center gap-2">
                                <i className="ph-fill ph-fingerprint text-[#a855f7]"></i> VERIFIED
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="py-12 border-t border-white/5 text-center reveal">
                    <h3 className="text-2xl font-bold text-white mb-2 italic">Find it !</h3>
                    <p className="text-sm text-slate-500 font-light">Bringing order to the lost. Restoring peace of mind.</p>
                </footer>

            </main>

            {/* Admin Login Modal Overlay */}
            <div id="adminModal" className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${modalState === 'hidden' ? 'hidden' : ''}`}>
                <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-md transition-opacity" onClick={closeAdminModal}></div>
                
                <div className={`relative w-full max-w-md p-8 rounded-3xl bg-[#151520]/90 glass border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform transition-all duration-300 preserve-3d ${modalState === 'entered' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#a855f7] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                    
                    <button onClick={closeAdminModal} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none disabled:opacity-50" disabled={isLoading}>
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>

                    <div className="text-center mb-8 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <i className="ph-bold ph-shield-check text-3xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
                        <p className="text-sm text-slate-400">Please enter your credentials to continue</p>
                    </div>

                    <form className="space-y-5 relative z-10" onSubmit={handleLoginSubmit}>
                        
                        {/* Beautiful Error Display */}
                        {errorMessage && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-center gap-2 animate-pulse">
                                <i className="ph-bold ph-warning-circle"></i>
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <i className="ph-fill ph-envelope-simple text-lg"></i>
                                </div>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all disabled:opacity-50" 
                                    placeholder="admin@findit.com" 
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <i className="ph-fill ph-lock-key text-lg"></i>
                                </div>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all disabled:opacity-50" 
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <i className="ph-bold ph-spinner animate-spin"></i>
                                        Authenticating...
                                    </>
                                ) : (
                                    'Secure Login'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}