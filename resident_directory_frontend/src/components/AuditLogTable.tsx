import React from "react";

export interface AuditLogEntry {
  id: number;
  entity: string;
  action: string;
  changedBy: string;
  timestamp: string;
  details: string;
}

interface AuditLogTableProps {
  logs: AuditLogEntry[];
  loading: boolean;
}

const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs, loading }) => (
  <section className="retro-panel audit-log-table">
    <div className="retro-panel-header">
      <h2>Audit Log</h2>
    </div>
    <div className="retro-list-content">
      {loading ? (
        <div className="retro-loader">Loading...</div>
      ) : logs.length === 0 ? (
        <div>No audit events found.</div>
      ) : (
        <table className="retro-table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Action</th>
              <th>By</th>
              <th>At</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(entry => (
              <tr key={entry.id}>
                <td>{entry.entity}</td>
                <td>{entry.action}</td>
                <td>{entry.changedBy}</td>
                <td>{entry.timestamp}</td>
                <td>{entry.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </section>
);

export default AuditLogTable;
