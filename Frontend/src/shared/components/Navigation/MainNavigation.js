import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import MainHeader from './MainHeader'
import './MainNavigation.css'
import NavLinks from './NavLinks'
import Backdrop from '../UIElements/Backdrop'
import SideDrawer from './SideDrawer'
const MainNavigation = () => {
  const [isDrawerOpen,setDrawerOpen] = useState(false);
  const openDrawer = () =>{
    setDrawerOpen(true);
  }
  const closeDrawer = () =>{
    setDrawerOpen(false);
  }
  return (
    <React.Fragment>
      {isDrawerOpen && <Backdrop onClick = {closeDrawer}/>}
      
      <SideDrawer show = {isDrawerOpen} onClick = {closeDrawer}>
        <nav className='main-navigation__drawer-nav'>
        <NavLinks />
        </nav>
      </SideDrawer>
      
     
    <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawer}>
           <span />
           <span />
           <span />
        </button>
        <h1 className='main-navigation__title'>
            <Link  to= '/'>Dr.A.R. Samiullah Acupuncture</Link>
        </h1>
        <nav className = "main-navigation__header-nav">
          <NavLinks />
        </nav>
    </MainHeader>
    </React.Fragment>
  )
}

export default MainNavigation