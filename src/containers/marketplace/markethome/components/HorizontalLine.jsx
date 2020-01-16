/* eslint-disable */
import React, { PureComponent } from 'react';

import { withTranslation } from 'react-i18next';

class ColoredLine extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
            return (
                <hr className='horizontal_line' />
            )
    }

}

export default withTranslation('common')(ColoredLine);