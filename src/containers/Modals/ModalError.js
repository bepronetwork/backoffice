import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import store from '../App/store';
import { setMessageNotification } from '../../redux/actions/messageContainer';
import ModalContainer from './ModalContainer';


const defaultState = {
  
}

class ModalError extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }


    async closeModal(){
        await store.dispatch(setMessageNotification({isActive : false}));
    }
  
    render = () => {
        const { isActive, message } = this.props.message;
        if(!isActive){return null};

        return (
            <div style={{zIndex : 100}}>
                <ModalContainer onClose={this.closeModal} title={'Error'}>
                    <Container className="dashboard">
                        <h5 style={{marginTop : 10}}>{message}</h5>
                        <div style={{marginTop : 20}}>
                            <Button color="primary" type="submit" onClick={() => this.closeModal()}>
                                Close
                            </Button>
                        </div>
                    </Container>
                </ModalContainer>
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        message : state.message
    };
}

ModalError.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(ModalError);

