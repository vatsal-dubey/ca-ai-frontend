'use client';

import { Menu } from 'lucide-react';
import { useSidebar } from './SidebarContext';

export default function Header() {
  const { setOpen } = useSidebar();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">

      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-slate-700"
        >
          <Menu size={22} />
        </button>

        <span className="text-sm text-slate-700">
          Welcome back
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-900">
          ABC & Co.
        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          CA
        </div>
      </div>
    </header>
  );
}
