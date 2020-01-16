import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Breadcrumb extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
        <div>
            <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
                <BreadcrumbItem tag="a" href="#">Data</BreadcrumbItem>
                <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
            </Breadcrumb>
        </div>
    }
};

export default withTranslation('common')(Breadcrumb);