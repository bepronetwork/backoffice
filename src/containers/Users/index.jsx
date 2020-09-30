import React from 'react';
import Fade from '@material-ui/core/Fade';
import { connect } from "react-redux";
import { Col, Container, Row } from 'reactstrap';
import { setUserView } from '../../redux/actions/userView';
import store from '../App/store';
import DataWidget from '../DataWidget/DataWidget';
import UsersBalance from './components/UsersBalance';
import UsersProfile from './components/UsersProfile';
import UsersProfit from './components/UsersProfit';
import UsersResumeEntries from './components/UsersResumeEntries';
import UsersTable from './components/UsersTable';
import VectorMap from './components/VectorMap';

import _ from 'lodash';

class UsersContainer extends React.Component{

    constructor(props){
        super(props)
    }


    goToUserPage = async ({user}) => {
        /* Set User to Redux */
        await store.dispatch(setUserView(user));
        /* Go To User Page */
        this.props.history.push({pathname: '/users/user', state: { userId: user._id }});
    }

    render = () => {

        const { isLoading, profile } = this.props;
        
        const revenue = profile.getApp().getSummaryData('revenue');
        const wallet = profile.getApp().getSummaryData('wallet');
        const users = profile.getApp().getSummaryData('users');

        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
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
                        { !_.isNull(users.data) && wallet && revenue && (
                            <Col lg={3}>
                                <DataWidget>
                                    <UsersProfit isLoading={isLoading} data={{
                                        users : users,
                                        wallet : wallet,
                                        revenue : revenue
                                    }}/>
                                </DataWidget>
                            </Col>
                        )}

                        { !_.isNull(users.data) && wallet && revenue && (
                            <Col lg={3}>
                                <DataWidget>
                                    <UsersBalance isLoading={isLoading} data={{
                                        users : users,
                                        wallet : wallet,
                                        revenue : revenue
                                    }}/>
                                </DataWidget>
                            </Col> 
                        )}
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <DataWidget>
                                <UsersTable 
                                    goToUserPage={this.goToUserPage}
                                    isLoading={isLoading}
                                    data={{
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
            </Fade>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps)(UsersContainer);

