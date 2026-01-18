'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/axios';


export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firm_name: '',
    ca_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      if (!form.firm_name || !form.ca_name || !form.email || !form.password) {
        return toast.error('All fields are required');
      }

      if (form.password !== form.confirmPassword) {
        return toast.error('Passwords do not match');
      }

      setLoading(true);

      await api.post('/auth/register', {
        firm_name: form.firm_name,
        ca_name: form.ca_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });

      toast.success('Registration successful. Await admin approval');
      window.location.href = '/login';

    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden">

      <div className="hidden md:block absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md md:max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT */}
            <div className="hidden md:flex flex-col justify-center p-10 text-white space-y-6">
              <h1 className="text-3xl font-bold">Register Your CA Firm</h1>
              <p className="text-slate-300">
                Use AI to answer compliance queries securely.
              </p>
              <ul className="space-y-3 text-slate-200">
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Firm-level access</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> PDF-based AI queries</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Staff & privacy control</li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="p-6 sm:p-8 md:p-10 bg-slate-900/40">

              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <p className="text-sm text-slate-400">Register your CA firm</p>
              </div>

              <div className="space-y-4">

                <input
                  name="firm_name"
                  placeholder="Firm Name"
                  value={form.firm_name}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3"
                />

                <input
                  name="ca_name"
                  placeholder="CA Name"
                  value={form.ca_name}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3"
                />

                <input
                  name="phone"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3"
                />

                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3"
                />

                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>

              <p className="text-center text-sm text-slate-400 mt-5">
                Already registered?{' '}
                <Link href="/login" className="text-emerald-400 hover:underline">
                  Sign in
                </Link>
              </p>

              <p className="text-center text-xs text-slate-500 mt-6">
                © {new Date().getFullYear()} Visinexus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
