import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md">
      <Link to='/' className='navbar-brand'>Library App</Link>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#">Build a Class</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Instructional Services</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">About</NavLink>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/lesson-plans'>Lesson Plans</Link>
          </NavItem>
          <NavItem>
            <NavLink href="#">Data Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Your Account</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Login</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Navigation;