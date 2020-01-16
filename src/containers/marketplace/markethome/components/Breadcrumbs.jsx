/* eslint-disable */
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Breadcrumbs extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
        return (
        <div>
            <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                <BreadcrumbItem tag="a" href="#">Category</BreadcrumbItem>
                <BreadcrumbItem tag="a" href="#">Proeduct</BreadcrumbItem>
            </Breadcrumb>
        </div> )
    }
};

export default withTranslation('common')(Breadcrumbs);