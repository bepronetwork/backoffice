import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { Tab, Nav } from 'react-bootstrap';
import { Bet } from '../../../components/Icons'
import styled from 'styled-components';

const Icon = styled.section`
    padding-top: 3px;
    height: 24px;
    width: 24px;
`;

const Title = styled.span`
    margin-left: 7px;
    font-family: Poppins;
    font-size: 17px;
    color: #a4a1a1;
`;

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
                <Tab.Container id="left-tabs-example" defaultActiveKey={"item-0"}>
                    <Row>
                        <Col md={2} style={{ paddingLeft: 0, backgroundColor: "white", boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.05)", minWidth: 289, borderRadius: "6px", paddingBottom: "30px" }}>
                            <Nav variant="pills" className="flex-column">
                                {filteredItems.map( (item, index) => {
                                    return (
                                        <Row>
                                            <Col md={12} style={{maxWidth: `258px`, minWidth: `190px`}}>
                                                <Nav.Item key={index} style={{ margin: 7 }}>
                                                    <Nav.Link eventKey={`item-${index}`} style={{ width: "258px", height: "45px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            {<Icon>{item.icon}</Icon>} &nbsp; <Title>{item.title}</Title>
                                                        </div>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Nav>
                        </Col>
                        <Col md={9}>
                            <Tab.Content style={{ marginTop: 30 }}>
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

