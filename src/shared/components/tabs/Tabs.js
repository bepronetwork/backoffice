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
import { Grid } from '@material-ui/core';

const Icon = styled.section`
    padding-top: 3px;
    height: 24px;
    width: 24px;
`;

const Title = styled.span`
    margin-left: 7px;
    padding-top: 3px;
    font-family: Poppins;
    font-size: 14px;
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
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Grid item xs style={{ paddingLeft: 0, backgroundColor: "#fafcff", minWidth: 240, maxWidth: 240, borderRadius: "6px", paddingBottom: "30px" }}>
                            <Nav variant="pills" className="flex-column" style={{ borderRight: "solid 1px rgba(164, 161, 161, 0.35)"}}>
                                {filteredItems.map( (item, index) => {
                                    return (
                                        <Grid>
                                            <Grid item style={{maxWidth: `258px`, minWidth: `190px`}}>
                                                <Nav.Item key={index} style={{ margin: 7 }}>
                                                    <Nav.Link eventKey={`item-${index}`} style={{ width: "220px", height: "40px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            {<Icon>{item.icon}</Icon>} &nbsp; <Title>{item.title}</Title>
                                                        </div>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </Nav>
                        </Grid>
                        <Grid item xs>
                            <Tab.Content>
                                {filteredItems.map( (item, index) => {
                                    return (
                                        <Tab.Pane eventKey={`item-${index}`} key={index}>
                                            {item.container}
                                        </Tab.Pane>
                                    )
                                })}
                            </Tab.Content>
                        </Grid>
                    </Grid>
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

