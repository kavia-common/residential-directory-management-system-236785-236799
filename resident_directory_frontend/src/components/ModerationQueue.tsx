import React from "react";

export interface ModerationRequest {
  id: number;
  residentName: string;
  field: string;
  oldValue: string;
  newValue: string;
  requestedBy: string;
  requestedAt: string;
}

interface ModerationQueueProps {
  requests: ModerationRequest[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const ModerationQueue: React.FC<ModerationQueueProps> = ({
  requests,
  onApprove,
  onReject,
}) => (
  <section className="retro-panel moderation-queue">
    <div className="retro-panel-header">
      <h2>Moderation Queue</h2>
    </div>
    <div className="retro-list-content">
      {requests.length === 0 ? (
        <div>No pending updates.</div>
      ) : (
        <table className="retro-table">
          <thead>
            <tr>
              <th>Resident</th>
              <th>Field</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Requested By</th>
              <th>Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.residentName}</td>
                <td>{req.field}</td>
                <td>{req.oldValue}</td>
                <td>{req.newValue}</td>
                <td>{req.requestedBy}</td>
                <td>{req.requestedAt}</td>
                <td>
                  <button className="retro-btn" onClick={() => onApprove(req.id)}>Approve</button>
                  <button className="retro-btn-danger" onClick={() => onReject(req.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </section>
);

export default ModerationQueue;
