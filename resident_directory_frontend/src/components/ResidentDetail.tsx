import React from "react";
import { Resident } from "./DirectoryList";

interface ResidentDetailProps {
  resident: Resident;
  isAdmin: boolean;
  onEdit: () => void;
  onRequestUpdate: () => void;
  onViewAudit: () => void;
}

const ResidentDetail: React.FC<ResidentDetailProps> = ({
  resident,
  isAdmin,
  onEdit,
  onRequestUpdate,
  onViewAudit,
}) => {
  if (!resident) return null;

  return (
    <section className="retro-panel resident-detail">
      <div className="retro-panel-header">
        <h2>Resident Details</h2>
      </div>
      <div className="retro-detail-content">
        <div>
          <strong>Name:</strong> {resident.name}
        </div>
        <div>
          <strong>Apartment:</strong> {resident.apartment}
        </div>
        <div>
          <strong>Phone:</strong> {resident.phone}
        </div>
        <div>
          <strong>Email:</strong> {resident.email}
        </div>
        <div>
          <strong>Status:</strong> {resident.status}
        </div>
      </div>
      <div className="retro-detail-actions">
        {isAdmin ? (
          <>
            <button className="retro-btn" onClick={onEdit}>Edit</button>
            <button className="retro-btn-secondary" onClick={onViewAudit}>Audit Log</button>
          </>
        ) : (
          <button className="retro-btn" onClick={onRequestUpdate}>Request Update</button>
        )}
      </div>
    </section>
  );
};

export default ResidentDetail;
