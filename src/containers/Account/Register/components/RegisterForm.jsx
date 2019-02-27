import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MailRuIcon from 'mdi-react/MailRuIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Account from '../../../../controllers/Account';

class RegisterForm extends PureComponent {
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

    register = async () => {
        try{
            let account = new Account(this.state);
            await account.register();
            this.props.history.push('/initial')
        }catch(err){
            this.props.showNotification(err.message);
        }
    }


    render() {
        const { handleSubmit } = this.props;

        return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
            <span className="form__form-group-label">Username</span>
            <div className="form__form-group-field">
                <div className="form__form-group-icon">
                <AccountOutlineIcon />
                </div>
                <Field
                name="username"
                component="input"
                type="text"
                placeholder="Username"
                onChange={(e) =>  this.changeContent('username', e.target.value)}/>
            </div>
            </div>
            <div className="form__form-group">
            <span className="form__form-group-label">Name</span>
            <div className="form__form-group-field">
                <div className="form__form-group-icon">
                <AccountOutlineIcon />
                </div>
                <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
                onChange={(e) =>  this.changeContent('name', e.target.value)}/>
            </div>
            </div>
            <div className="form__form-group">
            <span className="form__form-group-label">E-mail</span>
            <div className="form__form-group-field">
                <div className="form__form-group-icon">
                <MailRuIcon />
                </div>
                <Field
                name="email"
                component="input"
                type="email"
                placeholder="example@mail.com"
                onChange={(e) =>  this.changeContent('email', e.target.value)}/>
            </div>
            </div>
            <div className="form__form-group form__form-group--forgot">
            <span className="form__form-group-label">Password</span>
            <div className="form__form-group-field">
                <div className="form__form-group-icon">
                <KeyVariantIcon />
                </div>
                <Field
                name="password"
                component="input"
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={(e) =>  this.changeContent('password', e.target.value)}/>
                <button
                className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                onClick={e => this.showPassword(e)}
                ><EyeIcon />
                </button>
            </div>
            </div>
            <div className="account__btns">
            <button   onClick={ () => this.register() }className="btn btn-primary account__btn" to="/dashboard_default">Sign Up</button>
            </div>
        </form>
        );
    }
}

export default reduxForm({
  form: 'register_form', // a unique identifier for this form
})(RegisterForm);
