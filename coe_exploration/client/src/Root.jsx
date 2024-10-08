import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./authentication/AuthComponent";
import './root.css'

// Add imports from Mo's branch
import {
  Link,
  useParams,
  useSearchParams,
  useRouteError,
  useLocation,
} from "react-router-dom";

export function Root(props) {
  const location = useLocation(); // Get the current page location
  const { children } = props;
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = '/ ';
  }

  // Determine if the navigation should have the specific style
  const isPetPage = location.pathname === "/pet"; 

  return (
    <>
      <nav className={`nav ${isPetPage ? 'nav-pet' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" className="nav-link">
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className="nav-link">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/pet" className="nav-link">
              Pet
            </NavLink>
          </li>
        </ul>
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <main>{children || <Outlet />}</main>
      {/*{!isPetPage && <Footer/>} {/*The pet page has no visable overflow so this would never be shown on screen there anyway*/}
    </>
  );
}

/*
function Footer() {
  return (
    <>
    <hr></hr>
    <footer style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center' }}>
      <div> A simple web application made for a senior capstone class.</div>
    </footer>
    </>
  );
}
*/

export function ErrorPage() {
  const error = useRouteError(); // Assuming you're using React Router for navigation
  console.error(error);
  return (
    <>
      <h1>Error 404</h1>
      <p>{error.statusText || error.message}</p>
    </>
  );
}
