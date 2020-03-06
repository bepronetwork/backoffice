import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


const renderTextField = ({
    input, label, meta: { touched, error }, disabled, children, select, type, defaultValue, autoFocus
    }) => {
        return (
            <TextField
                className="material-form__field"
                label={label}
                color={'#ccc'}
                error={touched && error}
                disabled={disabled}
                autoFocus={autoFocus}
                value={defaultValue}
                defaultValue={defaultValue}
                children={children}
                type={type}
                select={select}
                onChange={(e) => {
                    e.preventDefault();
                    input.onChange(e);
                }}
        />
        )
    }
    
    
    renderTextField.propTypes = {
        input: PropTypes.shape().isRequired,
        label: PropTypes.string.isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string,
        }),
        select: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.element),
        
    };
    
    renderTextField.defaultProps = {
            meta: null,
            select: false,
            children: [],
        };
    
class TextInput extends PureComponent {
   
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };

    }

    changeContent = (type, item, index) => {
        if(this.props.changeContent){
            this.props.changeContent(type, item, index)
        }
    }



    render() {
        return (
            <div className="form__form-group-field">
                {this.props.icon ?
                    <div className="form__form-group-icon" style={{marginRight : 10}}>
                        <this.props.icon />
                    </div>
                : null}
                <Field
                    name={this.props.name}
                    label={this.props.label}
                    type={this.props.type}
                    autoFocus={this.props.autoFocus}
                    disabled={this.props.disabled}
                    defaultValue={this.props.defaultValue}
                    component={renderTextField}
                    placeholder={this.props.placeholder}
                    index={this.props.index}
                    onChange={(e) =>  this.changeContent(this.props.name, e.target.value, this.props.index)}/>
            </div>
        );
    }
}

export default reduxForm({
  form: 'new_form', // a unique identifier for this form
})(TextInput);


