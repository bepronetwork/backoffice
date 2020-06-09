import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import {CheckboxMultipleBlankCircleIcon, KeyVariantIcon } from 'mdi-react';
import PropTypes from 'prop-types';
import Account from '../../../../controllers/Account';
import TextField from '@material-ui/core/TextField';
import TextInput from '../../../../shared/components/TextInput';
import _ from 'lodash';
import { FormGroup } from 'reactstrap';
import { EmailInput, InputLabel } from '../styles';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;
const queryString = require('query-string');


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
    
class ResetPasswordForm extends PureComponent {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading : false,
            sent: false
        };
      
    }

    componentDidMount(){
        const parsed = queryString.parse(window.location.search);

        if (!_.isEmpty(parsed)) {
            this.setState({
                adminId: parsed.adminId,
                token: parsed.token
            })
        }
    }
    
    onChangeUsername = value => {
        if (value) {
            this.setState({
                username_or_email: value
            })
        } else {
            this.setState({
                username_or_email: null
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

    onChangeConfirmPassword = value => {
        if (value) {
            this.setState({
                confirmPassword: value
            })
        } else {
            this.setState({
                confirmPassword: null
            })
        }
    }

    sendRecoveryEmail = async () => {
        try{
            this.setState({...this.state, isLoading: true});

            let account = new Account(this.state);

            await account.resetAdminPassword(this.state.username_or_email);

            this.setState({...this.state, isLoading: false, sent: true });

        }catch(err){
            this.props.showNotification(err.message);
        }
    }

    confirmNewAdminPassword = async () => {
        const { token, adminId, password } = this.state;

        try{
            this.setState({...this.state, isLoading: true});

            let account = new Account(this.state);

            const res = await account.confirmResetAdminPassword({ token: token, admin_id: adminId, password: password });

            this.setState({...this.state, isLoading: false });
            
            if (res.data && res.data.status === 200) {
                this.props.history.push("/");
            }

        }catch(err){
            this.props.showNotification(err.message);
        }
    }


    render() {
        const { handleSubmit } = this.props;
        const { username_or_email, sent, adminId, token, password, confirmPassword } = this.state;

        return (
            !_.isEmpty(adminId) && !_.isEmpty(token) ? (
                <form className="form" onSubmit={handleSubmit}>
                <div className="form__form-group">
                    <FormGroup>
                        <InputLabel for="password">Password</InputLabel>
                    <EmailInput
                        label="Password"
                        name="password"
                        type="password"
                        // defaultValue={this.state.username}
                        onChange={(e) => this.onChangePassword(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup>
                        <InputLabel for="confirmPassword"> Confirm Password</InputLabel>
                    <EmailInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        // defaultValue={this.state.username}
                        onChange={(e) => this.onChangeConfirmPassword(e.target.value)}
                    />
                    </FormGroup>
                </div>            
                <div className="account__btns">
                    <button disabled={ password !== confirmPassword || _.isEmpty(password) || this.state.isLoading } onClick={ () => this.confirmNewAdminPassword() }className="btn btn-primary account__btn" to="/"> {
                        !this.state.isLoading ?
                        'Confirm change' 
                        : 
                        <img src={loading} className={'loading_gif'}></img>
                    }
                    </button>
                </div>
            </form>
            ) : (
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__form-group">
                    { !sent ? (
                    <FormGroup>
                        <InputLabel for="username_or_email">Username or E-mail</InputLabel>
                    <EmailInput
                        label="Username or E-mail"
                        name="username_or_email"
                        type="text"
                        // defaultValue={this.state.username}
                        onChange={(e) => this.onChangeUsername(e.target.value)}
                    />
                    </FormGroup>
                    ) : <h5 className="account__title">Sent, please check your inbox</h5> }
                    
                </div>            
                <div className="account__btns">
                    <button disabled={ _.isEmpty(username_or_email) || this.state.isLoading } onClick={ () => this.sendRecoveryEmail() }className="btn btn-primary account__btn"> {
                        !this.state.isLoading ?
                        !sent ? (
                            'Send e-mail'
                        ) : 'Send again' 
                        : 
                        <img src={loading} className={'loading_gif'}></img>
                    }
                    </button>
                </div>
            </form> )
        );
    }
}



export default reduxForm({
  form: 'reset_password_form', // a unique identifier for this form
})(ResetPasswordForm);
