"use client";
import React from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

const ResponsiveLayout = ({ children, session }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SessionProvider session={session}>
      <div className="flex h-full w-full relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto">
          <div className="mx-8">
            {!isSidebarOpen && (
              <Menu
                className="text-black lg:hidden w-8 h-8 absolute top-5 left-5 cursor-pointer z-50"
                onClick={toggleSidebar}
              />
            )}
          </div>
          {children}
        </div>
      </div>
    </SessionProvider>
  );
};

export default ResponsiveLayout;
