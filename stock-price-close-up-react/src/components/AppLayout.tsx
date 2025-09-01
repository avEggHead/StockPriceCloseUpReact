import type { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

import "../styles/site.css";
import "../styles/_Layout.css";

export default function AppLayout({ children }: PropsWithChildren) {
  const { user, logoutUser } = useUser();

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Stock Price Close-Up
          </Link>

          {/* ✅ Hamburger toggler */}
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

          {/* ✅ Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {user && (
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/stocks">
                    Stock Lookup
                  </NavLink>
                  <span className="arrow-flash">⬅️</span>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {!user && (
                <>
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
                </>
              )}
              {user && (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Welcome, {user.username}</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={logoutUser}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-fill container py-4">{children}</main>

      <footer className="footer border-top text-muted">
        <div className="container">
          &copy; {new Date().getFullYear()} - Stock Price Close-Up
        </div>
      </footer>
    </div>
  );
}
