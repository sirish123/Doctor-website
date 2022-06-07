import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

const NavLinks = () =>{
  return (
    <ul className='nav-links'>
    <li>
    <NavLink to='/' exact>APPOINTMENTS</NavLink>
    </li>
    <li>
        <NavLink to='/book' exact>BOOK</NavLink>
    </li>
    <li>
        <NavLink to='/history'>HISTORY</NavLink>
    </li>
    {/* <li>
        <NavLink to='/auth'>PASSWORD CHANGE</NavLink>
    </li> */}
     </ul>
  )
}

export default NavLinks