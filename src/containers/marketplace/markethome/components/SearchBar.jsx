/* eslint-disable */
import React, { PureComponent } from 'react';
import SearchIcon from 'mdi-react/SearchIcon';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { withTranslation } from 'react-i18next';

class SearchBar extends PureComponent {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
        return (
            <div className="top-search-div-market">
            <InputGroup className="top-search-market">
                <Input placeholder="Search Products..." />
                <InputGroupAddon addonType="prepend">
                <InputGroupText>
                   <SearchIcon />
                </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <br />
        </div>
    )};

}

export default withTranslation('common')(SearchBar);