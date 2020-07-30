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
import { EmailInput, InputAddOn, InputLabel, PasswordInput } from '../styles';
import { InputGroup, InputGroupText, FormGroup, Label } from 'reactstrap';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

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

    componentDidMount(){
        let {
            username,
            password
        } = this.props.query;
        this.setState({...this.state, username, password})
    }

    showPassword(e) {
        e.preventDefault();
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }


    goTo2FA = () => {
        this.props.SW.nextStep();
    }

    render() {
        const { handleSubmit, onChangeUsername, onChangePassword } = this.props;

        return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <FormGroup>
                    <InputLabel for="username">Username or E-mail</InputLabel>
                <EmailInput
                    label="Username or E-mail"
                    icon={CheckboxMultipleBlankCircleIcon}
                    name="username"
                    type="text"
                    defaultValue={this.state.username}
                    onChange={(e) => onChangeUsername(e.target.value)}
                />
                </FormGroup>
                <br/>
                <FormGroup>
                    <InputLabel for="password">Password</InputLabel>
                <PasswordInput
                    icon={KeyVariantIcon}
                    name="password"
                    label="Password"
                    type="password"
                    defaultValue={this.state.password}
                    onChange={(e) => onChangePassword(e.target.value)}
                />
                </FormGroup>
                  <div className="account__forgot-password" >
                <a href="/password/reset" >Forgot a password?</a>
            </div>    
            </div>
                 
            <div className="account__btns" style={{marginTop  :40}}>
            <button disabled={this.props.isLoading} className="btn btn-primary account__btn" onClick={ () => this.props.login() } >
                {
                    !this.props.isLoading ?
                    'Log In'
                    : 
                    <img src={loading} className={'loading_gif'}></img>
                }
            </button>
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
