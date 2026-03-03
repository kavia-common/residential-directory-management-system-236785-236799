"use client";
import React, { useState, useEffect } from "react";
import AuditLogTable, { AuditLogEntry } from "../../components/AuditLogTable";
import RetroHeader from "../../components/RetroHeader";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * Admin/Resident audit log page (shows all changes and actor)
 */
export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch audit log from backend
    setTimeout(() => {
      setLogs([
        {
          id: 1,
          entity: "Alice Smith",
          action: "Update Email",
          changedBy: "admin1",
          timestamp: "2024-06-15 09:15",
          details: "Email was changed from alice@foo.com to alice@example.com",
        },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <>
      <RetroHeader
        username="admin"
        isAdmin={true}
        onLogout={() => router.push("/login")}
      />
      <main>
        <AuditLogTable logs={logs} loading={loading} />
      </main>
    </>
  );
}
