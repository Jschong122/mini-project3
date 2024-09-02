"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function OnlineLeaveForm() {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      startDate,
      endDate,
      reason,
      username: session.user.username,
      user_id: session.user.id,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/leave-requests/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit leave request");
      }

      const result = await response.json();
      console.log("API response:", result);

      toast.success("Leave request submitted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit leave request");
    }
  };

  return (
    <div className=" md:flex p-3 m-8 justify-evenly rounded-xl border-none bg-gradient-to-r from-[#cfdcff] to-[#e2f1ff] drop-shadow-xl ">
      <form onSubmit={handleSubmit}>
        <Card className="bg-inherit border-none w-[300px] ">
          <CardHeader>
            <CardTitle>Online Leave Form </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Reason of request leave</p>
            <Input type="text" onChange={(e) => setReason(e.target.value)} />
            <p>Date Start</p>
            <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <p> Date return </p>
            <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
            <Button
              type="submit"
              className=" mt-3"
              disabled={!reason || !startDate || !endDate || !session}
            >
              Submit
            </Button>

            {!session && (
              <p className="text-red-600 text-lg mt-3 font-bold">
                Please login to submit
              </p>
            )}
          </CardContent>
        </Card>
      </form>
      <div className=" p-3 ">
        <h2 className="text-xl font-bold mb-2">Important Notices</h2>
        <ul className="list-disc list-inside text-lg">
          <li>
            Please ensure you have logged in and all fields are filled out
            correctly before submitting your leave request.
          </li>
          <li>
            Leave requests should be submitted at least two weeks in advance.
          </li>
          <li>
            For urgent leave requests, please contact your manager directly.
          </li>
        </ul>
      </div>
    </div>
  );
}
export default OnlineLeaveForm;
