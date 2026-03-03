import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * Main landing page for Residential Directory App.
 * Offers navigation to directory and login.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="retro-panel" style={{ minWidth: 340, maxWidth: 410 }}>
        <div className="retro-panel-header" style={{ justifyContent: "center" }}>
          <h1>🏢 Residential Directory</h1>
        </div>
        <div style={{ margin: "20px 0" }}>
          <p className="mb-3" style={{ fontSize: "1.12em", textAlign: "center" }}>
            Welcome! Manage your building&apos;s resident directory, search or update contact info, and more.
          </p>
        </div>
        <nav className="flex flex-col items-center gap-2">
          <Link href="/login" className="retro-btn" style={{ width: 145, textAlign: "center" }}>
            Login
          </Link>
          <Link href="/directory" className="retro-btn-secondary" style={{ width: 145, textAlign: "center" }}>
            View Directory
          </Link>
        </nav>
        <div style={{ marginTop: 20, fontSize: "0.96em", color: "#888", textAlign: "center" }}>
          Admins can log in to perform directory maintenance, review audit log, and handle requests.
        </div>
      </div>
    </main>
  );
}
