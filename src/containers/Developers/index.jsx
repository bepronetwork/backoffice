import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import DocsContainer from './components/DocsContainer';
import BearerTokenTableApiKeys from './components/BearerTokenTableApiKeys';
const Ava = `${process.env.PUBLIC_URL}/img/astronaur.png`;



class DevelopersContainer extends React.Component{

    constructor(props){
        super(props)
    }

    generateBearerToken = async () => {
        try{
            let res = await this.props.profile.getApp().createBearerToken();
            console.log(res)

            let {
                message,
                status
            } = res.data;
            
            if(parseInt(status) != 200){ throw new Error(message.message)}
        }catch(err){
            this.props.showNotification(err.message);
        }
    }

    render = () => {
        return (
            
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <DocsContainer/>           
                    </Col>  
                </Row>
                <Row>
                    <Col lg={12}>
                        <BearerTokenTableApiKeys generateBearerToken={this.generateBearerToken} data={this.props.profile.getApp().getBearerToken()}/>           
                    </Col>  
                </Row>
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

DevelopersContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DevelopersContainer);

