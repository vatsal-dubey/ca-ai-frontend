'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { SidebarProvider } from '@/components/SidebarContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-dvh bg-white flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Content wrapper */}
        <div className="flex flex-1 flex-col">

          {/* Header */}
          <Header />

          {/* Main scrollable area */}
          <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
