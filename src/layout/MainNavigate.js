import React, { useState } from "react";
import { Link } from "react-router-dom";

const MainNavigate = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("time_expired");
    localStorage.removeItem("user");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          {user ? (
            <>
              <p>{user.username}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigate;
