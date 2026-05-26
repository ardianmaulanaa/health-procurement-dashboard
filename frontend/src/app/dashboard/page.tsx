"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PaketStatus = "Draft" | "Review" | "Proses" | "Selesai";

type PaketPengadaan = {
  id: number;
  namaPaket: string;
  kategori: string;
  pagu: string;
  status: PaketStatus;
  tanggal: string;
};

const initialPaket: PaketPengadaan[] = [
  {
    id: 1,
    namaPaket: "Pengadaan Alat Kesehatan Klinik",
    kategori: "Alat Kesehatan",
    pagu: "250000000",
    status: "Review",
    tanggal: "2026-05-26",
  },
  {
    id: 2,
    namaPaket: "Pengadaan Bahan Medis Habis Pakai",
    kategori: "Barang Medis",
    pagu: "175000000",
    status: "Proses",
    tanggal: "2026-05-25",
  },
  {
    id: 3,
    namaPaket: "Pemeliharaan Sistem Informasi Kesehatan",
    kategori: "Jasa",
    pagu: "90000000",
    status: "Selesai",
    tanggal: "2026-05-22",
  },
];

const emptyForm: Omit<PaketPengadaan, "id"> = {
  namaPaket: "",
  kategori: "",
  pagu: "",
  status: "Draft",
  tanggal: "",
};

export default function DashboardPage() {
  const router = useRouter();

  const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true";

  const [paketList, setPaketList] = useState<PaketPengadaan[]>(initialPaket);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<PaketPengadaan, "id">>(emptyForm);

  const filteredPaket = useMemo(() => {
    return paketList.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.namaPaket.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword)
      );
    });
  }, [paketList, search]);

  const summaryCards = [
    {
      title: "Total Paket",
      value: "Soon",
      desc: "Menunggu integrasi database",
    },
    {
      title: "Menunggu Review",
      value: "Soon",
      desc: "Data review akan muncul dari database",
    },
    {
      title: "Paket Berjalan",
      value: "Soon",
      desc: "Data proses akan terhubung database",
    },
    {
      title: "Paket Selesai",
      value: "Soon",
      desc: "Rekap selesai akan ditampilkan dari database",
    },
  ];

  const formatRupiah = (value: string | number) => {
    const numberValue = Number(value || 0);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(numberValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: PaketPengadaan) => {
    setEditingId(item.id);
    setForm({
      namaPaket: item.namaPaket,
      kategori: item.kategori,
      pagu: item.pagu,
      status: item.status,
      tanggal: item.tanggal,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.namaPaket.trim() ||
      !form.kategori.trim() ||
      !form.pagu.trim() ||
      !form.tanggal.trim()
    ) {
      alert("Semua field wajib diisi");
      return;
    }

    if (editingId) {
      setPaketList((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
              }
            : item,
        ),
      );
    } else {
      const newPaket: PaketPengadaan = {
        id: Date.now(),
        ...form,
      };

      setPaketList((prev) => [newPaket, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus paket ini?");

    if (!confirmDelete) return;

    setPaketList((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatusClass = (status: PaketStatus) => {
    if (status === "Draft") {
      return "bg-slate-100 text-slate-700";
    }

    if (status === "Review") {
      return "bg-amber-50 text-amber-700";
    }

    if (status === "Proses") {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-emerald-50 text-emerald-700";
  };

  if (!isLoggedIn) {
    router.push("/login");

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
            <button className="flex w-full items-center gap-3 rounded-2xl bg-blue-700 px-4 py-3 text-left text-sm font-bold text-white shadow-lg shadow-blue-100 transition">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
                ▦
              </span>
              Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-amber-50 hover:text-amber-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
                  <path d="M3 10h18" />
                </svg>
              </span>
              Paket Pengadaan
            </button>
          </nav>

          <div className="mt-10 rounded-3xl border border-amber-100 bg-amber-50/80 p-5">
            <p className="text-sm font-black text-slate-900">Status Sistem</p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              CRUD paket pengadaan berjalan sementara di frontend. Database,
              API, penyimpanan permanen, autentikasi role, dan data real masih
              Soon.
            </p>

            <div className="mt-4 rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                Database
              </p>
              <p className="mt-1 text-sm font-bold text-slate-700">Soon</p>
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
                  Manajemen Paket Pengadaan
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Fokus utama dashboard saat ini adalah CRUD paket pengadaan.
                  Database, API, dan penyimpanan permanen masih Soon.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-2xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Logout
              </button>
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

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
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
            {/* CRUD Table */}
            <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 6a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
                        <path d="M8 12h8" />
                        <path d="M8 16h5" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                        Data Paket Pengadaan
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        CRUD frontend aktif. Database dan API masih Soon.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={openAddModal}
                  className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  + Tambah Paket
                </button>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Cari nama paket, kategori, atau status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      <th className="px-4 py-2">Nama Paket</th>
                      <th className="px-4 py-2">Kategori</th>
                      <th className="px-4 py-2">Pagu</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Tanggal</th>
                      <th className="px-4 py-2 text-right">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPaket.length === 0 ? (
                      <tr className="bg-slate-50/80 text-sm font-semibold text-slate-500">
                        <td
                          colSpan={6}
                          className="rounded-2xl px-4 py-12 text-center"
                        >
                          <div className="mx-auto flex max-w-md flex-col items-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M4 6a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
                                <path d="M8 12h8" />
                              </svg>
                            </div>

                            <h4 className="mt-4 text-lg font-black text-slate-800">
                              Data Tidak Ditemukan
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              Coba gunakan kata kunci lain atau tambahkan data
                              paket baru.
                            </p>
                          </div>
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
                            <p className="mt-1 text-xs text-slate-400">
                              ID Paket: {item.id}
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

                          <td className="px-4 py-4">{item.tanggal}</td>

                          <td className="rounded-r-2xl px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openEditModal(item)}
                                className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-50"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(item.id)}
                                className="rounded-xl border border-red-100 bg-white px-3 py-2 text-xs font-black text-red-600 transition hover:bg-red-50"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
                    Database Soon
                  </span>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[0%] rounded-full bg-white" />
                </div>

                <p className="mt-4 text-sm leading-6 text-blue-100">
                  Progress otomatis akan aktif setelah database dan API
                  pengadaan selesai dibuat.
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
                <h3 className="text-lg font-black tracking-[-0.03em] text-slate-950">
                  Ringkasan Anggaran
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Total pagu akan dihitung otomatis dari database.
                </p>

                <p className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950">
                  Soon
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black tracking-[-0.03em] text-slate-950">
                      Status Fitur
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Tahapan pengembangan dashboard.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Soon
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    ["CRUD Frontend", "Aktif"],
                    ["Database", "Soon"],
                    ["API Backend", "Soon"],
                    ["Penyimpanan Permanen", "Soon"],
                    ["Role User", "Soon"],
                  ].map(([title, status]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <p className="text-sm font-bold text-slate-700">
                        {title}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          status === "Aktif"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-5 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold text-blue-700">
                  Form Paket Pengadaan
                </p>

                <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">
                  {editingId ? "Edit Paket" : "Tambah Paket Baru"}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Nama Paket
                </label>

                <input
                  type="text"
                  placeholder="Contoh: Pengadaan Alat Kesehatan"
                  value={form.namaPaket}
                  onChange={(e) =>
                    setForm({ ...form, namaPaket: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Kategori
                </label>

                <input
                  type="text"
                  placeholder="Contoh: Alat Kesehatan"
                  value={form.kategori}
                  onChange={(e) =>
                    setForm({ ...form, kategori: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Pagu Anggaran
                </label>

                <input
                  type="number"
                  placeholder="Contoh: 250000000"
                  value={form.pagu}
                  onChange={(e) =>
                    setForm({ ...form, pagu: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as PaketStatus,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Draft">Draft</option>
                  <option value="Review">Review</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Tanggal
                </label>

                <input
                  type="date"
                  value={form.tanggal}
                  onChange={(e) =>
                    setForm({ ...form, tanggal: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mt-2 flex flex-col gap-3 md:col-span-2 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  {editingId ? "Simpan Perubahan" : "Tambah Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}