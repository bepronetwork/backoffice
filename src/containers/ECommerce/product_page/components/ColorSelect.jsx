/* eslint-disable react/no-multi-comp,jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectOption extends PureComponent {
  static propTypes = {
    option: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      color: PropTypes.string,
    }).isRequired,
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    isFocused: false,
    onFocus: false,
    onSelect: false,
  };

  handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };

  handleMouseEnter = (event) => {
    this.props.onFocus(this.props.option, event);
  };

  handleMouseMove = (event) => {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  };

  render() {
    return (
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.label}
      >
        {this.props.children}
        <span
          className="form__form-group-select-color"
          style={{ backgroundColor: this.props.option.color }}
        />
      </div>
    );
  }
}

const SelectValue = ({ value, children }) => (
  <div className="Select-value" title={value.title}>
    <p>{children}</p>
    <span
      className="form__form-group-select-color"
      style={{ backgroundColor: value.color }}
    />
  </div>
);

SelectValue.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  children: PropTypes.string.isRequired,
};

export default class ColorSelect extends PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      color: PropTypes.string,
    })),
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    options: null,
    placeholder: 'Select...',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ value: selectedOption });
  };

  render() {
    const { options, placeholder } = this.props;

    return (
      <Select
        value={this.state.value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        className="form__form-group-select"
        placeholder={placeholder}
        optionComponent={SelectOption}
        valueComponent={SelectValue}
      />
    );
  }
}
