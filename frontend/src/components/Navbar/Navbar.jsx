import React from 'react';
import './Navbar.css';
import logo from "./edit2.png"

function Navbar() {
  return (
    <div>
      <header className="navbar_header">
        <nav>
          <ul>
          <li style={{ float: 'left' }}><a href="/"><img id="navbar-logo" src={logo} alt="logo" /></a></li>
            {/* <li><a href="/">Home</a></li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
