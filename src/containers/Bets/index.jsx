import React from 'react';
import Fade from '@material-ui/core/Fade';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { Col, Container, Row } from 'reactstrap';
import AverageBet from './components/AverageBet';
import AverageReturn from './components/AverageReturn';
import BetsProfile from './components/BetsProfile';
import BetsTable from './components/BetsTable';
import Won from './components/Won';

import styled from 'styled-components';

import { Tabs } from 'antd';
import EsportsBetsTable from './components/EsportsBetsTable';
import { CasinoWhite, EsportsWhite } from '../../components/Icons';
const { TabPane } = Tabs;

const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Icon = styled.section`
    height: 35px;
    width: 35px;
    filter: ${props => props.isActive ? 'grayscale(0)' : 'grayscale(1)' };
`;


class BetsContainer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            activeTab: 1
        }
    }

    handleChangeTab = tab => {
        this.setState({
            activeTab: parseInt(tab)
        })
    }

    render = () => {
        const { periodicity, isLoading, currency } = this.props;
        const { activeTab } = this.state;

        if (!currency) {return null}

        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
                <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        <BetsProfile periodicity={periodicity} isLoading={isLoading}/>
                    </Col>
                    <Col lg={3}>
                        <Won periodicity={periodicity} isLoading={isLoading}/>
                    </Col>
                    <Col lg={3}>
                        <AverageBet periodicity={periodicity} isLoading={isLoading} currency={currency}/>
                    </Col>
                    <Col lg={3}>
                        <AverageReturn periodicity={periodicity} isLoading={isLoading} currency={currency}/>
                    </Col>
                    <Col lg={12}>
                        <Tabs defaultActiveKey="1" type="card" size="large" style={{ margin: 15 }} onChange={this.handleChangeTab}>
                            <TabPane tab={
                                <TabContainer>
                                    <Icon isActive={activeTab === 1}>
                                        <CasinoWhite />
                                    </Icon>
                                    <span>Casino</span>
                                </TabContainer>
                            } key="1">
                                <BetsTable />
                            </TabPane>
                            <TabPane tab={
                                <TabContainer>
                                    <Icon isActive={activeTab === 2}>
                                        <EsportsWhite/>
                                    </Icon>
                                    <span>Esports</span>
                                </TabContainer>
                            } key="2">
                                <EsportsBetsTable />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                </Container>
            </Fade>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        periodicity: state.periodicity,
        currency: state.currency,
        isLoading: state.isLoading
    };
}

BetsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(BetsContainer);

