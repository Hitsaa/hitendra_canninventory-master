/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Customer from './components/varifiedParexian';

class PAREX extends PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
  }

  handleSubmit = () => {
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container className="dashboard">
        <Row>
          <Customer onSubmit={this.handleSubmit} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  newOrder: state.newOrder,
});

export default connect(mapStateToProps)(PAREX);
