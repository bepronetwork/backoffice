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

        const { items} = this.props;

        return (
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="item-0">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {items.map( (item, index) => {
                                    return (
                                        <Row>
                                            <Col sm={12} style={{maxWidth: `220px`, minWidth: `190px`}}>
                                                <Nav.Item key={index}>
                                                    <Nav.Link eventKey={`item-${index}`}>
                                                        {item.icon} {item.title}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Nav>
                        </Col>
                        <p></p>
                        <Col sm={9}>
                            <Tab.Content>
                                {items.map( (item, index) => {
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

