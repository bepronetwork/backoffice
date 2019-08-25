import ReactCodeInput from 'react-code-input';
import React from 'react';
import { Container, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

class Input2FA extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }
    onChange = (e) => {
        this.setState({...this.state, input : e});
    }

    render = () => {
        return (
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <Container className="dashboard">
                    <ReactCodeInput autoFocus={true} type='number' fields={6} onChange={(e) => this.onChange(e)} />
                    <h5 style={{marginTop : 20, marginBottom : 20}}>Insert the Code that Appears in the Auth App</h5>
                    <div style={{marginTop : 20}}>
                        <Button color="primary" type="submit" onClick={() => this.props.confirm({token : this.state.input})}>
                            {  
                                !this.props.isLoading ?
                                'Confirm'
                                : 
                                <img src={loading} className={'loading_gif'}></img>
                            }
                        </Button>
                    </div>
                </Container>
            </form>
        )
    }
}


export default reduxForm({
    form: '2fa_in_form', // a unique identifier for this form
})(Input2FA);
