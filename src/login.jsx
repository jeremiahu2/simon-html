import React from 'react';
import { AuthState } from './app.jsx';

export function Login({ userName, authState, onAuthChange }) {
  const [nameInput, setNameInput] = React.useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      localStorage.setItem('userName', nameInput);
      onAuthChange(nameInput, AuthState.Authenticated);
    }
  }

  function handleLogout() {
    localStorage.removeItem('userName');
    onAuthChange('', AuthState.Unauthenticated);
  }

  return (
    <main className="login-page">
      {authState === AuthState.Authenticated ? (
        <>
          <h1>Welcome, {userName}!</h1>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <h1>Login to Simon</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="form-control"
          />
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      )}
    </main>
  );
}
