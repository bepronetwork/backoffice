import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import EnhancedTable from './components/EnhancedTable';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import TransactionsProfile from './components/TransactionsProfile';
import TransactionsResumeEntries from './components/TransactionsResumeEntries';
import DataWidget from '../DataWidget/DataWidget';
import TransactionsDeposits from './components/TransactionsDeposits';


class TransactionsContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={3}>
                        <DataWidget>
                            <TransactionsResumeEntries/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <TransactionsProfile data={this.props.profile.getApp().getSummaryData('transactions')}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <TransactionsDeposits data={this.props.profile.getApp().getSummaryData('transactions')}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                      
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <DataWidget>
                            <EnhancedTable data={this.props.profile.getApp().getSummaryData('transactions')}/>
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

TransactionsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(TransactionsContainer);

