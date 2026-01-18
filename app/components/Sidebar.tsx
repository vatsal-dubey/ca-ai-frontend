'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import {
    LayoutDashboard,
    Bot,
    FileText,
    Users,
    CreditCard,
    Settings,
} from 'lucide-react';
import { useSidebar } from './SidebarContext';

const menu = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Assistant', href: '/dashboard/assistant', icon: Bot },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText },
    { name: 'Staff', href: '/dashboard/staff', icon: Users },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { open, setOpen } = useSidebar();

    return (
        <>
            {/* Overlay (mobile) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-blue-900
  transform transition-transform duration-300
  ${open ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0`}
            >

                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-blue-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
                            CA
                        </div>
                        <span className="text-white font-semibold text-lg">CA AI</span>
                    </div>

                    {/* Close button (mobile) */}
                    <button
                        onClick={() => setOpen(false)}
                        className="md:hidden text-blue-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="px-3 py-6 space-y-1">
                    {menu.map(({ name, href, icon: Icon }) => {
                        const active = pathname === href;

                        return (
                            <Link
                                key={name}
                                href={href}
                                onClick={() => setOpen(false)}
                                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition
                  ${active
                                        ? 'bg-white/10 text-white'
                                        : 'text-blue-200 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {active && (
                                    <span className="absolute left-0 h-6 w-1 bg-white rounded-r-md" />
                                )}
                                <Icon size={18} />
                                {name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
