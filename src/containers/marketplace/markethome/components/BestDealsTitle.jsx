/* eslint-disable*/
import React, { PureComponent } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
 class BuisinessDealsTitle extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto top-nav-market" navbar>
              <NavItem>
              {/* use href="" for linking */}
                <NavLink >Best Deals</NavLink>  
              </NavItem>
              <NavItem>
                <NavLink>Accessories</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withTranslation('common')(BuisinessDealsTitle);