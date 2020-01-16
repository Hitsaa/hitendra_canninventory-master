/* eslint-disable */
import React, { PureComponent } from 'react';

import { withTranslation } from 'react-i18next';

import FullLogo from '../../../../img/parax_banner.png';

class Banner extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
            return (
                <div className='image-cont' >
                    <img src= {FullLogo} ></img>
                </div>
            )
    }

}

export default withTranslation('common')(Banner);