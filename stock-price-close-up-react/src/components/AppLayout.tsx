import type { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";

import "../styles/site.css";
import "../styles/_Layout.css";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Stock Price Close-Up
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item position-relative">
                <NavLink className="nav-link" to="/stocks">
                  Stock Lookup
                </NavLink>
                {/* Flashing arrow */}
                <span className="arrow-flash">⬅️</span>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-fill container py-4">{children}</main>

      {/* Footer */}
      <footer className="footer border-top text-muted">
        <div className="container">
          &copy; {new Date().getFullYear()} - Stock Price Close-Up
        </div>
      </footer>
    </div>
  );
}
