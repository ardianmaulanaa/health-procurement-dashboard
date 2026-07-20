import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Landmark,
  LineChart,
  PackageCheck,
  PieChart,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import AppHeader from "@/app/(dashboard)/_shared/AppHeader";
import { formatCurrency } from "@/lib/currency";
import { getDashboardData } from "@/lib/dashboard-data";

const toneStyles = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  blue: "border-sky-200 bg-sky-50 text-sky-700",
  yellow: "border-amber-200 bg-amber-50 text-amber-700",
  red: "border-red-200 bg-red-50 text-red-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
};

const priorityToneStyles = {
  amber: "bg-amber-100 text-amber-700",
  green: "bg-emerald-100 text-emerald-700",
  red: "bg-red-100 text-red-700",
};

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    })} M`;
  }

  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    })} jt`;
  }

  return formatCurrency(value);
}

function humanize(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusClass(status: string) {
  const normalized = status.toUpperCase();

  if (normalized.includes("SELESAI")) return "bg-emerald-100 text-emerald-700";
  if (normalized.includes("KONTRAK")) return "bg-sky-100 text-sky-700";
  if (normalized.includes("PEMILIHAN") || normalized.includes("PEMENANG")) {
    return "bg-amber-100 text-amber-700";
  }
  if (normalized.includes("TERLAMBAT") || normalized.includes("GAGAL")) {
    return "bg-red-100 text-red-700";
  }

  return "bg-slate-100 text-slate-600";
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-500">
      {message}
    </div>
  );
}

export default async function Page() {
  const dashboard = await getDashboardData();
  const { summary } = dashboard;

  const selesaiCount =
    dashboard.stages.find((item) => item.label === "Selesai")?.count ?? 0;
  const kontrakCount =
    dashboard.stages.find((item) => item.label === "Kontrak")?.count ?? 0;
  const tahapAktif = Math.max(summary.totalPaket - selesaiCount, 0);

  const summaryCards = [
    {
      label: "Total Paket",
      value: summary.totalPaket.toLocaleString("id-ID"),
      helper: `TA ${summary.tahunAnggaran}`,
      icon: ClipboardList,
      tone: "green",
    },
    {
      label: "Total Pagu",
      value: formatCompactCurrency(summary.totalPagu),
      helper: "Batas anggaran paket",
      icon: Landmark,
      tone: "blue",
    },
    {
      label: "Total HPS",
      value: formatCompactCurrency(summary.totalHps),
      helper: "Harga perkiraan sendiri",
      icon: LineChart,
      tone: "yellow",
    },
    {
      label: "Nilai Kontrak",
      value: formatCompactCurrency(summary.totalNilaiKontrak),
      helper: `${summary.realisasiKontrakPercent.toLocaleString("id-ID")}% dari pagu`,
      icon: FileCheck2,
      tone: "violet",
    },
    {
      label: "Data Barang",
      value: summary.totalBarang.toLocaleString("id-ID"),
      helper: `${summary.totalPdn.toLocaleString("id-ID")} item PDN`,
      icon: Boxes,
      tone: "slate",
    },
    {
      label: "Deadline <7 Hari",
      value: summary.deadlineDekat.toLocaleString("id-ID"),
      helper: "Perlu dipantau UKPBJ",
      icon: CalendarClock,
      tone: "red",
    },
  ];

  const quickStats = [
    {
      label: "Paket selesai",
      value: selesaiCount,
      description: "Sudah mencapai tahap selesai.",
      icon: CheckCircle2,
      tone: "green",
    },
    {
      label: "Kontrak berjalan",
      value: kontrakCount,
      description: "Sedang pelaksanaan atau pengiriman.",
      icon: PackageCheck,
      tone: "blue",
    },
    {
      label: "Paket aktif",
      value: tahapAktif,
      description: "Masih dalam alur perencanaan sampai kontrak.",
      icon: ShoppingCart,
      tone: "yellow",
    },
    {
      label: "Bermasalah",
      value: summary.paketTerlambat,
      description: "Status terlambat atau butuh eskalasi.",
      icon: AlertTriangle,
      tone: "red",
    },
  ];

  return (
    <>
      <AppHeader
        title="Dashboard"
        subtitle="Ringkasan monitoring pengadaan barang kesehatan Dinas Kesehatan."
        rightLabel="Monitoring"
      />

      <main className="bg-[#f4f7f5] px-4 py-6 sm:px-6 lg:px-8">

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="relative overflow-hidden rounded-lg border border-white/20 bg-white p-4 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[#f5bd20]" />
                <div className="grid grid-cols-[minmax(0,1fr)_42px] items-start gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase text-slate-500">
                      {card.label}
                    </p>
                    <p className="mt-3 truncate text-2xl font-black text-slate-950">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${toneStyles[card.tone as keyof typeof toneStyles]}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.3} />
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  {card.helper}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneStyles[item.tone as keyof typeof toneStyles]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900">
                      {item.value.toLocaleString("id-ID")} {item.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase text-[#08783f]">
                  Tahapan Pengadaan
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Posisi paket tahun berjalan
                </h2>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                {`${summary.realisasiKontrakPercent.toLocaleString("id-ID")}% sudah berkontrak`}
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {dashboard.stages.length > 0 ? (
                dashboard.stages.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-bold text-slate-700">
                        {item.label}
                      </span>
                      <span className="font-black text-slate-950">
                        {item.count.toLocaleString("id-ID")} paket
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="Belum ada data tahapan paket di database." />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase text-[#08783f]">
                  Notifikasi & Risiko
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Perlu perhatian
                </h2>
              </div>
              <AlertTriangle className="h-6 w-6 shrink-0 text-red-600" />
            </div>

            <div className="mt-5 space-y-3">
              {dashboard.priorities.length > 0 ? (
                dashboard.priorities.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          {item.unit}
                        </p>
                      </div>
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-black ${priorityToneStyles[item.tone as keyof typeof priorityToneStyles]}`}
                      >
                        {humanize(item.status)}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-600">
                      {item.due}
                    </p>
                  </article>
                ))
              ) : (
                <EmptyState message="Belum ada paket terlambat atau bermasalah dari database." />
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase text-[#08783f]">
                  Sumber Dana
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Distribusi APBD, BLUD, dan lainnya
                </h2>
              </div>
              <PieChart className="h-6 w-6 text-[#08783f]" />
            </div>

            <div className="mt-5 space-y-4">
              {dashboard.sourceFunds.length > 0 ? (
                dashboard.sourceFunds.map((item) => (
                  <div key={item.label} className="rounded-lg bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black text-slate-900">
                          {humanize(item.label)}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {item.count.toLocaleString("id-ID")} paket
                        </p>
                      </div>
                      <p className="text-sm font-black text-slate-900">
                        {formatCompactCurrency(item.amount)}
                      </p>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[#08783f]"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="Belum ada data sumber dana dari paket pengadaan." />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase text-[#08783f]">
                  Metode Pengadaan
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Katalog, tender, dan pengadaan langsung
                </h2>
              </div>
              <ShoppingCart className="h-6 w-6 text-[#08783f]" />
            </div>

            <div className="mt-5 space-y-4">
              {dashboard.methods.length > 0 ? (
                dashboard.methods.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-bold text-slate-700">
                        {humanize(item.label)}
                      </span>
                      <span className="font-black text-slate-950">
                        {item.count.toLocaleString("id-ID")} paket
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-500"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {formatCompactCurrency(item.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState message="Belum ada data metode pengadaan dari paket." />
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-black uppercase text-[#08783f]">
              Kategori Barang
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950">
              Distribusi barang kesehatan
            </h2>

            <div className="mt-5 space-y-4">
              {dashboard.categories.length > 0 ? (
                dashboard.categories.map((item) => (
                  <div key={item.label} className="grid gap-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-bold text-slate-700">
                        {humanize(item.label)}
                      </span>
                      <span className="font-black text-slate-950">
                        {item.value.toLocaleString("id-ID")} item
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#08783f]"
                        style={{
                          width: `${Math.min(item.value * 8, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">
                      {formatCompactCurrency(item.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState message="Belum ada kategori barang dari database." />
              )}
            </div>
          </div>

          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase text-[#08783f]">
                  Paket Terkini
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Monitoring paket pengadaan barang
                </h2>
              </div>
              <Link
                href="/paket"
                className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-lg bg-[#08783f] px-4 text-sm font-black text-white transition hover:bg-[#066532]"
              >
                Lihat semua
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Kode</th>
                    <th className="px-5 py-3">Nama Paket</th>
                    <th className="px-5 py-3">Unit</th>
                    <th className="px-5 py-3">Metode</th>
                    <th className="px-5 py-3">Pagu</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboard.recentPackages.length > 0 ? (
                    dashboard.recentPackages.map((item) => (
                      <tr key={item.code} className="hover:bg-slate-50">
                        <td className="px-5 py-4 font-black text-slate-800">
                          {item.code}
                        </td>
                        <td className="px-5 py-4 font-bold text-slate-900">
                          {item.name}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {item.unit}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {humanize(item.method)}
                        </td>
                        <td className="px-5 py-4 font-bold text-slate-800">
                          {formatCompactCurrency(item.budget)}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(item.status)}`}
                          >
                            {humanize(item.status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-8 text-center text-sm font-semibold text-slate-500"
                      >
                        Belum ada paket pengadaan dari database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
