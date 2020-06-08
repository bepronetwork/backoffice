import ReactCodeInput from 'react-code-input';
import React from 'react';
import { Container, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

const Message = styled.h5`
    font-family: Poppins;
    font-size: 16px;
`;

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
                <Container className="dashboard" style={{ padding: 0 }}>
                    <ReactCodeInput autoFocus={true} type='number' fields={6} onChange={(e) => this.onChange(e)} />
                    <Message style={{marginTop : 20, marginBottom : 20}}>Insert the Code that Appears in the Auth App</Message>
                    <div style={{marginTop : 20}}>
                        <Button color="primary" type="submit" onClick={() => this.props.confirm({token : this.state.input})} style={{ marginLeft: 0 }}>
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
