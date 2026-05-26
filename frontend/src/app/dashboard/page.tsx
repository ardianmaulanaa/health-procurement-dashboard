"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const summaryCards = [
  {
    title: "Total Paket",
    value: "Soon",
    desc: "Akan ditampilkan setelah terhubung database",
  },
  {
    title: "Paket Berjalan",
    value: "Soon",
    desc: "Menunggu integrasi data pengadaan",
  },
  {
    title: "Menunggu Review",
    value: "Soon",
    desc: "Data review akan muncul otomatis",
  },
  {
    title: "Paket Selesai",
    value: "Soon",
    desc: "Rekap selesai akan terhubung database",
  },
];

const menuItems = [
  {
    icon: "▦",
    label: "Dashboard",
    active: true,
  },
  {
    icon: "□",
    label: "Paket Pengadaan",
    active: false,
  },
  {
    icon: "◇",
    label: "Dokumen",
    active: false,
  },
  {
    icon: "○",
    label: "Penyedia",
    active: false,
  },
  {
    icon: "△",
    label: "Laporan",
    active: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (loginStatus !== "true") {
      router.push("/login");
      return;
    }

    setIsReady(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-sm font-semibold">Memuat dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F8FC] text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#ffffff_0%,#f6f8fc_45%,#eaf2ff_100%)]" />
      <div className="fixed -left-44 -top-44 -z-10 h-[420px] w-[420px] rounded-full bg-blue-300/30 blur-3xl" />
      <div className="fixed -bottom-48 -right-48 -z-10 h-[520px] w-[520px] rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 border-r border-slate-200/80 bg-white/90 px-6 py-6 backdrop-blur-xl lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-200">
              DK
            </div>

            <div>
              <h1 className="font-black tracking-tight text-slate-950">
                Dinkes Jabar
              </h1>
              <p className="text-xs font-semibold text-slate-500">
                Admin Procurement
              </p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                  item.active
                    ? "bg-blue-700 text-white shadow-lg shadow-blue-100"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50/80 p-5">
            <p className="text-sm font-black text-slate-900">
              Status Sistem
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Dashboard sedang disiapkan untuk integrasi database pengadaan,
              dokumen, penyedia, dan laporan.
            </p>

            <div className="mt-4 rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Database
              </p>
              <p className="mt-1 text-sm font-bold text-slate-700">
                Coming Soon
              </p>
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1 px-5 py-6 md:px-8">
          {/* Topbar */}
          <header className="mb-8 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-700">
                  Dashboard Admin
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
                  Sistem Manajemen Pengadaan
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Panel monitoring internal untuk mengelola paket pengadaan,
                  dokumen, penyedia, serta laporan setelah sistem terhubung ke
                  database.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/")}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                >
                  Landing Page
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Summary Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-bold text-slate-500">
                    {card.title}
                  </p>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Soon
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950">
                  {card.value}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            {/* Table */}
            <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                    Data Paket Pengadaan
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Data akan otomatis muncul setelah modul database aktif.
                  </p>
                </div>

                <button
                  disabled
                  className="cursor-not-allowed rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-400"
                >
                  Tambah Paket Soon
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      <th className="px-4 py-2">Nama Paket</th>
                      <th className="px-4 py-2">Kategori</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Tanggal</th>
                      <th className="px-4 py-2">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="bg-slate-50/80 text-sm font-semibold text-slate-500">
                      <td
                        colSpan={5}
                        className="rounded-2xl px-4 py-12 text-center"
                      >
                        <div className="mx-auto flex max-w-md flex-col items-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-700">
                            □
                          </div>

                          <h4 className="mt-4 text-lg font-black text-slate-800">
                            Belum Ada Data
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            Tabel paket pengadaan masih kosong. Nantinya data
                            akan ditampilkan langsung dari database.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-100 bg-[#0B1F4D] p-6 text-white shadow-xl shadow-blue-100/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-100">
                      Progress Keseluruhan
                    </p>
                    <h3 className="mt-5 text-5xl font-black tracking-[-0.05em]">
                      Soon
                    </h3>
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">
                    Database
                  </span>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[0%] rounded-full bg-white" />
                </div>

                <p className="mt-4 text-sm leading-6 text-blue-100">
                  Persentase progress akan dihitung otomatis berdasarkan data
                  paket pengadaan yang sudah tersimpan.
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black tracking-[-0.03em] text-slate-950">
                      Aktivitas Terbaru
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Riwayat aktivitas sistem.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Soon
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
                  <p className="text-sm font-black text-slate-700">
                    Belum Ada Aktivitas
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Aktivitas terbaru akan muncul setelah sistem mulai menerima
                    data dari database.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
                <h3 className="text-lg font-black tracking-[-0.03em] text-slate-950">
                  Modul Sistem
                </h3>

                <div className="mt-5 space-y-3">
                  {["Database", "Pengadaan", "Dokumen", "Laporan"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                      >
                        <p className="text-sm font-bold text-slate-700">
                          {item}
                        </p>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                          Soon
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}