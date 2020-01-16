/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Container,
} from 'reactstrap';

class CostumerSearch extends PureComponent {
  static propTypes = {
    location: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loader: undefined,
      userInfo: undefined,
    };
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    this.setState({ loader: 'LOADED' });
    console.log(this.props.location.state);
    this.setState({ userInfo: this.props.location.state });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <Container>
        {
        userInfo && (<Row><Col sm={6} className="heading-top">Client Name:{' '} {userInfo.data.client.firstName} {' '} {userInfo.data.client.lastName}</Col><Col sm={6} className="text-right heading-top">Client id:{userInfo.data.client_id}</Col></Row>)
      }
      </Container>
    );
  }
}
export default withRouter(CostumerSearch);
