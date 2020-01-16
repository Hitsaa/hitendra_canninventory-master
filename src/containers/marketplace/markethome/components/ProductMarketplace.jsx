/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  Card, 
  Button, 
  CardImg, 
  CardTitle, 
  CardText, 
  CardDeck,
  CardSubtitle,   
  CardBody, 
  Container, 
  Row,
  Col,
  Label
} from 'reactstrap';

import { withTranslation } from 'react-i18next';
import Breadcrumbs from './Breadcrumbs';
import SearchBar from './SearchBar';
import BuisinessTitle from './BuisinessTitle';
import Banner from './Banner';
import DetailContent from './DetailContent';
import DetailImage from './DetailImage';
import HorizontalLine from './HorizontalLine';
import BuisinessImage from '../../../../img/buisiness_img.jpg';
import ProductDetailTabs from './ProductDetailTabs';
import RelatedProducts from './RelatedProducts';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import MarketPlaceCart from './MarketPlaceCart';
class ProductMarketplace extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        navdetail: false,
        cart: false
      };
      this.navdetail = this.navdetail.bind(this);
      this.navcart      = this.navcart.bind(this);
    }

    navdetail() {
        this.setState({ navdetail: !this.state.navdetail });
    }

    navcart(){
      this.setState({ cart: !this.state.cart});
    }

    render() {

        const {
            navdetail,
            cart
          } = this.state;

        let type = null;

        if (navdetail) {
            type = (
                <Container className="dashboard">
                        <Breadcrumbs /> 
                        <Row>
                        <div className="products_div">
                            <div className="shelf-container-market">
                                <div className="shelf-img" >
                                    <DetailImage />
                                </div>
                                <div className="shelf-detail">
                                  <div className="market-pro-detail-cont">
                                    <div className="row-prod-cat-market"> <Row> <Label>Concentrate, </Label> <Label>Consentrates, </Label> <Label>Consentrates</Label></Row> </div>
                                    <div className="row-prod-title-market"> <Row> <Label>Jeck Herer, Hash Roshin </Label></Row> </div>
                                    <div className="row-prod-cat-market"> <Row> <Label className="row-avail">Availability: </Label> <Label className="row-prod-cat-avail"> 44 In Stock </Label> </Row> </div>
                                    <HorizontalLine />
                                  </div>  
                                  
                                  <div className="market-detail-bisiness">
                                    <Card>
                                        <Row>
                                            <Col xs="3">
                                                <img  src={BuisinessImage} />
                                            </Col>

                                            <Col xs="9">
                                              <Label className="market-detail-cat">Store</Label> <br/>
                                              <Label className="market-detail-buisiness-title"> Gaston Fine Extracts, LLC </Label>
                                               
                                            </Col>
                                        </Row>
                                    </Card>
                                  </div>
                                  
                                  <h2><span> $20.00</span></h2>
                                  <button>Add To Cart</button> <br/>
                                  <Row>
                                    <Col xs="6">
                                      <Label className='shipped-message'>Item will be shipped in 3-5 business day</Label>
                                    </Col>

                                    <Col xs="6">
                                       <button>Ask a question</button>
                                    </Col>

                                  </Row>
                                </div>
                            </div>
                            </div>
                            </Row>
                          <Row className="tabs-row">
                              <ProductDetailTabs />
                          </Row>

                          <Row>
                             <Label className="related-title-label">Related Products</Label>
                          </Row>

                          <RelatedProducts />

                </Container>
            );
          }else if(cart){
            type = (  
                <MarketPlaceCart />
            );
          }else{
            type = (
                <Container className="dashboard">
                 <Row>
                  <Col xs="10">
                      <SearchBar />
                  </Col>
                  <Col xs="2">
                    <div className='market-icon-cart' onClick={this.navcart}>
                      <Tooltip  title="Add"><IconButton ><ShoppingCart  /></IconButton></Tooltip>
                    </div>  
                  </Col>
                </Row>  
               
                <BuisinessTitle />
                <div className="products_div">
                <CardDeck>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>

                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>

                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>
                  <div className="product-item">
                  <Card onClick={this.navdetail}>
                      <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="product_title">White Window</CardTitle>
                      <CardSubtitle>Dry Flower</CardSubtitle>
                      <CardText className="price"> $100 </CardText>
                      </CardBody>
                  </Card>
                  </div>

                {/* <Card>
                    <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                    <CardBody>
                    <CardTitle className="product_title">White Window</CardTitle>
                    <CardSubtitle>Dry Flower</CardSubtitle>
                    <CardText className="price"> $100 </CardText>
                   
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                    <CardBody>
                    <CardTitle className="product_title">White Window</CardTitle>
                    <CardSubtitle>Dry Flower</CardSubtitle>
                    <CardText className="price"> $100 </CardText>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                    <CardBody>
                    <CardTitle className="product_title">White Window</CardTitle>
                    <CardSubtitle>Dry Flower</CardSubtitle>
                    <CardText className="price"> $100 </CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                    <CardBody>
                    <CardTitle className="product_title">White Window</CardTitle>
                    <CardSubtitle>Dry Flower</CardSubtitle>
                    <CardText className="price"> $100 </CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                    <CardBody>
                    <CardTitle className="product_title">White Window</CardTitle>
                    <CardSubtitle>Dry Flower</CardSubtitle>
                    <CardText className="price"> $100 </CardText>
                    </CardBody>
                </Card> */}
                </CardDeck>    
            </div>
            <Banner />
            </Container>
            );
          }

          return type;

        }
}

export default withTranslation('common')(ProductMarketplace);