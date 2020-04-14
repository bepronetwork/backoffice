/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import AutoWithdraw from './AddOn/AutoWithdraw';
import _ from 'lodash';
const image = `${process.env.PUBLIC_URL}/img/dashboard/empty.png`;

class AddOnContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            autoWithdraw: {}
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {

        const { profile } = props;

        const app = profile.getApp();

        this.setState({...this.state, autoWithdraw: app.params.addOn.autoWithdraw})
    }

    render() {
       const { isLoading, currency } = this.props;
       const { autoWithdraw } = this.state;

        if (_.isEmpty(autoWithdraw)){return null}

        return (
            <Row md={12} xl={12} lg={12} xs={12}>
                <Col lg={4}>
                    <AutoWithdraw autoWithdraw={autoWithdraw} isLoading={isLoading} currency={currency}/>
                </Col>               
            </Row>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        isLoading: state.isLoading,
        currency: state.currency
    };
}

export default connect(mapStateToProps)(AddOnContainer);

