/* eslint-disable */
import React, { PureComponent } from 'react';

import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container
  } from 'reactstrap';

import { withTranslation } from 'react-i18next';

class DetailContent extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
            return (
                <div className="products_div">
                    <CardDeck>
                            <Card onClick={this.navdetail}>
                                    <CardImg top width="100%" src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle className="product_title">White Window</CardTitle>
                                    <CardSubtitle>Dry Flower</CardSubtitle>
                                    <CardText className="price"> $100 </CardText>
                                </CardBody>
                            </Card>
                    </CardDeck>
                </div>
            )
    }

}

export default withTranslation('common')(DetailContent);