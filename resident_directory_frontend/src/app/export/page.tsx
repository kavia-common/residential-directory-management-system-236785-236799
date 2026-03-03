"use client";
import React, { useState } from "react";
import ExportCSVButton from "../../components/ExportCSVButton";
import RetroHeader from "../../components/RetroHeader";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * Admin-only page to export directory as CSV.
 */
export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleExport() {
    setLoading(true);
    try {
      // TODO: Download CSV from backend and trigger file download
      // Example download mechanism:
      const res = await fetch("/api/export/csv");
      if (!res.ok) throw new Error("CSV export failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resident_directory.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      // Could show error message
    }
    setLoading(false);
  }

  return (
    <>
      <RetroHeader
        username="admin"
        isAdmin={true}
        onLogout={() => router.push("/login")}
      />
      <main className="flex flex-col items-center min-h-screen justify-center">
        <ExportCSVButton onExport={handleExport} loading={loading} />
      </main>
    </>
  );
}
