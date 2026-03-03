import React, { useState } from "react";

interface AuthFormProps {
  onSubmit: (username: string, password: string) => void;
  error?: string;
  loading?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * AuthForm
 * Login form for users (admin/residents)
 */
const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, error, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
    <form className="retro-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="retro-input-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          autoFocus
          type="text"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="retro-input"
          required
        />
      </div>
      <div className="retro-input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="retro-input"
          required
        />
      </div>
      {error && <div className="retro-error">{error}</div>}
      <button className="retro-btn" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
