/* eslint-disable jsx-a11y/alt-text */
import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarLanguage from './TopbarLanguage';
import logo from '../../../img/CannIn.png';

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <img className="topbar__logo" src={logo} alt={logo} />
          </div>
          <div className="topbar__right">
            <TopbarProfile />
            <TopbarLanguage />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
