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

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    login = async () => {
        try{
            this.setState({...this.state, isLoading : true})
            let account = new Account(this.state);
            await account.login();
            this.props.history.push('/home')
            this.setState({...this.state, isLoading : false})
        }catch(err){
            this.setState({...this.state, isLoading : false})
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
                    defaultValue={this.state.username}
                    changeContent={this.changeContent}
                />
                <TextInput
                    icon={KeyVariantIcon}
                    name="password"
                    label="Password"
                    type="password"
                    defaultValue={this.state.password}
                    placeholder="**********"
                    changeContent={this.changeContent}
                />
                  <div className="account__forgot-password" >
                <a href="/">Forgot a password?</a>
            </div>    
            </div>
                 
            <div className="account__btns" style={{marginTop  :40}}>
            <button disabled={this.state.isLoading} className="btn btn-primary account__btn" onClick={ () => this.login() } >
                {
                    !this.state.isLoading ?
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
