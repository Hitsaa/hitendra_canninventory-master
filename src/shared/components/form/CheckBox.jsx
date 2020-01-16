/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable */
import React, { PureComponent } from 'react';
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class CheckBoxField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
    label: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    defaultChecked: false,
    disabled: false,
    className: '',
    color: '',
  };

  constructor(props){
    super(props);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
}

  componentDidMount() {
    const { onChange, defaultChecked } = this.props;
   // onChange(defaultChecked);
  }

  onCheckboxChange(event){
    const { label, name, onChange } = this.props;
    let ischecked = event.target.checked;
    onChange(ischecked);
  }

  postTos(){
    // const email = this.inputEmail.value;
    // const password = this.inputPassword.value;
    // if (email && password) {
    // // eslint-disable-next-line no-console
    //   const bodyFormData = new FormData();
    //   bodyFormData.append('email', email);
    //   bodyFormData.append('password', password);

    //   const urls = `${process.env.AUTH_ENDPOINT}/login`;
    //   axios({
    //     method: 'post',
    //     url: urls,
    //     data: bodyFormData,
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   }).then((response) => {
    //     if (!response.data.error) {
    //       console.log(response.data);
    //     } else {
    //       this.setState({
    //         error: true,
    //         msg: response.data.message,
    //       });
    //     }
    //   }).catch((error) => {
    //   });
    // }
  }

  render() {
    const {
      disabled, className, name, value, onChange, label, color,
    } = this.props;
    const CheckboxClass = classNames({
      'checkbox-btn': true,
      disabled,
    });

    return (
      <label
        className={`${CheckboxClass} ${className ? ` checkbox-btn--${className}` : ''}`}
        htmlFor={name}
      >
        <input
          className="checkbox-btn__checkbox"
          type="checkbox"
          id={name}
          name={name}
          onChange={onChange}
          onClick= {this.onCheckboxChange}
          checked={value}
          disabled={disabled}
        />
        <span
          className="checkbox-btn__checkbox-custom"
          style={color ? { background: color, borderColor: color } : {}}
        >
          <CheckIcon />
        </span>
        {className === 'button'
          ? (
            <span className="checkbox-btn__label-svg">
              <CheckIcon className="checkbox-btn__label-check" />
              <CloseIcon className="checkbox-btn__label-uncheck" />
            </span>
          ) : ''}
        <span className="checkbox-btn__label">
          {label}
        </span>
      </label>
    );
  }
}

const renderCheckBoxField = (props) => {
  const {
    input, label, defaultChecked, disabled, className, color
  } = props;
  return (
    <CheckBoxField
      {...input}
      label={label}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={className}
      onChange={input.onChange}
      color={color}
    />
  );
};

renderCheckBoxField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }).isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string
};

renderCheckBoxField.defaultProps = {
  label: '',
  defaultChecked: false,
  disabled: false,
  className: '',
  color: '',
};

export default renderCheckBoxField;
