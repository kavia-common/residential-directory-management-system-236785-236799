import React from "react";

interface ExportCSVButtonProps {
  onExport: () => void;
  loading?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Button to export the resident directory as CSV.
 */
const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({ onExport, loading }) => (
  <button className="retro-btn" onClick={onExport} disabled={loading}>
    {loading ? "Exporting..." : "Export CSV"}
  </button>
);

export default ExportCSVButton;
