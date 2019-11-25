import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import store from '../App/store';
import ModalUserAffiliateCustom from './ModalUserAffiliateCustom';
import { MODAL_TYPES, closeModal } from '../../redux/actions/modal';

const defaultState = {
    auth_2fa : {},
    SW : {}
}

class AbstractModal extends React.Component{

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
        await store.dispatch(closeModal({success}));
    }
    
    projectData = async (props) => {
        const { profile } = props;
    }


    render = () => {
        const { isActive, MODAL_TYPE } = this.props.modal;
        
        if(!isActive){return null};

        switch(MODAL_TYPE){
            case MODAL_TYPES.USER_AFFILIATE_EDIT : {
                return <ModalUserAffiliateCustom closeModal={this.closeModal} />
            };
        }
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        modal : state.modal
    };
}

export default connect(mapStateToProps)(AbstractModal);

