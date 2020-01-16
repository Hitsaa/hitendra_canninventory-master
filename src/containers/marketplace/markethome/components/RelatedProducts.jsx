/* eslint-disable */
import React, { PureComponent } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody, CardDeck } from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import DemoImage from '../../../../img/12.png';

class RelatedProducts extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className="related-container">
        <CardDeck>
            <Card>
            <CardBody>
                <CardTitle>Concentrate</CardTitle>
                <CardSubtitle>Flowring-Celementine</CardSubtitle>
            </CardBody>
            <CardImg top width="20%" src={DemoImage} alt="Card image cap" />
            <CardBody className='product-price-body'>
                <h2 className="product-price">$200</h2>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
                <CardTitle>Concentrate</CardTitle>
                <CardSubtitle>Flowring-Celementine</CardSubtitle>
            </CardBody>
            <CardImg top width="20%" src={DemoImage} alt="Card image cap" />
            <CardBody className='product-price-body'>
                <h2 className="product-price">$200</h2>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
                <CardTitle>Concentrate</CardTitle>
                <CardSubtitle>Flowring-Celementine</CardSubtitle>
            </CardBody>
            <CardImg top width="20%" src={DemoImage} alt="Card image cap" />
            <CardBody className='product-price-body'>
                <h2 className="product-price">$200</h2>
            </CardBody>
            </Card>

            <Card>
            <CardBody>
                <CardTitle>Concentrate</CardTitle>
                <CardSubtitle>Flowring-Celementine</CardSubtitle>
            </CardBody>
            <CardImg top width="20%" src={DemoImage} alt="Card image cap" />
            <CardBody className='product-price-body'>
                <h2 className="product-price">$200</h2>
            </CardBody>
            </Card>

            <Card>
            <CardBody>
                <CardTitle>Concentrate</CardTitle>
                <CardSubtitle>Flowring-Celementine</CardSubtitle>
            </CardBody>
            <CardImg top width="20%" src={DemoImage} alt="Card image cap" />
            <CardBody className='product-price-body'>
                <h2 className="product-price">$200</h2>
            </CardBody>
            </Card>
        </CardDeck>
      </div>
    );
  }
}
export default withTranslation('common')(RelatedProducts);