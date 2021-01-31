import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
    return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand>
        <Link to='/'>
      {/* <img
        alt=""
        src="/cloudvault.png"
        width="50"
        height="60"
        className="d-inline-block align-top"
      />{' '} */}
      CloudVault
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
        <Link to="/register">Register</Link>
    </Navbar.Text>
  </Navbar.Collapse>
  </Navbar>
    )
}
