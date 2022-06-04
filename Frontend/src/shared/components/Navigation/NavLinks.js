import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

const NavLinks = () =>{
  return (
    <ul className='nav-links'>
    <li>
        <NavLink to='/' exact>APPOINTMENT</NavLink>
    </li>
    <li>
        <NavLink to='/newPatient'>NEW PATIENT</NavLink>
    </li>
    <li>
        <NavLink to='/search'>SEARCH</NavLink>
    </li>
    <li>
        <NavLink to='/auth'>PASSWORD CHANGE</NavLink>
    </li>
     </ul>
  )
}

export default NavLinks