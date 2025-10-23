import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Login } from './login.jsx';
import { Play } from './play/play.jsx';
import { Scores } from './scores/scores.jsx';
import { About } from './about/about.jsx';

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Page not found.
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app bg-dark text-light">
        <header className="container-fluid p-2">
          <nav className="navbar fixed-top navbar-dark bg-dark d-flex align-items-center justify-content-start">
            <div className="navbar-brand me-4">Simon<sup>&reg;</sup></div>
            <ul className="navbar-nav flex-row">
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/play">Play</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/scores">Scores</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/play" element={<Play />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Author Name(s)</span>
            <a className="text-reset" href="https://github.com/webprogramming260/simon-css">Source</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

