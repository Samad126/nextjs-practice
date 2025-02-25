import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "App Dashboard",
  description: "Basic CRUD",
};

function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export default DashboardLayout;
