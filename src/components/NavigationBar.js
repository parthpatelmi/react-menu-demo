function NavigationBar(props) {
    return (
      <nav className="navigationBar">
        <ul className="navigationBar-nav">{props.children}</ul>
      </nav>
    );
  }

  export default NavigationBar