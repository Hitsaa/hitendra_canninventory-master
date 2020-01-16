/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

export default class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
      fname: '',
      lname: '',
    };
  }

  async componentDidMount() {
    const user = localStorage.getItem('cannave_user');
    if (user !== null && user !== '' && user !== undefined && user !== 'undefined') {
      if (JSON.parse(user)) {
        const paresedUser = JSON.parse(user);
        if (paresedUser.firstName) {
          this.state.fname = paresedUser.firstName;
        }
        if (paresedUser.lastName) {
          this.state.lname = paresedUser.lastName;
        }
        if (paresedUser.isAdmin === 1) {
          this.state.isAdmin = true;
        }
      }
    }
  }

  clearStorage = async () => {
    await localStorage.removeItem('cannave_user');
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  render() {
    const { collapse, fname, lname } = this.state;

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" type="button" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">{fname} {lname}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button className="topbar__back" type="button" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Change Password" icon="cog" path="/change_password" />
            <button onClick={this.clearStorage} type="button" className="topbar__menu">
              <TopbarMenuLink
                title="Log Out"
                icon="exit"
                path="/login"
              />
            </button>
          </div>
        </Collapse>
      </div>
    );
  }
}
