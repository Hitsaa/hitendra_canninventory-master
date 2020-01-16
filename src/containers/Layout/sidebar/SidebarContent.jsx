/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import ParexButton from "./ParexButton";
import SidebarCategory from "./SidebarCategory";
import createHashHistory from "history/createHashHistory";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isAdmin: false,
      isRetailer: false,
      isGrowProc: false,
      isGrower: false,
      isProc: false,
      isTermsChecked: "false"
    };
  }

  handleTermsButton() {
    this.setState({ isTermsChecked: "true" });
    this.updateTerms();
  }

  showMessage = (message, type) => {
    if (type == "error") {
      toast.error(message);
    } else if (type == "success") {
      toast.success(message);
    }
  };

  goToTerms() {
    const history = createHashHistory();
    history.push("/termsofservice", { forceRefresh: true });
  }
  confirmTermsDialog() {
    let ref = this;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom_terms_dialog">
            <h3>Accept Terms</h3>

            <div className="terms_row">
              <p>
                You have not been accepted our Terms and Services kindly review
                and accept our{" "}
              </p>
              <button
                onClick={() => {
                  this.goToTerms();
                  onClose();
                }}
              >
                Terms Of Services
              </button>
            </div>

            <div className="btn_div">
              <button
                onClick={() => {
                  this.handleTermsButton();
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      }
    });
  }

  updateTerms = () => {
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append("hasAcceptedTerms", "true");
    const tokenStr = localStorage.getItem("cannave_token");
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/terms`;
    axios({
      method: "post",
      url: urls,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        if (!response.data.error) {
          // this.showMessage("Thanks for accepting Terms and Services", "success");
          localStorage.setItem(
            "cannave_user",
            JSON.stringify(response.data.user)
          );
        } else {
        }
      })
      .catch(error => {});
  };

  async componentDidMount() {
    const user = localStorage.getItem("cannave_user");
    if (user !== null && user !== "" && user !== undefined) {
      if (JSON.parse(user)) {
        const paresedUser = JSON.parse(user);
        if (paresedUser.role === "PROCESSOR" || paresedUser.role ==='GROWER') {
          this.state.isGrowProc = true;
        }
        if(paresedUser.role ==='PROCESSOR'){
          this.state.isProc = true;
        }
        if (paresedUser.role === "RETAILER") {
          this.state.isRetailer = true;
        }
        if (paresedUser.role === "GROWER") {
          this.state.isGrower = true;
        }
        console.log("adminStatus", paresedUser.isAdmin);
        if (paresedUser.isAdmin === 1) {
          this.state.isAdmin = true;
          console.log(this.state.isAdmin);
        }

        if (
          paresedUser.hasOwnProperty("hasAcceptedTerms") &&
          paresedUser.hasAcceptedTerms == "false"
        ) {
          this.confirmTermsDialog();
        }
      }
    }
  }

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToLight, changeToDark } = this.props;

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <ParexButton
            route="/parex/VarifiedUsers"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Dashboard"
            icon="home"
            route="/dashboard"
            onClick={this.hideSidebar}
          />
          {this.state.isAdmin ? (
            <SidebarLink
              title="Products"
              icon="store"
              route="/products/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isRetailer ? (
            <SidebarLink
              title="Products"
              icon="store"
              route="/products/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isGrower ? (
            <SidebarLink
              title="Products"
              icon="store"
              route="/products/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isProc ? (
            <SidebarLink
              title="Processor Products"
              icon="store"
              route="/productsprocessor/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isProc ? (
            <SidebarLink
              title="Inventory"
              icon="store"
              route="/inventory/list"
              onClick={this.hideSidebar}
            />
          ) : null}

          {this.state.isRetailer ? (
            <SidebarLink
              title="Patients"
              icon="users"
              route="/customers/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isRetailer ? (
            <SidebarLink
              title="Businesses"
              icon="users"
              route="/business/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isProc || this.state.isGrower ? (
            <SidebarLink
              title="Clients"
              icon="users"
              route="/clients/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isProc ? (
            <SidebarLink
              title="Suppliers"
              icon="users"
              route="/suppliers/list"
              onClick={this.hideSidebar}
            />
          ) : null}
            <SidebarLink
              title="Reports"
              icon="apartment"
              newLink
              route="/reports/summary"
              onClick={this.hideSidebar}
            />
          {/* {(this.state.isAdmin || this.state.isGrowProc) ? <SidebarLink title="Product Categories" icon="heart-pulse" route="/categories/list" onClick={this.hideSidebar} /> : null} */}
          {this.state.isGrower ? (
            <SidebarLink
              title="Plants"
              icon="list"
              route="/plants/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          <SidebarCategory title="Pos" icon="store">
            <SidebarLink
              title="New Cart"
              route="/pos/userSelection"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Manage Cart"
              route="/pos/cartSelection"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Checkouts History"
              route="/pos/checkoutHistory"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Tax Setup"
              route="/pos/settings/tax"
              onClick={this.hideSidebar}
            />
          </SidebarCategory>

          {this.state.isGrower ? (
            <SidebarLink
              title="Batches"
              icon="list"
              route="/batches/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          {this.state.isAdmin ? (
            <SidebarLink
              title="Merchants"
              icon="rocket"
              route="/users/list"
              onClick={this.hideSidebar}
            />
          ) : null}
          <SidebarCategory title="Layout" icon="layers">
            <button
              className="sidebar__link"
              type="button"
              onClick={changeToLight}
            >
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button
              className="sidebar__link"
              type="button"
              onClick={changeToDark}
            >
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="HR Dashboard" icon="layers">
            <SidebarLink title="Manage Employees" route="/employees/list" />
            <SidebarLink title="Payouts" route="/payouts" />
            <SidebarLink title="Clock Tracker" route="/clock" />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Account" icon="user">
            <SidebarLink title="Change Password" route="/change_password" />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Labs" icon="user">
            <SidebarLink title="Lab Testing" route="/lab/tests" />
          </SidebarCategory>
        </ul>

        <ul className="sidebar__block">
          <SidebarLink
            title="Terms of Use"
            icon="layers"
            route="/termsofservice"
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/login" />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
