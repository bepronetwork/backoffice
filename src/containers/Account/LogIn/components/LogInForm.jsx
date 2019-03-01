import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import Account from '../../../../controllers/Account';
import { CheckboxMultipleBlankCircleIcon } from 'mdi-react';
import TextInput from '../../../../shared/components/TextInput';

class LogInForm extends React.Component {
  static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
        showPassword: false,
        };

        this.showPassword = this.showPassword.bind(this);
    }

    showPassword(e) {
        e.preventDefault();
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    login = async () => {
        try{
            let account = new Account(this.state);
            await account.login();
            this.props.history.push('/home')
        }catch(err){
            this.props.showNotification(err.message);
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <TextInput
                    icon={CheckboxMultipleBlankCircleIcon}
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="James2345"
                    changeContent={this.changeContent}
                />
                <TextInput
                    icon={KeyVariantIcon}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="**********"
                    changeContent={this.changeContent}
                />
                  <div className="account__forgot-password" >
                <a href="/">Forgot a password?</a>
            </div>    
            </div>
                 
            <div className="account__btns" style={{marginTop  :40}}>
            <button className="btn btn-primary account__btn" onClick={ () => this.login() } >Log In</button>
            <Link className='btn btn-outline-primary account__btn' to="/register">
               Create Account
            </Link>
            </div>
        </form>
        );
    }
    }

export default reduxForm({
    form: 'log_in_form', // a unique identifier for this form
})(LogInForm);
