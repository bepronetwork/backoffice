import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import UsersProfile from './components/UsersProfile';
import UsersProfit from './components/UsersProfit';
import UsersInfoFilter from './components/UsersInfoFilter';
import UsersResumeEntries from './components/UsersResumeEntries';
import VectorMap from './components/VectorMap';
import DataWidget from '../DataWidget/DataWidget';
import BetsTable from './components/BetsTable';
import UsersTable from './components/UsersTable';

class UsersContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        <DataWidget>
                            <UsersResumeEntries data={this.props.profile.getApp().getSummaryData('usersInfoSummary')}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <UsersProfile data={this.props.profile.getApp().getSummaryData('usersInfoSummary')}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <UsersProfit data={{
                                users : this.props.profile.getApp().getSummaryData('users'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                revenue : this.props.profile.getApp().getSummaryData('revenue')
                            }}/>
                        </DataWidget>
                    </Col>
                   {/* 
                        <Col lg={3}>
                            <UsersInfoFilter/>
                        </Col>
                    */}
                </Row>
                <Row>
                    <Col lg={12}>
                        <DataWidget>
                            <UsersTable data={{
                                    users : this.props.profile.getApp().getSummaryData('usersInfoSummary'),
                                    usersOtherInfo : this.props.profile.getApp().getSummaryData('users'),
                                    wallet : this.props.profile.getApp().getSummaryData('wallet')
                                }}
                            />
                        </DataWidget>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <DataWidget>
                            <VectorMap/>
                        </DataWidget>
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

UsersContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(UsersContainer);

