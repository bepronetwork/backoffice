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
const esports = `${process.env.PUBLIC_URL}/img/landing/sports_small.png`;

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

export const EsportsNotEnable = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > div {
        &.spanGroup {
            display: flex;
            flex-direction: column;

            > span {
                font-size: 17px;
                font-weight: 500;
                color: #814c94;
            }
        }
    }

    > img {
        height: 70px;
        width: 70px;

        margin: 0px 10px;
    }
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
        const { periodicity, isLoading, currency, profile } = this.props;
        const { activeTab } = this.state;

        if (!currency) {return null}

        const app = profile.getApp();
        const hasEsports = app.hasEsportsPermission();

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
                              { hasEsports ? <EsportsBetsTable/> : <EsportsNotEnable>
                                <img src={esports} alt="esports"/>
                                <div className="spanGroup">
                                    <span>Esports is not enabled</span>
                                    <span>Contact the sales team to activate Esports</span>
                                </div>
                            </EsportsNotEnable> }
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

