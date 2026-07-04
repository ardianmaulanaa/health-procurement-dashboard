"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

function DashboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  );
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  const router = useRouter();

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-dvh shrink-0 overflow-hidden border-r border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col ${
          desktopOpen ? "w-72 px-5 py-5" : "w-[92px] px-4 py-5"
        }`}
      >
        <div
          className={`flex items-center ${
            desktopOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-200">
              DK
            </div>

            {desktopOpen && (
              <div className="min-w-0">
                <h1 className="truncate font-black tracking-tight text-slate-950">
                  Dinkes Jabar
                </h1>
                <p className="truncate text-xs font-semibold text-slate-500">
                  Pengadaan Barang/Jasa
                </p>
              </div>
            )}
          </div>

          {desktopOpen && (
            <button
              type="button"
              onClick={() => setDesktopOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-black text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              title="Tutup menu"
            >
              ☰
            </button>
          )}
        </div>

        {!desktopOpen && (
          <button
            type="button"
            onClick={() => setDesktopOpen(true)}
            className="mt-5 flex h-11 w-full items-center justify-center rounded-2xl bg-slate-100 text-lg font-black text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            title="Buka menu"
          >
            ☰
          </button>
        )}

        <nav className="mt-8 space-y-2 overflow-hidden">
          <button
            type="button"
            className={`flex w-full items-center rounded-2xl bg-blue-700 text-left text-sm font-black text-white shadow-lg shadow-blue-100 transition ${
              desktopOpen ? "gap-3 px-4 py-3" : "justify-center px-0 py-3"
            }`}
            title="Dashboard"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <DashboardIcon />
            </span>

            {desktopOpen && <span>Dashboard</span>}
          </button>
        </nav>

        {desktopOpen && (
          <div className="mt-8 rounded-[1.5rem] border border-blue-100 bg-blue-50/70 p-4">
            <p className="text-sm font-black text-slate-900">Portal Admin</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Sistem informasi pengadaan barang/jasa.
            </p>
          </div>
        )}

        <div className="mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-red-50 hover:text-red-600 ${
              desktopOpen ? "px-5 py-3" : "p-3"
            }`}
            title="Logout"
          >
            {desktopOpen ? "Logout" : "⏻"}
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-200">
              DK
            </div>

            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                Dashboard
              </p>

              <h1 className="truncate text-lg font-black tracking-[-0.03em] text-slate-950">
                {title}
              </h1>

              {subtitle && (
                <p className="truncate text-xs font-semibold text-slate-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl font-black text-slate-700 transition active:scale-95"
            title="Buka menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            aria-label="Tutup menu"
          />

          <aside className="absolute right-0 top-0 flex h-dvh w-[84%] max-w-sm flex-col overflow-hidden rounded-l-[2rem] bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-100">
                  DK
                </div>

                <div className="min-w-0">
                  <h2 className="truncate font-black text-slate-950">
                    Dinkes Jabar
                  </h2>
                  <p className="truncate text-xs font-semibold text-slate-500">
                    Pengadaan Barang/Jasa
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-[#0B1F4D] p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                Menu Admin
              </p>
              <h3 className="mt-2 text-xl font-black">
                Pengadaan Barang/Jasa
              </h3>
            </div>

            <nav className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center gap-3 rounded-2xl bg-blue-700 px-4 py-3 text-left text-sm font-black text-white shadow-lg shadow-blue-100"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <DashboardIcon />
                </span>
                Dashboard
              </button>
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-auto rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-black text-red-600"
            >
              Logout
            </button>
          </aside>
        </div>
      )}
    </>
  );
}