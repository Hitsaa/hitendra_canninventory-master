import React from 'react';
import { Badge } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import logo from '../../../img/parex_logo.PNG';
// import TextParex from '../../../img/prex_text.PNG';
import FullLogo from '../../../img/parex_full_Button.png';
// title, icon, newLink,
const SidebarLink = ({
  route, onClick,
}) => (
  <NavLink to={route} onClick={onClick} activeClassName="sidebar__link-active">
    <Tooltip title="Find buyers and sellers here that are Parex varified">
      <li className="sidebar__link">
        {/* <img src={logo} alt="Parex" className="sidebar__link-image" /> */}
        <p className="sidebar__link-title parex-Img-p">
          <img src={FullLogo} alt="Parex" className="parex-title" />
          <Badge className="sidebar__parex-badge"><span>Coming Soon</span></Badge>
        </p>
      </li>
    </Tooltip>
  </NavLink>
);
SidebarLink.propTypes = {
  // title: PropTypes.string.isRequired,
  // icon: PropTypes.string,
  // newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
  // icon: '',
  // newLink: false,
  route: '/',
  onClick: () => { },
};

export default SidebarLink;
