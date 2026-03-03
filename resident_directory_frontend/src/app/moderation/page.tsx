"use client";
import React, { useState, useEffect } from "react";
import RetroHeader from "../../components/RetroHeader";
import ModerationQueue, { ModerationRequest } from "../../components/ModerationQueue";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * Admin page for handling moderation requests from residents.
 */
export default function ModerationPage() {
  const [requests, setRequests] = useState<ModerationRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch moderation requests from backend
    setTimeout(() => {
      setRequests([
        {
          id: 101,
          residentName: "Bob Jones",
          field: "Phone",
          oldValue: "555-2222",
          newValue: "555-9999",
          requestedBy: "bob",
          requestedAt: "2024-06-15 10:15",
        },
      ]);
    }, 600);
  }, []);

  function handleApprove(id: number) {
    // TODO: Call backend to approve
    setRequests(reqs => reqs.filter(r => r.id !== id));
  }
  function handleReject(id: number) {
    // TODO: Call backend to reject
    setRequests(reqs => reqs.filter(r => r.id !== id));
  }

  return (
    <>
      <RetroHeader
        username="admin"
        isAdmin={true}
        onLogout={() => router.push("/login")}
      />
      <main>
        <ModerationQueue
          requests={requests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </main>
    </>
  );
}
