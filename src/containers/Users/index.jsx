import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Table from './components/Table';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import UsersProfile from './components/UsersProfile';
import UsersProfit from './components/UsersProfit';
import UsersInfo from './components/UsersInfo';


class UsersContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        
                    </Col>
                    <Col lg={3}>
                        <UsersProfile data={this.props.profile.getApp().getSummaryData('users')}/>
                    </Col>
                    <Col lg={3}>
                        <UsersProfit data={this.props.profile.getApp().getSummaryData('users')}/>
                    </Col>
                    <Col lg={3}>
                        <UsersInfo data={this.props.profile.getApp().getSummaryData('users')}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Table data={this.props.profile.getApp().getSummaryData('users')}/>
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

