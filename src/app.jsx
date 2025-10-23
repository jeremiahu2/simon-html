import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './login';
import { About } from './about/about';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export const AuthState = {
  Unknown: 0,
  Authenticated: 1,
  Unauthenticated: 2,
};

export default function App() {
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
      setAuthState(AuthState.Authenticated);
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, []);

  return (
    <BrowserRouter>
      <header className="navbar bg-dark navbar-dark">
        <menu className="navbar-nav">
          <li><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li><NavLink className="nav-link" to="/about">About</NavLink></li>
          {authState === AuthState.Authenticated && (
            <>
              <li><NavLink className="nav-link" to="/play">Play</NavLink></li>
              <li><NavLink className="nav-link" to="/scores">Scores</NavLink></li>
            </>
          )}
        </menu>
      </header>

      <Routes>
        <Route path="/" element={
          <Login userName={userName} authState={authState}
            onAuthChange={(user, state) => {
              setUserName(user);
              setAuthState(state);
            }}
          />
        }/>
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<Play userName={userName} />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </BrowserRouter>
  );
}



