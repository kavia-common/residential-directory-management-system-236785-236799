"use client";
import React, { useState, useEffect } from "react";
import DirectoryList, { Resident } from "../../components/DirectoryList";
import ResidentDetail from "../../components/ResidentDetail";
import EditResidentModal from "../../components/EditResidentModal";
import RetroHeader from "../../components/RetroHeader";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * Directory page: lists residents, search, select, view, edit/request update (moderated), etc.
 */
export default function DirectoryPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Resident | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // TODO: Auth check logic here
    setIsAdmin(true); // Temporary for demo; replace with real auth role
  }, []);

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch filtered residents from backend using search and filter values
    // This is just a placeholder
    setTimeout(() => {
      setResidents([
        {
          id: 1,
          name: "Alice Smith",
          apartment: "A101",
          phone: "555-1111",
          email: "alice@example.com",
          status: "active",
        },
        {
          id: 2,
          name: "Bob Jones",
          apartment: "B202",
          phone: "555-2222",
          email: "bob@example.com",
          status: "pending",
        },
      ]);
      setLoading(false);
    }, 500);
  }, [search, filter]);

  function handleEdit() {
    setModalOpen(true);
  }
  function handleRequestUpdate() {
    setModalOpen(true);
  }
  function handleAudit() {
    router.push("/auditlog");
  }

  return (
    <>
      <RetroHeader
        username="admin"
        isAdmin={isAdmin}
        onLogout={() => router.push("/login")}
      />
      <main className="flex flex-row">
        <DirectoryList
          residents={residents}
          onSelect={setSelected}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          loading={loading}
        />
        {selected && (
          <ResidentDetail
            resident={selected}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onRequestUpdate={handleRequestUpdate}
            onViewAudit={handleAudit}
          />
        )}
        {selected && modalOpen && (
          <EditResidentModal
            resident={selected}
            open={modalOpen}
            onSubmit={() => {
              // TODO: Wire this to backend; trigger moderation for resident
              setModalOpen(false);
            }}
            onClose={() => setModalOpen(false)}
            isAdmin={isAdmin}
          />
        )}
      </main>
    </>
  );
}
