"use client";

import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  rightLabel?: string;
};

export default function AppHeader({
  title,
  subtitle,
  rightLabel,
}: AppHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        mode="mobile"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <NavBar
        title={title}
        subtitle={subtitle}
        rightLabel={rightLabel}
        onOpenMenu={() => setSidebarOpen(true)}
      />
    </>
  );
}
