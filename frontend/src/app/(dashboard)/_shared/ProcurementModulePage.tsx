import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  Building2,
  CalendarDays,
  ClipboardList,
  FileBarChart2,
  FileCheck2,
  FolderOpen,
  Handshake,
  MessageSquareText,
  PackageSearch,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import AppHeader from "./AppHeader";
import EmptyState from "./EmptyState";

type PageConfig = {
  title: string;
  subtitle: string;
  rightLabel: string;
  icon: LucideIcon;
  primaryAction?: {
    label: string;
    href: string;
  };
};

type ProcurementModulePageProps = {
  pageKey: string;
};

const pageConfigs = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Ringkasan monitoring paket, kontrak, progres, realisasi, dan warning.",
    rightLabel: "Monitoring",
    icon: BarChart3,
  },
  "data-barang": {
    title: "Data Barang",
    subtitle: "Kelola referensi barang, stok, lokasi, dan status aktif.",
    rightLabel: "Inventaris",
    icon: Boxes,
    primaryAction: { label: "Tambah barang", href: "/data-barang/tambah" },
  },
  paket: {
    title: "Paket Pengadaan",
    subtitle: "Kelola paket pengadaan dari perencanaan sampai selesai.",
    rightLabel: "Paket",
    icon: ClipboardList,
    primaryAction: { label: "Tambah paket", href: "/paket/tambah" },
  },
  rup: {
    title: "SIRUP / RUP",
    subtitle:
      "Pantau rencana umum pengadaan, status tayang SIRUP, sumber dana, pagu, dan jadwal pemilihan.",
    rightLabel: "Perencanaan",
    icon: ClipboardList,
  },
  katalog: {
    title: "Katalog V6/V5",
    subtitle:
      "Kelola paket e-Katalog, produk, penyedia, harga tayang, harga nego, surat pesanan, BAST, dan pembayaran.",
    rightLabel: "e-Katalog",
    icon: ShoppingCart,
  },
  pengadaan: {
    title: "Tahapan Pengadaan",
    subtitle: "Pantau alur perencanaan, persiapan, pemilihan, dan hasil pemilihan.",
    rightLabel: "Tahapan",
    icon: PackageSearch,
  },
  kontrak: {
    title: "Kontrak",
    subtitle: "Kelola kontrak, nilai, penyedia, masa berlaku, dan adendum.",
    rightLabel: "Kontrak",
    icon: FileCheck2,
    primaryAction: { label: "Tambah kontrak", href: "/kontrak/tambah" },
  },
  progres: {
    title: "Progres Fisik",
    subtitle: "Pantau target, realisasi, deviasi, kendala, dan dokumentasi pekerjaan.",
    rightLabel: "Progres",
    icon: BarChart3,
    primaryAction: { label: "Tambah progres", href: "/progres/tambah" },
  },
  realisasi: {
    title: "Realisasi Keuangan",
    subtitle: "Kelola termin pembayaran dan penyerapan nilai kontrak.",
    rightLabel: "Keuangan",
    icon: Building2,
    primaryAction: { label: "Tambah realisasi", href: "/realisasi/tambah" },
  },
  "serah-terima": {
    title: "Serah Terima",
    subtitle: "Kelola BAST, hasil pemeriksaan, dan dokumen serah terima.",
    rightLabel: "BAST",
    icon: Handshake,
    primaryAction: { label: "Tambah serah terima", href: "/serah-terima/tambah" },
  },
  penyedia: {
    title: "Penyedia",
    subtitle: "Kelola penyedia, legalitas, kontak, dan status aktif.",
    rightLabel: "Vendor",
    icon: Truck,
    primaryAction: { label: "Tambah penyedia", href: "/penyedia/tambah" },
  },
  warning: {
    title: "Warning",
    subtitle: "Pantau risiko otomatis dan tindak lanjut paket bermasalah.",
    rightLabel: "Risiko",
    icon: AlertTriangle,
  },
  audit: {
    title: "Audit Readiness",
    subtitle:
      "Pantau kelengkapan dokumen pengadaan, kesiapan BAST, bukti pembayaran, dan catatan pemeriksaan.",
    rightLabel: "Audit",
    icon: ShieldCheck,
  },
  timeline: {
    title: "Timeline",
    subtitle:
      "Lihat jadwal perencanaan, pemilihan penyedia, kontrak, pengiriman, serah terima, dan pembayaran.",
    rightLabel: "Jadwal",
    icon: CalendarDays,
  },
  klinik: {
    title: "Klinik UKPBJ",
    subtitle:
      "Ruang konsultasi pengadaan untuk metode pemilihan, penyusunan HPS, KAK, kontrak, dan kelengkapan dokumen.",
    rightLabel: "Konsultasi",
    icon: MessageSquareText,
  },
  dokumen: {
    title: "Dokumen & Template",
    subtitle:
      "Kelola template KAK, HPS, rancangan kontrak, SPPBJ, BAST, BAPB, dan dokumen pendukung pengadaan.",
    rightLabel: "Dokumen",
    icon: FolderOpen,
  },
  laporan: {
    title: "Laporan",
    subtitle: "Rekap paket, kontrak, progres, dan realisasi keuangan.",
    rightLabel: "Laporan",
    icon: FileBarChart2,
  },
  master: {
    title: "Master Data",
    subtitle: "Kelola instansi, satuan kerja, tahun anggaran, dan sumber dana.",
    rightLabel: "Referensi",
    icon: Building2,
  },
  admin: {
    title: "Administrasi",
    subtitle: "Kelola pengguna, role, sinkronisasi, dan audit log.",
    rightLabel: "Admin",
    icon: UsersRound,
  },
  pengaturan: {
    title: "Pengaturan",
    subtitle:
      "Atur preferensi sistem, akses modul, pengguna, role, master data, dan sinkronisasi pendukung.",
    rightLabel: "Sistem",
    icon: UsersRound,
  },
  profile: {
    title: "Profile",
    subtitle: "Lihat informasi akun dan hak akses pengguna.",
    rightLabel: "Akun",
    icon: ShieldCheck,
  },
} satisfies Record<string, PageConfig>;

const aliases: Record<string, keyof typeof pageConfigs> = {
  "data-barang-tambah": "data-barang",
  "data-barang-detail": "data-barang",
  "data-barang-edit": "data-barang",
  "paket-tambah": "paket",
  "paket-detail": "paket",
  "paket-edit": "paket",
  "paket-riwayat": "paket",
  "pengadaan-tahap": "pengadaan",
  perencanaan: "pengadaan",
  pemilihan: "pengadaan",
  "kontrak-tambah": "kontrak",
  "kontrak-detail": "kontrak",
  "kontrak-edit": "kontrak",
  "kontrak-adendum": "kontrak",
  "progres-tambah": "progres",
  "progres-detail": "progres",
  "realisasi-tambah": "realisasi",
  "realisasi-detail": "realisasi",
  "serah-terima-tambah": "serah-terima",
  "serah-terima-detail": "serah-terima",
  "penyedia-tambah": "penyedia",
  "penyedia-detail": "penyedia",
  "penyedia-edit": "penyedia",
  "warning-detail": "warning",
  "laporan-paket": "laporan",
  "laporan-kontrak": "laporan",
  "laporan-progres": "laporan",
  "laporan-realisasi": "laporan",
  "master-instansi": "master",
  "master-satuan-kerja": "master",
  "master-sumber-dana": "master",
  "master-tahun-anggaran": "master",
  "admin-users": "admin",
  "admin-users-tambah": "admin",
  "admin-users-detail": "admin",
  "admin-roles": "admin",
  "admin-sinkronisasi": "admin",
  "admin-audit-log": "admin",
};

function resolveConfig(pageKey: string) {
  return (
    pageConfigs[pageKey as keyof typeof pageConfigs] ??
    pageConfigs[aliases[pageKey]] ??
    pageConfigs.dashboard
  ) as PageConfig;
}

export default function ProcurementModulePage({
  pageKey,
}: ProcurementModulePageProps) {
  const config = resolveConfig(pageKey);
  const Icon = config.icon;

  return (
    <>
      <AppHeader
        title={config.title}
        subtitle={config.subtitle}
        rightLabel={config.rightLabel}
      />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#08783f] text-white shadow-sm">
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#08783f]">
                  Dinas Kesehatan Jawa Barat
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">
                  {config.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  {config.subtitle}
                </p>
              </div>
            </div>

            {config.primaryAction ? (
              <Link
                href={config.primaryAction.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#08783f] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#066532]"
              >
                <Plus className="h-5 w-5" strokeWidth={2.3} />
                {config.primaryAction.label}
              </Link>
            ) : null}
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {["Total data", "Nilai total", "Aktif", "Perlu tindak lanjut"].map(
            (label) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
                  {label === "Nilai total" ? "Rp0" : "0"}
                </p>
              </div>
            ),
          )}
        </section>

        <section className="mt-6">
          <EmptyState
            title="Belum ada data"
            description="Database belum berisi data untuk modul ini. Setelah data dibuat melalui endpoint API, tabel, grafik, dan ringkasan akan menampilkan data asli dari database."
          />
        </section>
      </main>
    </>
  );
}
