"use client";
import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * Page for user login (admin/resident)
 * Redirects to directory on success.
 */
export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function handleLogin(username: string, password: string) {
    setError(undefined);
    setLoading(true);
    try {
      // Update the URL based on backend location
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials or error logging in");
      // Real app: set auth cookie/token here
      router.push("/directory");
    } catch (err) {
      const message: string =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
          ? (err as { message?: string }).message || "Login error"
          : "Login error";
      setError(message);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="retro-panel" style={{ maxWidth: 390, margin: "auto" }}>
        <div className="retro-panel-header">
          <h1>Sign In</h1>
        </div>
        <AuthForm onSubmit={handleLogin} error={error} loading={loading} />
      </div>
    </main>
  );
}
