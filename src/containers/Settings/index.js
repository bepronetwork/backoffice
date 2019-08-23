import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import SettingsBox from './components/SettingsBox';
import { ArrowExpandDownIcon, EmergencyExitIcon, OpenInAppIcon } from 'mdi-react';
import { Tab, Nav, Sonnet } from 'react-bootstrap';
import { SettingsRiskContainer , SettingsAccountContainer, SettingsTransactionContainer } from './tabs';


const defaultState = {
    
}

class SettingsContainer extends React.Component{

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
       
    }


    render = () => {

        return (
            <Container className="dashboard">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Account</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Transaction Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Risk Management</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <SettingsAccountContainer/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <SettingsTransactionContainer/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <SettingsRiskContainer/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

SettingsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(SettingsContainer);

