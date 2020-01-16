/* eslint-disable */
import React, { PureComponent } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardImg, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import CheckoutButton from './CheckoutButton';
import CheckoutComponent from './CheckoutComponent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

class MarketPlaceCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checkoutPressed: false,
          };
          this.navcheckout      = this.navcheckout.bind(this);
          this.deleteProduct    = this.deleteProduct.bind(this);
          this.navcheckout = this.navcheckout.bind(this);
      }
    
    navcheckout() {
        this.setState({ checkoutPressed: !this.state.checkoutPressed });
    }

    async deleteProduct(id) {
        console.log(id);
      /*  const tokenStr = localStorage.getItem('cannave_token');
        const token = JSON.parse(tokenStr);
        const urls = `${process.env.API_ENDPOINT}/products/delete/${id}`;
        await axios({
            method: 'post',
            url: urls,
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            
        }); */
    }
  render() {
    const {
        checkoutPressed,
        navcheckout
      } = this.state;

    let type = null;

    if(checkoutPressed){
        type = (
            <CheckoutComponent />
        )
    }else{
        type =  (
            <div>
                <div className= "market-prod-cart">
                    <Row>
                        <Col xs="2">
                          <h4>Product</h4>
                        </Col>
    
                        <Col xs="2">
                          <h4>Name</h4>
                        </Col>
    
                        <Col xs="2">
                          <h4>Store</h4>
                        </Col>
    
                        <Col xs="2">
                            <h4>Price</h4>
                        </Col>
    
                        <Col xs="2">
                            <h4>Quantity</h4>
                        </Col>
    
                        <Col xs="1">
                            <h4>Total</h4>
                        </Col>
    
                        <Col xs="1">
                           
                        </Col>
                    </Row>
                </div>
    
                <div className="products_div market-prod-cart">
                    <div className="cart-item-div">
                    <Row>
                        <Col xs="2">
                            <div className="product-item-cart">
                            <Card onClick={this.navdetail}>
                                <CardImg top width="50%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                            </Card>
                            </div>
                        </Col>
    
                        <Col xs="2">
                            <h6>Bid Bud</h6>
                        </Col>
    
                        <Col xs="2">
                            <h6>Canninven</h6>
                        </Col>
    
                        <Col xs="2">
                            <h6>$100</h6>
                        </Col>
    
                        <Col xs="2">
                            <h6>1</h6>
                        </Col>
    
                        <Col xs="1">
                            <h6>$100</h6>
                        </Col>
    
                        <Col xs="1">
                            <Tooltip title="Delete"><IconButton onClick={() => this.deleteProduct("1")}> <DeleteIcon /> </IconButton></Tooltip>
                        </Col>
                    </Row>
                </div>
    
                <div className="cart-item-div">
                    <Row>
                        <Col xs="2">
                            <div className="product-item-cart">
                            <Card onClick={this.navdetail}>
                                <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                            </Card>
                            </div>
                        </Col>
    
                        <Col xs="2">
                            <h6>Bid Bud</h6>
                        </Col>
    
                        <Col xs="2">
                            <h6>Canninven</h6>
                        </Col>
    
                        <Col xs="2">
                            <h6>$100</h6>
                        </Col>
    
                        <Col xs="2">
                            <h6>1</h6>
                        </Col>
    
                        <Col xs="1">
                            <h6>$100</h6>
                        </Col>
    
                        <Col xs="1">
                            <div><Tooltip title="Delete"><IconButton onClick={() => this.deleteProduct("1")}> <DeleteIcon /> </IconButton></Tooltip></div></Col>
                    </Row>
                </div>
                </div>
    
                <div onClick={this.navcheckout}>
                   <CheckoutButton/>
                </div>
               
            </div>
        );
    }
    return type;
  }
}
export default withTranslation('common')(MarketPlaceCart);
