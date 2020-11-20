import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import {CheckboxMultipleBlankCircleIcon, AccountOutlineIcon, AccountIcon} from 'mdi-react';
import MailRuIcon from 'mdi-react/MailRuIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Account from '../../../../controllers/Account';
import TextField from '@material-ui/core/TextField';
import TextInput from '../../../../shared/components/TextInput';
import { FormGroup } from 'reactstrap';
import { InputLabel, EmailInput, PasswordInput } from '../styles';
const queryString = require('query-string');
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;


const renderTextField = ({
    input, label, meta: { touched, error }, children, select, type
    }) => (
    <TextField
        className="material-form__field"
        label={label}
        error={touched && error}
        value={input.value}
        children={children}
        type={type}
        select={select}
        onChange={(e) => {
            e.preventDefault();
            input.onChange(e);
        }}
    />
    );
    
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
    
class RegisterForm extends PureComponent {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            isLoading : false
        };

        this.showPassword = this.showPassword.bind(this);
      
    }

    componentDidMount(){
        const parsed = queryString.parse(window.location.search);
        const queryEmail = parsed ? parsed.email : null;
        
        this.setState({
            token :  parsed ? parsed.token : null,
            queryEmail : queryEmail,
            email : queryEmail
        });
    }

    showPassword(e) {
        e.preventDefault();
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    onChangeUsername = value => {
        if (value) {
            this.setState({
                username: value
            })
        } else {
            this.setState({
                username: null
            })
        }
    }

    onChangeName = value => {
        if (value) {
            this.setState({
                name: value
            })
        } else {
            this.setState({
                name: null
            })
        }
    }

    onChangeEmail = value => {
        if (value) {
            this.setState({
                email: value
            })
        } else {
            this.setState({
                email: null
            })
        }
    }

    onChangePassword = value => {
        if (value) {
            this.setState({
                password: value
            })
        } else {
            this.setState({
                password: null
            })
        }
    }


    register = async () => {
        try{
            this.setState({...this.state, isLoading : true})
            let account = new Account(this.state);
            await account.register(this.state.token);
            if(!this.state.token) {
                this.props.history.push('/initial');
            } else {
                this.props.history.push('/home');
            }
            this.setState({...this.state, isLoading : false})
        }catch(err){
            this.props.showNotification(err.message);
        }
    }


    render() {
        const { handleSubmit } = this.props;

        return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <FormGroup>
                        <InputLabel for="username">Username</InputLabel>
                <EmailInput
                    label="Username"
                    name="username"
                    type="text"
                    // defaultValue={this.state.username}
                    onChange={(e) => this.onChangeUsername(e.target.value)}
                />
                </FormGroup>
                <FormGroup>
                        <InputLabel for="name">Name</InputLabel>
                <EmailInput
                    label="Name"
                    name="name"
                    type="text"
                    // defaultValue={this.state.name}
                    onChange={(e) => this.onChangeName(e.target.value)}
                />
                </FormGroup>
                {/* Admin Registered via email */}
                {!this.state.queryEmail ?
                <FormGroup>
                    <InputLabel for="email">E-mail</InputLabel>
                <EmailInput
                    label="E-mail"
                    name="email"
                    type="text"
                    defaultValue={this.state.queryEmail}
                    onChange={(e) => this.onChangeEmail(e.target.value)}
                />
                </FormGroup>
                : null}
                <FormGroup>
                    <InputLabel for="password">Password</InputLabel>
                <PasswordInput
                    // icon={KeyVariantIcon}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => this.onChangePassword(e.target.value)}
                />
                </FormGroup>
            </div>            
            <div className="account__btns">
                <button onClick={ () => this.register() }className="btn btn-primary account__btn" to="/dashboard_default">                {
                    !this.state.isLoading ?
                    'Sign Up'
                    : 
                    <img src={loading} className={'loading_gif'}></img>
                }
                </button>
            </div>
        </form>
        );
    }
}

export default reduxForm({
  form: 'register_form', // a unique identifier for this form
})(RegisterForm);
