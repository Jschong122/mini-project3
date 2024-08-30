import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const leaveData = await request.json();
    console.log("Received leave request data:", leaveData);

    const filePath = path.join(process.cwd(), "data", "leaveRequests.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const leaveRequests = JSON.parse(fileData);

    leaveRequests.push({
      id: Date.now(),
      ...leaveData,
      status: "Pending",
    });

    fs.writeFileSync(filePath, JSON.stringify(leaveRequests, null, 2));

    return NextResponse.json(
      {
        message: "Leave request submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting leave request:", error);
    return NextResponse.json(
      {
        message: "Error submitting leave request",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    const filePath = path.join(process.cwd(), "data", "leaveRequests.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    let leaveRequests = JSON.parse(fileData);

    if (username) {
      leaveRequests = leaveRequests.filter(
        (request) => request.username === username
      );
    }

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      {
        message: "Error fetching leave requests",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);

    const id = url.searchParams.get("id");

    debugger;
    if (!id) {
      return NextResponse.json({ message: "No id provided" }, { status: 400 });
    }
    const filePath = path.join(process.cwd(), "data", "leaveRequests.json");

    let leaveRequests = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const updatedRequests = leaveRequests.filter(
      (request) => request.id !== parseInt(id)
    );

    if (updatedRequests.length === leaveRequests.length) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedRequests, null, 2));

    return NextResponse.json(
      { message: "Request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting leave request:", error);
    return NextResponse.json(
      { message: "Error deleting request" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  console.log("PUT request received");

  try {
    const url = new URL(request.url);
    console.log("Full URL:", url.toString());
    const id = url.searchParams.get("id");
    console.log("id from put", id);
    const updatedData = await request.json();
    console.log("updated data from put", updatedData);

    if (!id) {
      return NextResponse.json({ message: "No ID provided" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "leaveRequests.json");
    let leaveRequests = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = leaveRequests.findIndex(
      (request) => request.id === parseInt(id)
    );

    if (index === -1) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    leaveRequests[index] = {
      ...leaveRequests[index],
      startDate: updatedData.startDate || leaveRequests[index].startDate,
      endDate: updatedData.endDate || leaveRequests[index].endDate,
      reason: updatedData.reason || leaveRequests[index].reason,
    };

    fs.writeFileSync(filePath, JSON.stringify(leaveRequests, null, 2));

    return NextResponse.json(leaveRequests[index], { status: 200 });
  } catch (error) {
    console.error("Error updating leave request:", error);
    return NextResponse.json(
      { message: "Error updating request" },
      { status: 500 }
    );
  }
}
