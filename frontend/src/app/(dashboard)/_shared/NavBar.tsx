"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu, ShieldCheck } from "lucide-react";

type NavBarProps = {
  title: string;
  subtitle?: string;
  rightLabel?: string;
  onOpenMenu: () => void;
};

export default function NavBar({
  title,
  subtitle,
  rightLabel,
  onOpenMenu,
}: NavBarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.replace("/login");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="grid h-1.5 grid-cols-3">
          <div className="bg-[#08783f]" />
          <div className="bg-[#f5bd20]" />
          <div className="bg-[#159cc3]" />
        </div>

        <div className="flex min-h-[84px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={onOpenMenu}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#08783f] text-white shadow-sm transition hover:bg-[#066532] lg:hidden"
              aria-label="Buka menu"
              title="Buka menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2.6} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-[#08783f]">
                Sistem Monitoring Pengadaan Barang dan Jasa
              </p>
              <h1 className="mt-1 truncate text-xl font-black tracking-[-0.03em] text-slate-950 sm:text-2xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {rightLabel ? (
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-[#f4f7f5] px-4 py-2.5 md:flex">
                <ShieldCheck className="h-5 w-5 text-[#08783f]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Akses
                  </p>
                  <p className="text-xs font-black text-slate-700">
                    {rightLabel}
                  </p>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="h-5 w-5" strokeWidth={2.3} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
