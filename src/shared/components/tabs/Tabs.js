import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { Tab, Nav } from 'react-bootstrap';


const defaultState = {
    
}

class TabsContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }
    

    render = () => {

        const { items} = this.props;

        return (
            <Container className="dashboard">
                <Tab.Container id="left-tabs-example" defaultActiveKey="item-0">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                {items.map( (item, index) => {
                                    return (
                                        <Nav.Item>
                                            <Nav.Link eventKey={`item-${index}`}>
                                                <Row>
                                                    <Col sm={3}>
                                                        {item.icon}
                                                    </Col>
                                                    <Col sm={9}>
                                                        {item.title}
                                                    </Col>
                                                </Row>
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                })} 
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                {items.map( (item, index) => {

                                    return (
                                        <Tab.Pane eventKey={`item-${index}`}>
                                            {item.container}
                                        </Tab.Pane>
                                       
                                    )
                                })} 
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

TabsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(TabsContainer);

