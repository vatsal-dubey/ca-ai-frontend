'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import {API_URL} from '@/constants/app'
import Link from 'next/link';


export default function LoginPage() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
     const router = useRouter();
    const handleLogin = async () => {
        try {
            setLoading(true);
            if(!email || !password) {
                toast.error('Please enter email and password');
                return;
            }
            const res = await api.post('/auth/login', {
                    email,
                    password,
            });
             localStorage.setItem('token', res.data.token);
             localStorage.setItem('user', JSON.stringify(res.data.user));
            toast.success('Login successful');
            router.push('/dashboard');
            // alert('Login successful');
        } catch (err: any) {
            toast.error(
            err.response?.data?.message || 'Invalid email or password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center px-6">

            {/* Background Glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE – INFO */}
                <div className="text-white space-y-6">
                    <h1 className="text-4xl font-bold leading-tight">
                        AI for Chartered Accountants
                    </h1>

                    <p className="text-slate-300 text-lg">
                        Reduce compliance workload.
                        Get accurate answers from Acts, Rules & your firm’s documents.
                    </p>

                    <div className="space-y-4 text-slate-200">
                        <div className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <p>Instant answers from Income Tax, GST & Company Law</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <p>Ask questions from your own CA PDFs & files (RAG)</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <p>Firm-wise access, staff limits & data security</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                        <p className="text-sm text-slate-400">
                            Built for Indian CAs • Secure • Private • No data leakage
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE – LOGIN */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-white">
                            Sign in to your Firm
                        </h2>
                        <p className="text-sm text-slate-300 mt-1">
                            Continue to CA AI Assistant
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm text-slate-300">Email</label>
                        <input
                            type="email"
                            placeholder="ca@firm.com"
                            className="mt-1 w-full rounded-lg bg-white/20 border border-white/20 text-white placeholder-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-sm text-slate-300">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg bg-white/20 border border-white/20 text-white placeholder-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                   <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold tracking-wide
                                hover:scale-[1.02] hover:shadow-xl transition
                                disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <p className="text-center text-sm text-slate-300 mt-4">
                        Don’t have an account?{' '}
                        <Link
                            href="/register"
                            className="text-emerald-400 hover:text-emerald-300 font-medium underline-offset-4 hover:underline transition"
                        >
                            Register your firm
                        </Link>
                    </p>


                    <p className="text-center text-sm text-slate-400 mt-6">
                        © {new Date().getFullYear()} Visinexus
                    </p>
                </div>
            </div>
        </div>
    );
}
