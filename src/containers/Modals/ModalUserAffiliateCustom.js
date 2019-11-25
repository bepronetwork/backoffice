import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import ModalContainer from './ModalContainer';
import { PercentIcon, UserIcon } from 'mdi-react';
import TextInput from '../../shared/components/TextInput';


const defaultState = {

}

class ModalUserAffiliateCustom extends React.Component{

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

    projectData = async (props) => {
        const { profile } = props;
    }

    setCustomAffiliate = async () => {
        const { profile, modal } = this.props;
        const { user } = modal.data;
        const { affiliatePercentage } = this.state;

        await profile.getApp().setCustomAffiliateStructureToUser({
            user : user._id,
            affiliatePercentage : parseFloat(affiliatePercentage/100)
        });      

        await profile.update();
        this.props.closeModal();
    }

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    canSubmit = () => {
        return !((this.state.affiliatePercentage > 0) && (this.state.affiliatePercentage <= 100));
    }

    render = () => {
        const { isActive, data } = this.props.modal;
        const { user } = data;
        const canSubmit = this.canSubmit();
        
        if(!isActive){return null};

        return (
            <ModalContainer onClose={this.props.closeModal} title={'Set Custom User Affiliate'}>
                <Container className="dashboard">
                    <h5 style={{marginTop : 20, marginBottom : 20}}>Change User Affiliate Percentage</h5>
                    <TextInput
                        icon={UserIcon}
                        name="user"
                        label="User Id"
                        type="text"
                        defaultValue={user._id}
                        disabled={true}
                    />
                    <TextInput
                        icon={PercentIcon}
                        name="affiliatePercentage"
                        label="Percentage (%)"
                        type="text"
                        placeholder="10"
                        changeContent={this.changeContent}
                    />
                    <div style={{marginTop : 20}}>
                        <Button onClick={this.setCustomAffiliate} disabled={canSubmit} color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Container>
            </ModalContainer>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        modal : state.modal
    };
}

export default connect(mapStateToProps)(ModalUserAffiliateCustom);

