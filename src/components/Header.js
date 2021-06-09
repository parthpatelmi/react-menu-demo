import React from 'react'
import NavigationBar from '../components/NavigationBar'
import NavItem from '../components/NavItem'
import DropdownMenu from '../components/DropdownMenu'

function Header() {
    return (
      <NavigationBar>
        <NavItem name='service' />
        <NavItem name='solution' />
        <NavItem name='about'>
        <DropdownMenu></DropdownMenu>
            </NavItem>
  
        <NavItem name='hire' >
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </NavigationBar>
    );
  }

export default Header