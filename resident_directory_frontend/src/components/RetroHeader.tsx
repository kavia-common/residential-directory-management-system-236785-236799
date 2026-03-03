import React from "react";

interface RetroHeaderProps {
  username: string;
  isAdmin: boolean;
  onLogout: () => void;
}

const RetroHeader: React.FC<RetroHeaderProps> = ({
  username,
  isAdmin,
  onLogout,
}) => (
  <header className="retro-header">
    <div className="retro-logo">
      <span role="img" aria-label="building" className="mr-2">🏢</span>
      <span>Residential Directory</span>
    </div>
    <nav className="retro-nav">
      <span className="retro-user">{username} {isAdmin ? "(admin)" : ""}</span>
      <button className="retro-btn-secondary" onClick={onLogout}>
        Logout
      </button>
    </nav>
  </header>
);

export default RetroHeader;
