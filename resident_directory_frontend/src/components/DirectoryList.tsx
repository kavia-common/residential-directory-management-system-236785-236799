import React from "react";

export interface Resident {
  id: number;
  name: string;
  apartment: string;
  phone: string;
  email: string;
  status: string;
}

interface DirectoryListProps {
  residents: Resident[];
  onSelect: (resident: Resident) => void;
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  loading: boolean;
}

const DirectoryList: React.FC<DirectoryListProps> = ({
  residents,
  onSelect,
  search,
  setSearch,
  filter,
  setFilter,
  loading,
}) => {
  return (
    <section className="retro-panel dir-list" aria-label="Resident Directory">
      <div className="retro-panel-header">
        <h2>Directory</h2>
        <div className="retro-search-group">
          <input
            type="text"
            placeholder="Search by name or apt..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="retro-input"
            aria-label="Search"
          />
          <select
            className="retro-input"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            aria-label="Status Filter"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="retro-list-content">
        {loading ? (
          <div className="retro-loader">Loading...</div>
        ) : residents.length === 0 ? (
          <div>No residents found.</div>
        ) : (
          <ul className="retro-list">
            {residents.map(res => (
              <li
                key={res.id}
                tabIndex={0}
                aria-label={`View details for ${res.name}`}
                className="retro-list-item"
                onClick={() => onSelect(res)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") onSelect(res);
                }}
              >
                <span className="dir-list-name">{res.name}</span>
                <span className="dir-list-apt">{res.apartment}</span>
                <span className={`dir-list-status status-${res.status}`}>{res.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DirectoryList;
