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
import classnames from 'classnames';
import PropTypes from 'prop-types';
 class BuisinessTitle extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.state = {
      isOpen: false,
      activeTab: '1'
    };
  }

  toggleActive(tab){
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="buisinessTitleCont">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto top-nav-market" navbar>
              <NavItem>
              {/* use href="" for linking */}
                <NavLink className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggleActive('1'); }}>Featured</NavLink>  
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggleActive('2'); }}>On Sale</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggleActive('3'); }}>Top Rated</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggleActive('4'); }}>5 Star Seller</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggleActive('5'); }}>New Arrivals</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withTranslation('common')(BuisinessTitle);
