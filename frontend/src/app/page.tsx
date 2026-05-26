"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const navItems = [
    "Beranda",
    "Profil",
    "Regulasi",
    "Layanan",
    "Tentang",
    "Kontak",
  ];

  const layanan = [
    {
      title: "Permohonan Akun",
      desc: "Pengajuan akses pengguna untuk masuk ke sistem layanan pengadaan.",
      status: "Soon",
    },
    {
      title: "Pengajuan Paket",
      desc: "Fitur pengajuan paket pengadaan barang/jasa secara digital.",
      status: "Soon",
    },
    {
      title: "Monitoring Proses",
      desc: "Pemantauan status proses pengadaan dari awal sampai selesai.",
      status: "Soon",
    },
  ];

  const alur = [
    {
      number: "01",
      title: "Pembuatan Akun",
      desc: "Pengguna mengajukan permohonan akun kepada admin sistem.",
    },
    {
      number: "02",
      title: "Login Aplikasi",
      desc: "Pengguna masuk ke sistem setelah akun diverifikasi.",
    },
    {
      number: "03",
      title: "Pengajuan Paket",
      desc: "Pengguna mengisi data pengajuan paket secara terstruktur.",
    },
    {
      number: "04",
      title: "Proses Review",
      desc: "Tim melakukan pemeriksaan dan validasi dokumen pengadaan.",
    },
    {
      number: "05",
      title: "Pemberitahuan",
      desc: "Status pengajuan akan diinformasikan melalui sistem.",
    },
    {
      number: "06",
      title: "Selesai",
      desc: "Proses selesai setelah dokumen final dan berita acara tersedia.",
    },
  ];

  const faq = [
    {
      q: "Apa itu layanan pengadaan barang/jasa?",
      a: "Layanan pengadaan barang/jasa adalah proses administrasi dan pendampingan untuk memastikan kebutuhan pengadaan berjalan tertib, transparan, dan sesuai prosedur.",
    },
    {
      q: "Siapa saja yang dapat menggunakan sistem ini?",
      a: "Sistem ini dapat digunakan oleh pihak internal yang memiliki akun resmi dan kewenangan sesuai perannya masing-masing.",
    },
    {
      q: "Apakah data sudah terhubung ke database?",
      a: "Belum. Bagian data pada landing page ini masih disiapkan sebagai tampilan awal dan dapat dihubungkan ke database nanti.",
    },
    {
      q: "Apa fungsi dashboard admin?",
      a: "Dashboard admin digunakan untuk mengelola data, memantau proses, melihat ringkasan layanan, dan membantu pengawasan pengadaan.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Top Bar */}
      <div className="hidden border-b border-slate-200 bg-white text-sm text-slate-600 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <p>Portal Layanan Pengadaan Barang/Jasa Kesehatan</p>

          <div className="flex items-center gap-6">
            <span>Email: layanan@dinkes.go.id</span>
            <span>Senin - Jumat, 08.00 - 16.00</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B57D0] text-lg font-black text-white shadow-lg shadow-blue-200">
              DK
            </div>

            <div className="text-left">
              <h1 className="text-base font-black leading-tight text-slate-950">
                Dinkes Jabar
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Procurement Service Center
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-slate-600 transition hover:text-blue-700"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => router.push("/login")}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              Masuk
            </button>

            <a
              href="#layanan"
              className="rounded-full bg-[#0B57D0] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Lihat Layanan
            </a>
          </div>

          <button
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 lg:hidden"
          >
            Menu
          </button>
        </div>

        {openMobileMenu && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpenMobileMenu(false)}
                  className="text-sm font-bold text-slate-600"
                >
                  {item}
                </a>
              ))}

              <button
                onClick={() => router.push("/login")}
                className="mt-2 rounded-2xl bg-[#0B57D0] px-5 py-3 text-sm font-bold text-white"
              >
                Masuk Sistem
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_45%,#dbeafe_100%)]"
      >
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600"></span>
            </span>
              Portal Resmi Layanan Pengadaan
            </div>

            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-7xl">
              Layanan pengadaan barang/jasa yang lebih cepat, rapi, dan modern.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Sistem informasi untuk membantu proses administrasi, pengajuan,
              monitoring, dan dokumentasi pengadaan barang/jasa kesehatan secara
              lebih terpusat.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/login")}
                className="rounded-2xl bg-[#0B57D0] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Masuk ke Sistem
              </button>

              <a
                href="#alur"
                className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-center text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                Lihat Alur Layanan
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_30px_100px_rgba(37,99,235,0.18)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#0B1F4D] p-6 text-white">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-100">Ringkasan Layanan</p>
                    <h3 className="mt-1 text-2xl font-black">
                      Tahun Anggaran 2026
                    </h3>
                  </div>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
                    Soon
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["Usulan", "Soon"],
                    ["Proses", "Soon"],
                    ["Selesai", "Soon"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                    >
                      <p className="text-3xl font-black">{value}</p>
                      <p className="mt-2 text-sm text-blue-100">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl bg-white p-5 text-slate-900">
                  <p className="text-sm font-black text-slate-950">
                    Status Integrasi
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Data statistik dan status pengajuan masih berupa tampilan
                    awal. Nanti bisa dihubungkan ke database dashboard.
                  </p>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/5 rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:block">
              <p className="text-sm font-bold text-slate-500">
                Pelayanan Terpusat
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                1 Portal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section id="layanan" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-700">
              Layanan
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
              Akses layanan utama
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-500">
            Menu layanan disiapkan untuk kebutuhan pengajuan, monitoring, dan
            administrasi pengadaan barang/jasa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {layanan.map((item) => (
            <div
              key={item.title}
              className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                →
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black text-slate-950">
                  {item.title}
                </h3>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                  {item.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tugas Fungsi */}
      <section id="profil" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-700">
              Profil
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
              Tugas dan Fungsi
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Bagian ini mengikuti gaya website pemerintahan yang menampilkan
              informasi tugas, fungsi, dan ruang lingkup layanan secara jelas.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-7">
              <h3 className="text-xl font-black text-slate-950">Tugas</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Menyelenggarakan dukungan layanan pengadaan barang/jasa secara
                tertib, transparan, akuntabel, dan terdokumentasi.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-7">
              <h3 className="text-xl font-black text-slate-950">Fungsi</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>• Pengelolaan layanan pengadaan barang/jasa.</li>
                <li>• Pendampingan dan konsultasi proses pengadaan.</li>
                <li>• Pengelolaan dokumen dan administrasi layanan.</li>
                <li>• Monitoring status pengajuan dan tindak lanjut.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alur */}
      <section id="alur" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-700">
            Alur Proses
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            Alur pengajuan paket
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            Alur dibuat sederhana agar pengguna mudah memahami tahapan layanan.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {alur.map((item) => (
            <div
              key={item.number}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <p className="text-sm font-black text-blue-700">{item.number}</p>
              <h3 className="mt-4 text-xl font-black text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="tentang" className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-700">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
              Pertanyaan yang sering diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="font-black text-slate-950">{item.q}</span>
                  <span className="text-xl font-black text-blue-700">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="border-t border-slate-200 px-6 py-5">
                    <p className="text-sm leading-7 text-slate-600">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Link Terkait */}
      <section id="regulasi" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#0B1F4D] p-8 text-white md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-200">
                Link Terkait
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Akses cepat ke layanan pendukung
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Website Pemerintah Daerah",
                "LKPP",
                "LPSE",
                "SIRUP",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 text-left font-bold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <footer id="kontak" className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B57D0] text-lg font-black text-white">
                DK
              </div>

              <div>
                <h3 className="font-black text-slate-950">Dinkes Jabar</h3>
                <p className="text-sm text-slate-500">
                  Procurement Service Center
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              Portal layanan pengadaan barang/jasa kesehatan untuk mendukung
              proses administrasi yang lebih modern dan terpusat.
            </p>
          </div>

          <div>
            <h4 className="font-black text-slate-950">Navigasi</h4>
            <div className="mt-4 space-y-3 text-sm font-medium text-slate-500">
              <p>Beranda</p>
              <p>Profil</p>
              <p>Layanan</p>
              <p>Kontak</p>
            </div>
          </div>

          <div>
            <h4 className="font-black text-slate-950">Kontak</h4>
            <div className="mt-4 space-y-3 text-sm font-medium text-slate-500">
              <p>Email: layanan@dinkes.go.id</p>
              <p>Telepon: (022) 000000</p>
              <p>Alamat: Jawa Barat, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-5 text-center text-xs font-medium text-slate-400">
          © 2026 Dashboard Pengadaan Barang/Jasa Kesehatan. All rights reserved.
        </div>
      </footer>
    </main>
  );
}