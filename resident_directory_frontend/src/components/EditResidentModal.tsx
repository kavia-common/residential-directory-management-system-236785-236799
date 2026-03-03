import React, { useState } from "react";
import { Resident } from "./DirectoryList";

interface EditResidentModalProps {
  resident: Resident;
  open: boolean;
  onSubmit: (updated: Partial<Resident>) => void;
  onClose: () => void;
  isAdmin: boolean;
}

const EditResidentModal: React.FC<EditResidentModalProps> = ({
  resident,
  open,
  onSubmit,
  onClose,
  isAdmin,
}) => {
  const [form, setForm] = useState({
    name: resident.name,
    apartment: resident.apartment,
    phone: resident.phone,
    email: resident.email,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    onSubmit(form);
  }

  if (!open) return null;

  return (
    <div className="retro-modal-backdrop" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="retro-modal">
        <div className="retro-modal-header">
          <h2>{isAdmin ? "Edit Resident" : "Request Update"}</h2>
          <button className="retro-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <form className="retro-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="retro-input-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" className="retro-input" value={form.name} onChange={handleChange} required />
          </div>
          <div className="retro-input-group">
            <label htmlFor="apartment">Apartment</label>
            <input id="apartment" name="apartment" className="retro-input" value={form.apartment} onChange={handleChange} required />
          </div>
          <div className="retro-input-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" className="retro-input" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="retro-input-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="retro-input" value={form.email} onChange={handleChange} required />
          </div>
          <div className="retro-modal-actions">
            <button className="retro-btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
            <button className="retro-btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResidentModal;
