import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FaSignInAlt } from "react-icons/fa";

import { MdSettings } from "react-icons/md";
import {Link} from 'react-router-dom'

export default function Header(props) {
  let user = localStorage.getItem('user')
    return (
      <>
           <Navbar bg="dark" style={{background:'#20232A'}} variant="dark">
    <Navbar.Brand >CloudVault</Navbar.Brand>
    <Nav className="mr-auto">
      
      {user ? <><Nav.Link ><Link className="nav-link" to="/dashboard">Dashboard</Link></Nav.Link> <Nav.Link ><Link className="nav-link" to="/fileList">List File</Link></Nav.Link></>: 
      
     <> 
     <Nav.Link><Link className="nav-link" to="/login">Login</Link></Nav.Link>
      <Nav.Link><Link className="nav-link" to="/register">Register</Link></Nav.Link>
      </>
      }
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
    {/* < */}
    {user ? <>    <Link to='/'>
    <MdSettings/>
    </Link>
    <Link to="/logout">
      &nbsp;&nbsp;&nbsp;&nbsp;
      <FaSignInAlt/>
    </Link>
    </> : null} 
  </Navbar>
      </>
    )
}
