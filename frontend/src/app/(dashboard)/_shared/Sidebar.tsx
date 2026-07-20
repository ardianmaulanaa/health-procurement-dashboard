"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Archive,
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  Database,
  FileBarChart2,
  FileCheck2,
  Handshake,
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShieldCheck,
  Truck,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
  mode?: "mobile" | "desktop";
};

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

const sections: NavigationSection[] = [
  {
    title: "Monitoring",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/data-barang", label: "Data Barang", icon: Boxes },
      { href: "/paket", label: "Paket", icon: ClipboardList },
      { href: "/pengadaan/perencanaan", label: "Pengadaan", icon: PackageSearch },
    ],
  },
  {
    title: "Pelaksanaan",
    items: [
      { href: "/kontrak", label: "Kontrak", icon: FileCheck2 },
      { href: "/progres", label: "Progres", icon: BarChart3 },
      { href: "/realisasi", label: "Realisasi", icon: Building2 },
      { href: "/serah-terima", label: "Serah Terima", icon: Handshake },
    ],
  },
  {
    title: "Referensi",
    items: [
      { href: "/penyedia", label: "Penyedia", icon: Truck },
      { href: "/warning", label: "Warning", icon: AlertTriangle },
      { href: "/laporan", label: "Laporan", icon: FileBarChart2 },
      { href: "/master/instansi", label: "Master Data", icon: Database },
    ],
  },
  {
    title: "Administrasi",
    items: [
      { href: "/admin/users", label: "Users", icon: UsersRound },
      { href: "/admin/roles", label: "Role", icon: ShieldCheck },
      { href: "/admin/audit-log", label: "Audit Log", icon: Archive },
      { href: "/profile", label: "Profile", icon: Settings },
    ],
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  const baseHref = href.split("/").slice(0, 2).join("/");
  return pathname === href || pathname.startsWith(`${baseHref}/`);
}

export default function Sidebar({
  open = false,
  onClose,
  mode = "mobile",
}: SidebarProps) {
  const pathname = usePathname();
  const isDesktop = mode === "desktop";

  return (
    <>
      {!isDesktop ? (
        <div
          className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition lg:hidden ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`inset-y-0 left-0 z-50 w-[300px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          isDesktop
            ? "sticky top-0 hidden h-dvh lg:flex"
            : `fixed flex lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`
        }`}
      >
        <div className="grid h-1.5 grid-cols-3">
          <div className="bg-[#08783f]" />
          <div className="bg-[#f5bd20]" />
          <div className="bg-[#159cc3]" />
        </div>

        <div className="flex min-h-[86px] items-center justify-between border-b border-slate-100 px-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#08783f]">
              Dinkes Jabar
            </p>
            <h2 className="mt-1 text-lg font-black tracking-[-0.03em] text-slate-950">
              Monitoring PBJ
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 ${
              isDesktop ? "hidden" : "flex"
            }`}
            aria-label="Tutup menu"
            title="Tutup menu"
          >
            <X className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.title}>
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  {section.title}
                </p>
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActivePath(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
                          active
                            ? "bg-[#08783f] text-white shadow-[0_10px_22px_rgba(8,120,63,0.20)]"
                            : "text-slate-600 hover:bg-[#f4f7f5] hover:text-[#08783f]"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
