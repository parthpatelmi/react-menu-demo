function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onMouseEnter={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  export default DropdownItem