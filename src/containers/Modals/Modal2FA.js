import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import ModalContainer from './ModalContainer';
import store from '../App/store';
import { set2FA } from '../../redux/actions/set2FA';
import Security2FASingleton from '../../services/security/2FA';
import  QRCode from 'qrcode.react';
import StepWizard from 'react-step-wizard';
import { throwUIError } from '../../lib/errors';
import Input2FA from '../Inputs/Input2FA';

const defaultState = {
    auth_2fa : {},
    SW : {}
}

class Modal2FA extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    async closeModal(success=false){
        await store.dispatch(set2FA({isActive : false, success}));
    }
    
    projectData = async (props) => {
        const { profile } = props;

        if(!profile || _.isEmpty(profile)){return}
        if(!profile.getUserInfo()){return}
        let auth_2fa = this.state.auth_2fa;

        let params = profile.getUserInfo();
        if(_.isEmpty(this.state.auth_2fa)){
            let res = Security2FASingleton.generateSecret2FA({name : 'BetProtocol', account_id : params.id});
            auth_2fa = {
                uri : decodeURIComponent(res.uri),
                secret : res.secret
            }
        }
        this.setState({...this.state,
            auth_2fa,
        })     
    }

    setInstance = SW => this.setState({ ...this.state, SW });

    confirm = async ({token}) => {
        const { secret, uri } = this.state.auth_2fa;
        const { profile } = this.props;
        try{
            this.setState({...this.state, isLoading : true})
            // Confirm it is verified Locally
            let verified = Security2FASingleton.isVerifiedToken2FA({secret, token});
            if(!verified){return throwUIError('Token is Wrong')}
            // Send confirmation to Server Side
            let res = await profile.set2FA({
                secret,
                token
            })
            console.log(res);
            this.setState({...this.state, isLoading : false})
            this.closeModal(true);
        }catch(err){
            console.log(err);
            this.setState({...this.state, isLoading : false})
            throwUIError(err);
        }
    }

    render = () => {
        const { isActive, isLoading } = this.props.set2FA;
        const { auth_2fa, SW } = this.state;
        if(!isActive){return null};
        let { secret, uri } = auth_2fa;        
        return (
            <ModalContainer onClose={this.closeModal} title={'2FA Authentication'}>
                <StepWizard
                    instance={this.setInstance}
                >
                    <FirstPage uri={uri} SW={SW}/>
                    <Input2FA isLoading={isLoading} secret={secret} SW={SW} confirm={this.confirm}/>
                </StepWizard>
            </ModalContainer>
        )
    }

}

class FirstPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <Container className="dashboard">
                <QRCode value={this.props.uri} />
                <h5 style={{marginTop : 20}}>Install Google Authenticator and Scan the Above QR Code</h5>
                <div style={{marginTop : 20}}>
                    <Button color="primary" type="submit" onClick={this.props.SW.nextStep}>
                        Next
                    </Button>
                </div>
             
            </Container>
        )
    }
}



function mapStateToProps(state){
    return {
        profile: state.profile,
        set2FA : state.set2FA
    };
}

Modal2FA.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(Modal2FA);

