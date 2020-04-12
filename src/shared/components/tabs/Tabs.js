import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { Tab, Nav } from 'react-bootstrap';

const defaultState = {}

class TabsContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    render = () => {

        const { items } = this.props;
        const filteredItems = items.filter(item => item.disabled !== true);

        return (
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="item-0">
                    <Row>
                        <Col md={2}>
                            <Nav variant="pills" className="flex-column">
                                {filteredItems.map( (item, index) => {
                                    return (
                                        <Row>
                                            <Col md={12} style={{maxWidth: `220px`, minWidth: `190px`}}>
                                                <Nav.Item key={index}>
                                                    <Nav.Link eventKey={`item-${index}`}>
                                                        {item.icon} &nbsp; {item.title}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Nav>
                        </Col>
                        <Col md={10}>
                            <Tab.Content>
                                {filteredItems.map( (item, index) => {
                                    return (
                                        <Tab.Pane eventKey={`item-${index}`} key={index}>
                                            {item.container}
                                        </Tab.Pane>
                                    )
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
          </div>
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

