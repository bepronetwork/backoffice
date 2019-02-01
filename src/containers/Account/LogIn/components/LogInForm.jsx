import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import Account from '../../../../controllers/Account';

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
        let account = new Account(this.state);
        await account.login();
        this.props.history.push('/home')
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
                    placeholder="Name"
                    onChange={(e) =>  this.changeContent('username', e.target.value)}/>
            </div>
            </div>
            <div className="form__form-group">
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
            <div className="account__forgot-password">
                <a href="/">Forgot a password?</a>
            </div>
            </div>
            <div className="form__form-group">
            <div className="form__form-group-field">
                <Field
                name="remember_me"
                component={renderCheckBoxField}
                label="Remember me"
                />
            </div>
            </div>
            <div className="account__btns">
            <button className="btn btn-primary account__btn" onClick={ () => this.login() } >Log In</button>
            <Link className="btn btn-outline-primary account__btn" to="/register">Create Account
            </Link>
            </div>
        </form>
        );
    }
    }

export default reduxForm({
    form: 'log_in_form', // a unique identifier for this form
})(LogInForm);
