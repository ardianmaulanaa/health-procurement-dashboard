import Link from "next/link";
import {
  ClipboardList,
  Download,
  FileSpreadsheet,
  Plus,
  Search,
} from "lucide-react";
import AppHeader from "@/app/(dashboard)/_shared/AppHeader";
import { formatCurrency } from "@/lib/currency";
import { prisma } from "@/lib/prisma";

type RupPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const statusStyles = {
  BELUM_INPUT: "bg-slate-100 text-slate-600",
  PROSES_VERIFIKASI: "bg-amber-100 text-amber-700",
  SUDAH_TAYANG: "bg-emerald-100 text-emerald-700",
  REVISI_PAGU: "bg-orange-100 text-orange-700",
  DITARIK: "bg-red-100 text-red-700",
};

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function labelize(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function methodLabel(value: string) {
  const labels: Record<string, string> = {
    TENDER: "Tender",
    NON_TENDER: "Non Tender",
    E_PURCHASING: "e-Katalog",
    PENGADAAN_LANGSUNG: "Pengadaan Langsung",
    SWAKELOLA: "Swakelola",
  };

  return labels[value] ?? labelize(value);
}

function sourceFundClass(value: string) {
  const normalized = value.toUpperCase();

  if (normalized.includes("BLUD")) return "bg-sky-100 text-sky-700";
  if (normalized.includes("APBD")) return "bg-amber-100 text-amber-700";
  if (normalized.includes("DBHCHT")) return "bg-red-100 text-red-700";

  return "bg-emerald-100 text-emerald-700";
}

export default async function Page({ searchParams }: RupPageProps) {
  const params = (await searchParams) ?? {};
  const q = getParam(params, "q")?.trim();
  const tahunAnggaran = getParam(params, "tahunAnggaran");
  const sumberDana = getParam(params, "sumberDana");
  const unitPengusul = getParam(params, "unitPengusul");
  const statusSirup = getParam(params, "statusSirup");

  const where = {
    ...(q
      ? {
          OR: [
            { kodeRup: { contains: q } },
            { namaPaket: { contains: q } },
            { unitPengusul: { contains: q } },
          ],
        }
      : {}),
    ...(tahunAnggaran ? { tahunAnggaran: Number(tahunAnggaran) } : {}),
    ...(sumberDana ? { sumberDana } : {}),
    ...(unitPengusul ? { unitPengusul } : {}),
    ...(statusSirup
      ? {
          statusSirup: statusSirup as
            | "BELUM_INPUT"
            | "PROSES_VERIFIKASI"
            | "SUDAH_TAYANG"
            | "REVISI_PAGU"
            | "DITARIK",
        }
      : {}),
  };

  const [rupData, years, sourceFunds, units] = await Promise.all([
    prisma.rencanaUmumPengadaan.findMany({
      where,
      orderBy: [{ tahunAnggaran: "desc" }, { createdAt: "desc" }],
      take: 100,
    }),
    prisma.rencanaUmumPengadaan.findMany({
      distinct: ["tahunAnggaran"],
      orderBy: { tahunAnggaran: "desc" },
      select: { tahunAnggaran: true },
    }),
    prisma.rencanaUmumPengadaan.findMany({
      distinct: ["sumberDana"],
      orderBy: { sumberDana: "asc" },
      select: { sumberDana: true },
    }),
    prisma.rencanaUmumPengadaan.findMany({
      distinct: ["unitPengusul"],
      orderBy: { unitPengusul: "asc" },
      select: { unitPengusul: true },
    }),
  ]);

  return (
    <>
      <AppHeader
        title="SIRUP / RUP"
        subtitle="UKPBJ › Data RUP"
        rightLabel="Perencanaan"
      />

      <main className="bg-[#f4f7f5]">
        <form className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              <span className="text-sm font-black text-slate-400">Filter:</span>

              <select
                name="tahunAnggaran"
                defaultValue={tahunAnggaran ?? ""}
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-[#08783f] focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Semua Tahun</option>
                {years.map((year) => (
                  <option key={year.tahunAnggaran} value={year.tahunAnggaran}>
                    TA {year.tahunAnggaran}
                  </option>
                ))}
              </select>

              <select
                name="sumberDana"
                defaultValue={sumberDana ?? ""}
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-[#08783f] focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Semua Sumber Dana</option>
                {sourceFunds.map((item) => (
                  <option key={item.sumberDana} value={item.sumberDana}>
                    {item.sumberDana}
                  </option>
                ))}
              </select>

              <select
                name="unitPengusul"
                defaultValue={unitPengusul ?? ""}
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-[#08783f] focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Semua Unit</option>
                {units.map((item) => (
                  <option key={item.unitPengusul} value={item.unitPengusul}>
                    {item.unitPengusul}
                  </option>
                ))}
              </select>

              <select
                name="statusSirup"
                defaultValue={statusSirup ?? ""}
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-[#08783f] focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Semua Status</option>
                <option value="SUDAH_TAYANG">Sudah Tayang</option>
                <option value="PROSES_VERIFIKASI">Proses Verifikasi</option>
                <option value="BELUM_INPUT">Belum Input</option>
                <option value="REVISI_PAGU">Revisi Pagu</option>
                <option value="DITARIK">Ditarik</option>
              </select>

              <label className="flex h-10 min-w-[220px] items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 focus-within:border-[#08783f] focus-within:ring-2 focus-within:ring-emerald-100">
                <Search className="h-4 w-4" />
                <input
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Cari paket RUP..."
                  className="min-w-0 flex-1 bg-transparent font-semibold outline-none"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#08783f] px-4 text-sm font-black text-white transition hover:bg-[#066532]"
              >
                Terapkan
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white px-4 text-sm font-black text-sky-700 transition hover:bg-sky-50"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white px-4 text-sm font-black text-sky-700 transition hover:bg-sky-50"
              >
                <Download className="h-4 w-4" />
                PDF
              </button>
            </div>
          </div>
        </form>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <ClipboardList className="h-5 w-5 shrink-0 text-[#08783f]" />
                <h1 className="truncate text-lg font-black text-[#16227c]">
                  Data SIRUP / Rencana Umum Pengadaan (RUP)
                </h1>
              </div>

              <Link
                href="/rup/tambah"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#08783f] px-4 text-sm font-black text-white transition hover:bg-[#066532]"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Tambah RUP
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1080px] w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-black uppercase text-slate-400">
                    <th className="px-4 py-3">Kode RUP</th>
                    <th className="px-4 py-3">Nama Paket</th>
                    <th className="px-4 py-3">Unit Pengusul</th>
                    <th className="px-4 py-3">Sumber Dana</th>
                    <th className="px-4 py-3">Pagu (Rp)</th>
                    <th className="px-4 py-3">Metode</th>
                    <th className="px-4 py-3">Jadwal Pemilihan</th>
                    <th className="px-4 py-3">Status SIRUP</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rupData.length > 0 ? (
                    rupData.map((item) => (
                      <tr key={item.id} className="transition hover:bg-slate-50">
                        <td className="whitespace-nowrap px-4 py-4 font-mono text-xs font-bold text-slate-500">
                          {item.kodeRup}
                        </td>
                        <td className="max-w-[280px] px-4 py-4 font-black text-[#16227c]">
                          {item.namaPaket}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-600">
                          {item.unitPengusul}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${sourceFundClass(item.sumberDana)}`}
                          >
                            {item.sumberDana}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-600">
                          {formatCurrency(item.pagu.toString())}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-600">
                          {methodLabel(item.metodePengadaan)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-600">
                          {item.jadwalPemilihan || "-"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusStyles[item.statusSirup]}`}
                          >
                            {labelize(item.statusSirup)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <Link
                            href={`/rup/${item.id}`}
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-sky-200 bg-white px-4 text-sm font-black text-sky-700 transition hover:bg-sky-50"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center">
                        <p className="text-base font-black text-slate-700">
                          Belum ada data RUP
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                          Data akan tampil setelah RUP/SIRUP diinput atau
                          disinkronkan ke database.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
