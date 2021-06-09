import React, { useState, useEffect, useRef } from 'react';
import DropdownItem from '../components/DropdownItem'
import {CSSTransition} from 'react-transition-group'

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
 
  
    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem setActiveMenu={setActiveMenu}>My Profile</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu}
              goToMenu="settings">
              Settings
            </DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu}
              goToMenu="animals">
              Animals
            </DropdownItem>
  
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === 'settings'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem setActiveMenu={setActiveMenu} goToMenu="main">
              <h2>My Tutorial</h2>
            </DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu}>HTML</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu}>CSS</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu}>JavaScript</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu}>Awesome!</DropdownItem>
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === 'animals'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem setActiveMenu={setActiveMenu} goToMenu="main">
              <h2>Animals</h2>
            </DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🦘">Kangaroo</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🐸">Frog</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🦋">Horse?</DropdownItem>
            <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🦔">Hedgehog</DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
  }

  export default DropdownMenu