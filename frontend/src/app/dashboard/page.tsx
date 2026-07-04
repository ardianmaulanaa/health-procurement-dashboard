"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";

type PaketStatus = "Draft" | "Review" | "Proses" | "Selesai";
type StatusFilter = "Semua" | PaketStatus;

type PaketPengadaan = {
  id: string;
  namaPaket: string;
  kategori: string;
  pagu: string;
  status: PaketStatus;
  tanggal: string;
};

const STORAGE_KEY = "paket_pengadaan_barang_jasa";

const filterOptions: StatusFilter[] = [
  "Semua",
  "Draft",
  "Review",
  "Proses",
  "Selesai",
];

export default function DashboardPage() {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [paketList, setPaketList] = useState<PaketPengadaan[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("Semua");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          setPaketList(parsedData);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsReady(true);
  }, [router]);

  const filteredPaket = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return paketList.filter((item) => {
      const matchKeyword =
        !keyword ||
        item.namaPaket.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword) ||
        item.tanggal.toLowerCase().includes(keyword);

      const matchStatus =
        activeFilter === "Semua" || item.status === activeFilter;

      return matchKeyword && matchStatus;
    });
  }, [paketList, search, activeFilter]);

  const summary = useMemo(() => {
    const totalPagu = paketList.reduce((total, item) => {
      return total + Number(item.pagu || 0);
    }, 0);

    return {
      total: paketList.length,
      draft: paketList.filter((item) => item.status === "Draft").length,
      review: paketList.filter((item) => item.status === "Review").length,
      proses: paketList.filter((item) => item.status === "Proses").length,
      selesai: paketList.filter((item) => item.status === "Selesai").length,
      totalPagu,
    };
  }, [paketList]);

  const summaryCards = [
    { title: "Total Paket", value: summary.total },
    { title: "Draft", value: summary.draft },
    { title: "Review", value: summary.review },
    { title: "Proses", value: summary.proses },
    { title: "Selesai", value: summary.selesai },
  ];

  const formatRupiah = (value: string | number) => {
    const numberValue = Number(value || 0);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(numberValue);
  };

  const getStatusClass = (status: PaketStatus) => {
    if (status === "Draft") return "bg-slate-100 text-slate-700";
    if (status === "Review") return "bg-amber-50 text-amber-700";
    if (status === "Proses") return "bg-blue-50 text-blue-700";
    return "bg-emerald-50 text-emerald-700";
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
    <main className="min-h-screen bg-[#F4F7FB] text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.13),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f6f8fc_45%,#eaf2ff_100%)]" />

      <div className="flex min-h-screen">
        <AppHeader
          title="Dinkes Jabar"
          subtitle="Pengadaan Barang/Jasa"
        />

        <section className="w-full flex-1 px-4 py-5 md:px-8">
          {/* Desktop Header */}
          <header className="mb-8 hidden rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-xl lg:block">
            <div>
              <p className="text-sm font-bold text-blue-700">
                Dashboard Admin
              </p>

              <h2 className="mt-1 text-4xl font-black tracking-[-0.04em] text-slate-950">
                Dashboard Pengadaan Barang/Jasa
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Melihat ringkasan dan data paket pengadaan.
              </p>
            </div>
          </header>

          {/* Mobile Total Card */}
          <section className="mb-5 rounded-[1.75rem] bg-[#0B1F4D] p-5 text-white shadow-xl shadow-blue-100/70 lg:hidden">
            <p className="text-sm font-semibold text-blue-100">
              Total Pagu Anggaran
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
              {formatRupiah(summary.totalPagu)}
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-xl font-black">{summary.total}</p>
                <p className="text-xs text-blue-100">Paket</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-xl font-black">{summary.proses}</p>
                <p className="text-xs text-blue-100">Proses</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-xl font-black">{summary.selesai}</p>
                <p className="text-xs text-blue-100">Selesai</p>
              </div>
            </div>
          </section>

          {/* Summary Desktop */}
          <section className="mb-6 hidden gap-5 lg:grid lg:grid-cols-5">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur"
              >
                <p className="text-sm font-bold text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950">
                  {card.value}
                </h3>
              </div>
            ))}
          </section>

          {/* Summary Mobile */}
          <section className="mb-5 lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {summaryCards.map((card) => (
                <div
                  key={card.title}
                  className="min-w-[135px] rounded-[1.5rem] border border-slate-100 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-xs font-bold text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-black text-slate-950">
                    {card.value}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Data Paket */}
          <section className="rounded-[2rem] border border-slate-100 bg-white/90 p-4 shadow-sm backdrop-blur-xl md:p-6">
            <div className="mb-5">
              <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                Data Paket Pengadaan
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Daftar paket pengadaan barang/jasa.
              </p>
            </div>

            <input
              type="text"
              placeholder="Cari paket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {filterOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                    activeFilter === item
                      ? "bg-blue-700 text-white shadow-lg shadow-blue-100"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="mt-5 space-y-4 lg:hidden">
              {filteredPaket.length === 0 ? (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-10 text-center">
                  <h4 className="text-lg font-black text-slate-800">
                    Belum Ada Data Paket
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Data paket pengadaan akan tampil di sini.
                  </p>
                </div>
              ) : (
                filteredPaket.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-black leading-6 text-slate-950">
                          {item.namaPaket}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          {item.kategori}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-xs font-bold text-slate-400">
                          Pagu
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-800">
                          {formatRupiah(item.pagu)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-xs font-bold text-slate-400">
                          Tanggal
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-800">
                          {item.tanggal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table */}
            <div className="mt-5 hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    <th className="px-4 py-2">Nama Paket</th>
                    <th className="px-4 py-2">Kategori</th>
                    <th className="px-4 py-2">Pagu</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Tanggal</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPaket.length === 0 ? (
                    <tr className="bg-slate-50/80 text-sm font-semibold text-slate-500">
                      <td
                        colSpan={5}
                        className="rounded-2xl px-4 py-12 text-center"
                      >
                        <h4 className="text-lg font-black text-slate-800">
                          Belum Ada Data Paket
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Data paket pengadaan akan tampil di sini.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredPaket.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-slate-50/80 text-sm font-semibold text-slate-700"
                      >
                        <td className="rounded-l-2xl px-4 py-4">
                          <p className="font-black text-slate-900">
                            {item.namaPaket}
                          </p>
                        </td>

                        <td className="px-4 py-4">{item.kategori}</td>

                        <td className="px-4 py-4">
                          {formatRupiah(item.pagu)}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
                              item.status,
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="rounded-r-2xl px-4 py-4">
                          {item.tanggal}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}