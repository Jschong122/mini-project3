"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function ClientOnlyLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
