import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div>
        <nav>
          <NavLink to="/" exact>
            Hem
          </NavLink>
          <NavLink to="/post">Posts</NavLink>
          <NavLink to="/project">Projekt</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}
