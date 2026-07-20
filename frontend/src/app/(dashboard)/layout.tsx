import type { ReactNode } from "react";
import Sidebar from "./_shared/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-dvh bg-[#f4f7f5] text-slate-900 lg:flex">
      <Sidebar mode="desktop" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
