import React, {useState} from 'react'

function NavItem(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onMouseEnter={() => setOpen(!open)}>    
          {props.name}
        </a>
  
        {open && props.children}
      </li>
    );
  }

  export default NavItem