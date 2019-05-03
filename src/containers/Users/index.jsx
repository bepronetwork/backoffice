import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import UsersProfile from './components/UsersProfile';
import UsersProfit from './components/UsersProfit';
import UsersInfo from './components/UsersInfo';
import UsersResumeEntries from './components/UsersResumeEntries';
import VectorMap from './components/VectorMap';
import DataWidget from '../DataWidget/DataWidget';
import BetsTable from './components/BetsTable';


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
                            <UsersResumeEntries/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <UsersProfile data={this.props.profile.getApp().getSummaryData('users')}/>
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
                    <Col lg={3}>
                        <DataWidget>
                            <UsersInfo data={this.props.profile.getApp().getSummaryData('users')}/>
                        </DataWidget>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <DataWidget>
                            <BetsTable
                                data={{
                                    users : this.props.profile.getApp().getSummaryData('users'),
                                    wallet : this.props.profile.getApp().getSummaryData('wallet')
                                }}/>
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

