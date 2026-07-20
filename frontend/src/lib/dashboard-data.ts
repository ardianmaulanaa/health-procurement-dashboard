import { prisma } from "@/lib/prisma";

export type DashboardStage = {
  label: string;
  count: number;
  percent: number;
  color: string;
};

export type DashboardCategory = {
  label: string;
  value: number;
  amount: number;
};

export type DashboardBreakdown = {
  label: string;
  count: number;
  amount: number;
  percent: number;
};

export type DashboardPriority = {
  title: string;
  unit: string;
  status: string;
  due: string;
  tone: "amber" | "green" | "red";
};

export type DashboardRecentPackage = {
  code: string;
  name: string;
  unit: string;
  method: string;
  budget: number;
  status: string;
};

export type DashboardData = {
  summary: {
    totalPaket: number;
    totalPaketBarangKesehatan: number;
    totalPagu: number;
    totalHps: number;
    totalNilaiKontrak: number;
    totalBarang: number;
    totalPdn: number;
    paketTerlambat: number;
    deadlineDekat: number;
    realisasiKontrakPercent: number;
    tahunAnggaran: number;
  };
  stages: DashboardStage[];
  categories: DashboardCategory[];
  sourceFunds: DashboardBreakdown[];
  methods: DashboardBreakdown[];
  priorities: DashboardPriority[];
  recentPackages: DashboardRecentPackage[];
};

const packageTables = ["paket_pengadaan", "paket", "packages"] as const;
const goodsTables = ["data_barang", "barang_kesehatan", "barang"] as const;
const contractTables = ["kontrak", "contracts"] as const;

const codeColumns = ["kode_paket", "kode", "code"] as const;
const nameColumns = ["nama_paket", "nama", "name", "title"] as const;
const unitColumns = [
  "satuan_kerja",
  "unit",
  "opd",
  "instansi",
  "satker",
] as const;
const methodColumns = [
  "metode_pemilihan",
  "metode",
  "method",
  "jenis_pengadaan",
] as const;
const statusColumns = ["status_paket", "status", "tahap"] as const;
const categoryColumns = ["kategori", "kategori_barang", "jenis_barang"] as const;
const budgetColumns = ["pagu", "nilai_pagu", "hps", "nilai_hps", "budget"] as const;
const contractValueColumns = [
  "nilai_kontrak",
  "total_nilai_kontrak",
  "contract_value",
  "amount",
] as const;
const hpsColumns = ["hps", "nilai_hps"] as const;
const amountColumns = [
  "total_harga",
  "estimasi_total",
  "nilai_total",
  "total",
  "subtotal",
  "pagu",
] as const;
const createdColumns = [
  "created_at",
  "updated_at",
  "tanggal_dibuat",
  "tanggal_paket",
] as const;
const delayedWords = ["terlambat", "lewat", "overdue", "delay", "delayed"];

type CountRow = { count: bigint | number | string | null };
type SumRow = { total: bigint | number | string | null };
type ValueRow = { value: unknown };
type CategoryRow = {
  label: string | null;
  value: bigint | number | string | null;
  amount: bigint | number | string | null;
};
type BreakdownRow = {
  label: string | null;
  count: bigint | number | string | null;
  amount: bigint | number | string | null;
};
type RecentPackageRow = {
  code: string | null;
  name: string | null;
  unit: string | null;
  method: string | null;
  budget: bigint | number | string | null;
  status: string | null;
};

function quoteIdentifier(identifier: string) {
  return `\`${identifier.replaceAll("`", "``")}\``;
}

function toNumber(value: unknown) {
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function buildLikeWhere(column: string, words: readonly string[]) {
  const quotedColumn = quoteIdentifier(column);
  const conditions = words.map(() => `LOWER(${quotedColumn}) LIKE ?`);

  return {
    sql: conditions.join(" OR "),
    params: words.map((word) => `%${word.toLowerCase()}%`),
  };
}

async function tableExists(tableName: string) {
  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    "SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
    tableName,
  );

  return toNumber(rows[0]?.count) > 0;
}

async function columnExists(tableName: string, columnName: string) {
  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    "SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?",
    tableName,
    columnName,
  );

  return toNumber(rows[0]?.count) > 0;
}

async function findTable(candidates: readonly string[]) {
  for (const table of candidates) {
    if (await tableExists(table)) return table;
  }

  return null;
}

async function findColumn(tableName: string | null, candidates: readonly string[]) {
  if (!tableName) return null;

  for (const column of candidates) {
    if (await columnExists(tableName, column)) return column;
  }

  return null;
}

async function countRows(tableName: string | null) {
  if (!tableName) return 0;

  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    `SELECT COUNT(*) AS count FROM ${quoteIdentifier(tableName)}`,
  );

  return toNumber(rows[0]?.count);
}

async function countMatching(
  tableName: string | null,
  columnName: string | null,
  words: readonly string[],
) {
  if (!tableName || !columnName) return 0;

  const where = buildLikeWhere(columnName, words);
  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    `SELECT COUNT(*) AS count FROM ${quoteIdentifier(tableName)} WHERE ${where.sql}`,
    ...where.params,
  );

  return toNumber(rows[0]?.count);
}

async function sumColumn(tableName: string | null, columnName: string | null) {
  if (!tableName || !columnName) return 0;

  const rows = await prisma.$queryRawUnsafe<SumRow[]>(
    `SELECT COALESCE(SUM(${quoteIdentifier(columnName)}), 0) AS total FROM ${quoteIdentifier(tableName)}`,
  );

  return toNumber(rows[0]?.total);
}

async function countBooleanTrue(
  tableName: string | null,
  columnName: string | null,
) {
  if (!tableName || !columnName) return 0;

  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    `SELECT COUNT(*) AS count FROM ${quoteIdentifier(tableName)} WHERE ${quoteIdentifier(columnName)} = true`,
  );

  return toNumber(rows[0]?.count);
}

async function countNearDeadline(tableName: string | null) {
  if (!tableName) return 0;

  const dueColumn = await findColumn(tableName, [
    "rencana_selesai",
    "tanggal_selesai",
    "due_date",
  ]);
  const statusColumn = await findColumn(tableName, statusColumns);

  if (!dueColumn) return 0;

  const statusFilter = statusColumn
    ? ` AND UPPER(${quoteIdentifier(statusColumn)}) NOT IN ('SELESAI', 'GAGAL', 'BATAL')`
    : "";

  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    `SELECT COUNT(*) AS count
     FROM ${quoteIdentifier(tableName)}
     WHERE ${quoteIdentifier(dueColumn)} BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
     ${statusFilter}`,
  );

  return toNumber(rows[0]?.count);
}

async function latestYear(tableName: string | null) {
  const yearColumn = await findColumn(tableName, [
    "tahun_anggaran",
    "tahun",
    "year",
  ]);

  if (!tableName || !yearColumn) return new Date().getFullYear();

  const rows = await prisma.$queryRawUnsafe<ValueRow[]>(
    `SELECT MAX(${quoteIdentifier(yearColumn)}) AS value FROM ${quoteIdentifier(tableName)}`,
  );

  return toNumber(rows[0]?.value) || new Date().getFullYear();
}

async function getStages(tableName: string | null, totalPaket: number) {
  const statusColumn = await findColumn(tableName, statusColumns);

  if (!tableName || !statusColumn || totalPaket === 0) return [];

  const stageConfig = [
    {
      label: "Perencanaan",
      color: "bg-sky-500",
      words: ["perencanaan", "rencana", "draft"],
    },
    {
      label: "Pemilihan",
      color: "bg-amber-500",
      words: ["pemilihan", "tender", "evaluasi", "pengumuman"],
    },
    {
      label: "Kontrak",
      color: "bg-emerald-600",
      words: ["kontrak", "berjalan"],
    },
    {
      label: "Selesai",
      color: "bg-slate-700",
      words: ["selesai", "serah terima", "dibayar", "complete"],
    },
  ];

  const stages = await Promise.all(
    stageConfig.map(async (stage) => {
      const count = await countMatching(tableName, statusColumn, stage.words);

      return {
        label: stage.label,
        count,
        percent: Math.round((count / totalPaket) * 100),
        color: stage.color,
      };
    }),
  );

  return stages.filter((stage) => stage.count > 0);
}

async function getCategories(packageTable: string | null, goodsTable: string | null) {
  const tableName = goodsTable ?? packageTable;
  const categoryColumn = await findColumn(tableName, categoryColumns);
  const amountColumn = await findColumn(tableName, amountColumns);

  if (!tableName || !categoryColumn) return [];

  const amountSql = amountColumn
    ? `COALESCE(SUM(${quoteIdentifier(amountColumn)}), 0)`
    : "0";

  const rows = await prisma.$queryRawUnsafe<CategoryRow[]>(
    `SELECT ${quoteIdentifier(categoryColumn)} AS label, COUNT(*) AS value, ${amountSql} AS amount
     FROM ${quoteIdentifier(tableName)}
     WHERE ${quoteIdentifier(categoryColumn)} IS NOT NULL AND ${quoteIdentifier(categoryColumn)} <> ''
     GROUP BY ${quoteIdentifier(categoryColumn)}
     ORDER BY value DESC
     LIMIT 5`,
  );

  return rows.map((row) => ({
    label: row.label ?? "-",
    value: toNumber(row.value),
    amount: toNumber(row.amount),
  }));
}

async function getBreakdown(
  tableName: string | null,
  labelColumnName: string | null,
  amountColumnName: string | null,
  totalCount: number,
) {
  if (!tableName || !labelColumnName) return [];

  const amountSql = amountColumnName
    ? `COALESCE(SUM(${quoteIdentifier(amountColumnName)}), 0)`
    : "0";

  const rows = await prisma.$queryRawUnsafe<BreakdownRow[]>(
    `SELECT ${quoteIdentifier(labelColumnName)} AS label, COUNT(*) AS count, ${amountSql} AS amount
     FROM ${quoteIdentifier(tableName)}
     WHERE ${quoteIdentifier(labelColumnName)} IS NOT NULL AND ${quoteIdentifier(labelColumnName)} <> ''
     GROUP BY ${quoteIdentifier(labelColumnName)}
     ORDER BY count DESC`,
  );

  return rows.map((row) => {
    const count = toNumber(row.count);

    return {
      label: row.label ?? "-",
      count,
      amount: toNumber(row.amount),
      percent: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
    };
  });
}

async function getRecentPackages(tableName: string | null) {
  if (!tableName) return [];

  const codeColumn = await findColumn(tableName, codeColumns);
  const nameColumn = await findColumn(tableName, nameColumns);
  const unitColumn = await findColumn(tableName, unitColumns);
  const methodColumn = await findColumn(tableName, methodColumns);
  const budgetColumn = await findColumn(tableName, budgetColumns);
  const statusColumn = await findColumn(tableName, statusColumns);
  const createdColumn = await findColumn(tableName, createdColumns);

  if (!nameColumn) return [];

  const orderSql = createdColumn
    ? `ORDER BY ${quoteIdentifier(createdColumn)} DESC`
    : "";

  const rows = await prisma.$queryRawUnsafe<RecentPackageRow[]>(
    `SELECT
       ${codeColumn ? quoteIdentifier(codeColumn) : "NULL"} AS code,
       ${quoteIdentifier(nameColumn)} AS name,
       ${unitColumn ? quoteIdentifier(unitColumn) : "NULL"} AS unit,
       ${methodColumn ? quoteIdentifier(methodColumn) : "NULL"} AS method,
       ${budgetColumn ? quoteIdentifier(budgetColumn) : "0"} AS budget,
       ${statusColumn ? quoteIdentifier(statusColumn) : "NULL"} AS status
     FROM ${quoteIdentifier(tableName)}
     ${orderSql}
     LIMIT 5`,
  );

  return rows.map((row, index) => ({
    code: row.code ?? `PKT-${index + 1}`,
    name: row.name ?? "-",
    unit: row.unit ?? "-",
    method: row.method ?? "-",
    budget: toNumber(row.budget),
    status: row.status ?? "-",
  }));
}

async function getPriorities(tableName: string | null) {
  if (!tableName) return [];

  const nameColumn = await findColumn(tableName, nameColumns);
  const unitColumn = await findColumn(tableName, unitColumns);
  const statusColumn = await findColumn(tableName, statusColumns);

  if (!nameColumn || !statusColumn) return [];

  const where = buildLikeWhere(statusColumn, delayedWords);
  const rows = await prisma.$queryRawUnsafe<RecentPackageRow[]>(
    `SELECT
       NULL AS code,
       ${quoteIdentifier(nameColumn)} AS name,
       ${unitColumn ? quoteIdentifier(unitColumn) : "NULL"} AS unit,
       NULL AS method,
       0 AS budget,
       ${quoteIdentifier(statusColumn)} AS status
     FROM ${quoteIdentifier(tableName)}
     WHERE ${where.sql}
     LIMIT 3`,
    ...where.params,
  );

  return rows.map((row) => ({
    title: row.name ?? "-",
    unit: row.unit ?? "-",
    status: row.status ?? "Perlu dipantau",
    due: "Perlu tindak lanjut",
    tone: "red" as const,
  }));
}

export async function getDashboardData(): Promise<DashboardData> {
  const [packageTable, goodsTable, contractTable] = await Promise.all([
    findTable(packageTables),
    findTable(goodsTables),
    findTable(contractTables),
  ]);

  const [
    budgetColumn,
    hpsColumn,
    contractValueColumn,
    packageCategoryColumn,
    sourceFundColumn,
    methodColumn,
    pdnColumn,
  ] =
    await Promise.all([
      findColumn(packageTable, budgetColumns),
      findColumn(packageTable, hpsColumns),
      findColumn(contractTable, contractValueColumns),
      findColumn(packageTable, categoryColumns),
      findColumn(packageTable, ["sumber_dana", "source_fund", "funding_source"]),
      findColumn(packageTable, methodColumns),
      findColumn(goodsTable, ["is_pdn", "pdn"]),
    ]);

  const [
    totalPaket,
    totalPagu,
    totalHps,
    totalNilaiKontrak,
    totalBarangKesehatan,
    totalPdn,
    deadlineDekat,
  ] =
    await Promise.all([
      countRows(packageTable),
      sumColumn(packageTable, budgetColumn),
      sumColumn(packageTable, hpsColumn),
      sumColumn(contractTable, contractValueColumn),
      countRows(goodsTable),
      countBooleanTrue(goodsTable, pdnColumn),
      countNearDeadline(packageTable),
    ]);

  const totalPaketBarangKesehatan = packageCategoryColumn
    ? await countMatching(packageTable, packageCategoryColumn, [
        "kesehatan",
        "alkes",
        "obat",
        "bmhp",
        "reagen",
        "laboratorium",
      ])
    : totalBarangKesehatan;
  const statusColumn = await findColumn(packageTable, statusColumns);
  const paketTerlambat = await countMatching(
    packageTable,
    statusColumn,
    delayedWords,
  );
  const realisasiKontrakPercent =
    totalPagu > 0 ? Number(((totalNilaiKontrak / totalPagu) * 100).toFixed(1)) : 0;

  const [tahunAnggaran, stages, categories, sourceFunds, methods, priorities, recentPackages] =
    await Promise.all([
      latestYear(packageTable),
      getStages(packageTable, totalPaket),
      getCategories(packageTable, goodsTable),
      getBreakdown(packageTable, sourceFundColumn, budgetColumn, totalPaket),
      getBreakdown(packageTable, methodColumn, budgetColumn, totalPaket),
      getPriorities(packageTable),
      getRecentPackages(packageTable),
    ]);

  return {
    summary: {
      totalPaket,
      totalPaketBarangKesehatan,
      totalPagu,
      totalHps,
      totalNilaiKontrak,
      totalBarang: totalBarangKesehatan,
      totalPdn,
      paketTerlambat,
      deadlineDekat,
      realisasiKontrakPercent,
      tahunAnggaran,
    },
    stages,
    categories,
    sourceFunds,
    methods,
    priorities,
    recentPackages,
  };
}
