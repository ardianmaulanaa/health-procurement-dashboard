"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const goToDashboard = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (email === "admin@dinkes.go.id" && password === "admin123") {
      goToDashboard();
      return;
    }

    setError("Email atau password salah.");
  };

  const handleAdminAccountLogin = () => {
    setEmail("admin@dinkes.go.id");
    setPassword("admin123");
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#F8FAFC] text-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f1f7ff_45%,#e0efff_100%)]" />
      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 h-[520px] w-[520px] rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,#93c5fd_1px,transparent_1px),linear-gradient(to_bottom,#93c5fd_1px,transparent_1px)] bg-[size:46px_46px]" />

      <section className="relative z-10 flex h-full items-center justify-center px-5 py-5">
        <div className="grid h-full w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 shadow-[0_35px_120px_rgba(37,99,235,0.18)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Panel */}
          <div className="relative hidden overflow-hidden bg-[#0B1F4D] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(59,130,246,0.85),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(14,165,233,0.55),transparent_35%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(15,23,42,0.12),rgba(15,23,42,0.96))]" />

            <div className="absolute -right-28 top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-48 top-0 h-[460px] w-[460px] rounded-full border border-white/10" />
            <div className="absolute -bottom-36 -left-36 h-96 w-96 rounded-full border border-white/10" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-blue-800 shadow-2xl shadow-blue-950/30">
                  PBJ
                </div>

                <div>
                  <h1 className="text-lg font-black tracking-wide">
                    Pengadaan Barang/Jasa
                  </h1>
                  <p className="text-sm text-blue-100">
                    Management System
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-blue-50 backdrop-blur">
                Secure Portal
              </span>
            </div>

            <div className="relative z-10 max-w-xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-50 backdrop-blur">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-300" />
                </span>
                Portal Manajemen Pengadaan
              </div>

              <div className="mb-6 overflow-hidden">
                <h1 className="animate-dinkes text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                  Dinkes Jabar
                </h1>
              </div>

              <h2 className="text-5xl font-black leading-[1.08] tracking-[-0.04em]">
                Sistem pengelolaan pengadaan barang dan jasa.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                Masuk ke dashboard untuk mengelola data pengadaan, dokumen,
                status proses, dan administrasi layanan.
              </p>
            </div>

            <div className="relative z-10 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm font-bold text-blue-100">Akses Admin</p>
              <p className="mt-2 text-2xl font-black">
                Dashboard Pengadaan Barang/Jasa
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex h-full items-center justify-center overflow-hidden px-6 py-6 sm:px-10 lg:px-12">
            <div className="max-h-full w-full max-w-md overflow-y-auto">
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B57D0] text-lg font-black text-white shadow-lg shadow-blue-200">
                  PBJ
                </div>

                <div>
                  <h1 className="animate-dinkes font-black text-slate-950">
                    Dinkes Jabar
                  </h1>
                  <p className="text-sm text-slate-500">
                    Pengadaan Barang/Jasa
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-blue-700">
                  Secure Access
                </p>

                <h2 className="text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl">
                  Masuk Sistem
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                  Gunakan akun yang sudah terdaftar untuk masuk ke dashboard
                  pengadaan barang/jasa.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Email
                  </label>

                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600 transition group-focus-within:bg-blue-600 group-focus-within:text-white">
                      @
                    </div>

                    <input
                      type="email"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-16 py-4 text-sm font-medium text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Password
                  </label>

                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600 transition group-focus-within:bg-blue-600 group-focus-within:text-white">
                      ●
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-16 py-4 pr-24 text-sm font-medium text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-sm">
                  <label className="flex cursor-pointer items-center gap-2 font-medium text-slate-500">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 accent-blue-700"
                    />
                    Ingat saya
                  </label>

                  <button
                    type="button"
                    className="font-bold text-blue-700 transition hover:text-blue-900"
                  >
                    Lupa password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl bg-[#0B57D0] px-5 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  <span className="relative z-10">Masuk ke Dashboard</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
                </button>

                <button
                  type="button"
                  onClick={handleAdminAccountLogin}
                  className="w-full rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-black text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  Masuk dengan Akun Admin
                </button>
              </form>

              <div className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <p>© 2026 Pengadaan Barang/Jasa</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}