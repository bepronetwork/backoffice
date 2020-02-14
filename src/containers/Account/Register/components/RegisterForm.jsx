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
        this.token = (document.location.href.split("=")[1]!==undefined) ? document.location.href.split("=")[1] : null;
        console.log(this.token);
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
            this.setState({...this.state, isLoading : true})
            let account = new Account(this.state);
            await account.register(this.token);
            if(!this.token) {
                this.props.history.push('/initial');
            } else {
                this.props.history.push('/login');
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
            <h3 className="account__title" style={{marginBottom : '20%'}}>Register
							</h3>
                <TextInput
                    icon={CheckboxMultipleBlankCircleIcon}
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="James2345"
                    changeContent={this.changeContent}
                />
                 <TextInput
                    icon={AccountIcon}
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="James"
                    changeContent={this.changeContent}
                />
                <TextInput
                    icon={MailRuIcon}
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="example@email.com"
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
