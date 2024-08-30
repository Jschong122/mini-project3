import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import path from "path";
import fs from "fs";

export async function GET(request) {
  // Authentication check
  const session = await getServerSession(authOptions);
  console.log("session in leave-request manager", session);
  if (!session || session.user.role !== "Manager") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const filePath = path.join(process.cwd(), "data", "leaveRequests.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const leaveRequests = JSON.parse(fileData);
    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch leave requests" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  // Authentication check
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "Manager") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { status } = await request.json();

  try {
    const filePath = path.join(process.cwd(), "data", "leaveRequests.json");
    let leaveRequests = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = leaveRequests.findIndex(
      (request) => request.id === parseInt(id)
    );

    if (index === -1) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }

    leaveRequests[index].status = status;
    fs.writeFileSync(filePath, JSON.stringify(leaveRequests, null, 2));

    return NextResponse.json(leaveRequests[index]);
  } catch (error) {
    console.error("Error updating leave request status:", error);
    return NextResponse.json(
      { error: "Failed to update leave request status" },
      { status: 500 }
    );
  }
}
