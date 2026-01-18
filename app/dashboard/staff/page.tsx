'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function StaffListPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">
                    Staff Members
                </h2>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={16} />
                    Create Staff
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-blue-50 text-blue-800">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-4">Rahul Sharma</td>
                            <td className="p-4">rahul@firm.com</td>
                            <td className="p-4">
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                                    Active
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-blue-700 hover:underline">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                <div className="border rounded-xl p-4 bg-white">
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-slate-600">rahul@firm.com</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        Active
                    </span>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white w-full md:max-w-lg md:rounded-xl p-6 h-full md:h-auto overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-800">
                                Create Staff
                            </h3>
                            <button onClick={() => setOpen(false)}>
                                <X />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input  placeholder="Full Name" className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                bg-white
                                text-slate-800
                                placeholder-slate-400
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-700
                            " />
                            <input className="
                                        w-full
                                        border
                                        rounded-lg
                                        px-4
                                        py-3
                                        bg-white
                                        text-slate-800
                                        placeholder-slate-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-700
                                    " placeholder="Email" type="email" />
                            <input   className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-4
                                                py-3
                                                bg-white
                                                text-slate-800
                                                placeholder-slate-400
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-700
                                            " placeholder="Mobile" />
                            <select className="input">
                                <option>Staff</option>
                            </select>

                            <button className="md:col-span-2 bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                                Create Staff
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
