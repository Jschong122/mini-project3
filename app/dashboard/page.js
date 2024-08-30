"use client";
import React, { useEffect, useState } from "react";
import { useSession, status } from "next-auth/react";
import { redirect } from "next/navigation";
import UserInfo from "../_components/UserInfo";
import LeaveRequestTable from "../_components/LeaveRequestTable";

const dashboard = () => {
  const { data: session } = useSession();
  console.log("session", session);

  if (!session) return redirect("/auth/login");

  return (
    <div className=" ml-20 lg:ml-auto flex flex-col h-screen w-screen ">
      <h1 className="text-4xl font-bold justify-start items-center bg-slate-600 p-6 text-white">
        Dashboard
      </h1>

      <UserInfo session={session} />

      <div>
        <LeaveRequestTable />
      </div>
    </div>
  );
};

export default dashboard;
