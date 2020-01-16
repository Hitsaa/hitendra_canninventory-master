/* eslint-disable */
import React, { Component } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


Modal.setAppElement(document.getElementById('root'));

class Product extends Component {
  static propTypes = {
    product: PropTypes.element.isRequired,
    onAddToCart: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      dropdownOpen: false,
      wtype: '',
      weight: '',
      checkedItems: new Map(),
      sn: this.props.product.serials,
      modalIsOpen: false,
      addTocartBtn: false,
      checkedPlants: '',
      serials: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // if (this.props.product.isPlant) {
    //   this.state.addTocartBtn = true;
    // }
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    console.log('isChe',isChecked);
    console.log('itemz',item);
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    let sns = this.state.serials;
    if(isChecked){
      console.log('hey it is true');
      
      if(sns.includes(item)){
        //Do Nothing
      }else{
        sns.push({item});
        this.state.serials = sns;
        console.log('sns',sns);
      }
    }else{
      // delete sns[item];
      for(var i = 0; i < sns.length; i++) {
        if(sns[i].item == item) {
            sns.splice(i, 1);
            break;
        }
    }
      this.state.serials = sns;
    }
    //Not necessary start -- delete in future
    console.log('checked items are:-', this.state.checkedItems);
    let checkedItms = this.state.checkedItems;
    let data = this.state.sn;
    console.log('lengfht',data.length);
    let checked = [];
    for (let i = 0; i < data.length; i += 1) {
      console.log('data', data[i]);
      console.log('che', checkedItms);
      const status = checkedItms.get(data[i].serial);
      console.log('key',status);
      if (checkedItms.has(data[i].serial) && status == true) {
        console.log('item', checkedItms);
        checked.push({
          serial:data[i].serial
        });

      }
    }
    //Not necessary end delete in future -- maybe
    console.log('final serials',this.state.serials);
    this.state.checkedPlants = checked;
    // if (this.state.checkedPlants.length == 0) {
    //   this.state.addTocartBtn = true;
    // }
    console.log('hey', this.state.checkedPlants);

  }


  setCount = (operator) => {
    const { count } = this.state;
    console.log(operator, Number.isInteger(parseInt(operator)));
    if (operator === 'dec' && count > 0) {
      this.setState({ count: count - 1 });
    } else if (operator === 'inc') {
      this.setState({ count: count + 1 });
    } else if (operator === '') {
      this.setState({ count: 0 });
    } else if (Number.isInteger(parseInt(operator))) {
      this.setState({ count: parseInt(operator) });
    }
  }

  setWeight = (operator) => {
    const enteredWeight = operator.replace(/^0+/, '');
    if (enteredWeight === '') {
      this.setState({ weight: 0 });
    } else {
      this.setState({ weight: enteredWeight });
    }
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { count, weight, wtype } = this.state;
    const { serials, sn, addTocartBtn } = this.state;
    const { product } = this.props;
    console.log('pr', product);
    return (
      <div className="shelf-item">
        <div className="shelf-item__thumb">
          <img src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt={product.alt} title={product.Title} />
        </div>
        <p className="shelf-item__title">{product.name}</p>
        <div className="shelf-item__price">
          <div className="val">
            <small>$</small>
            <b>{product.price}
            </b>
            {product.weight_type === 'OUNCES' && '/oz'}
            {product.weight_type === 'POUNDS' && '/lb'}
            {product.weight_type === 'GRAMS' && '/G'}
            {product.weight_type === 'FLUID_OUNCES' && '/FO'}
            {product.weight_type === 'MILILITRES' && '/ml'}
            {product.weight_type === 'MILIGRAMS' && '/mg'}
            {/* {product.weight_type === 'UNIT' && '/u'} */}
            {/* <span>25</span> */}
          </div>
        </div>

        {(!product.isPlant) ?
          <div>
            <small>Weight</small>
            <Input min={0} type="number" step="1" placeholder="1" value={weight} onChange={e => this.setWeight(e.target.value)} />
          </div>
          : <div>
            <small>Weight</small>
            <Input min={0} type="text" step="1" disabled placeholder="N/A" value='N/A' />
          </div>
        }
        {(!product.isPlant) ?
          <div className="quantity-box">
            <small>Quantity</small>
            <InputGroup className="input-box">
              <InputGroupAddon addonType="prepend">
                <Button onClick={() => this.setCount('dec')}>-</Button>
              </InputGroupAddon>
              <Input value={count} placeholder="1" onChange={e => this.setCount(e.target.value)} />
              <InputGroupAddon addonType="prepend">
                <Button className="quantity-handeler" onClick={() => this.setCount('inc')}>+</Button>
              </InputGroupAddon>
            </InputGroup>

            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.wtype !== '' ? this.state.wtype : 'Weight Type'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => { this.setState({ wtype: 'OUNCES' }); }}>OUNCES</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ wtype: 'POUNDS' }); }}>POUNDS</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ wtype: 'GRAMS' }); }}>GRAMS</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ wtype: 'FLUID_OUNCES' }); }}>FLUID OUNCES</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ wtype: 'MILLILITRES' }); }}>MILILITRES</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ wtype: 'MILLIGRAMS' }); }}>MILIGRAMS</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          : <div className="quantity-box">
            <small>Quantity</small>
            <InputGroup className="input-box">
              <InputGroupAddon addonType="prepend">
                <Button onClick={() => this.setCount('dec')}>-</Button>
              </InputGroupAddon>
              <Input value={count} placeholder="1" onChange={e => this.setCount(e.target.value)} />
              <InputGroupAddon addonType="prepend">
                <Button className="quantity-handeler">+</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

        }
        {(product.isPlant) ?
          <div>

            <div>
              <Button color="primary" className="btn-block" onClick={this.openModal}>Select Products</Button>
            </div>
            <div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h4 ref={subtitle => this.subtitle = subtitle}>Select Products#SN</h4>
                <div>
                  {(sn && sn.length > 0) ?
                    sn.map(item => (
                      <ul>
                        <li key={item.key}>
                          <label>
                            <Checkbox name={item.serial} checked={this.state.checkedItems.get(item.serial)} onChange={this.handleChange} />
                          </label>&nbsp;&nbsp;<span>{item.serial}</span>

                        </li>

                      </ul>
                    ))
                    : null
                  }
                </div>
                <Button color="danger" className="btn-block" onClick={this.closeModal}>close</Button>
              </Modal>
            </div>
          </div>
          : null
        }
        <Button color="primary" disabled={addTocartBtn} onClick={() => { this.props.onAddToCart(product, count, wtype, weight, serials); }}>
          Add to cart
        </Button>
      </div>
    );
  }
}

export default Product;
