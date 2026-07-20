/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require("bcrypt");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const { PrismaClient } = require("@prisma/client");

const databaseUrl =
  process.env.DATABASE_URL ??
  "mysql://root@127.0.0.1:3306/health_procurement_dashboard";

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(databaseUrl),
});

const roles = [
  ["SUPER_ADMIN", "Super Admin"],
  ["LPSE_ADMIN", "Admin LPSE"],
  ["OPERATOR", "Operator"],
  ["LEADER", "Pimpinan"],
  ["PA", "Pengguna Anggaran"],
  ["KPA", "Kuasa Pengguna Anggaran"],
  ["PPK", "PPK"],
  ["PROCUREMENT_OFFICER", "Pejabat Pengadaan"],
  ["SELECTION_WORKGROUP", "Pokja Pemilihan"],
  ["UKPBJ", "UKPBJ"],
  ["AUDITOR", "Auditor"],
  ["VIEWER", "Viewer"],
];

async function main() {
  for (const [code, name] of roles) {
    await prisma.role.upsert({
      where: { code },
      update: { name },
      create: { code, name },
    });
  }

  const superAdminRole = await prisma.role.findUniqueOrThrow({
    where: { code: "SUPER_ADMIN" },
  });

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@health.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin12345";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Administrator",
      passwordHash,
      status: "ACTIVE",
    },
    create: {
      name: "Administrator",
      email: adminEmail,
      passwordHash,
      status: "ACTIVE",
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: superAdminRole.id,
    },
  });

  console.info(`Seed selesai. Admin: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
