import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import BetsTable from './components/BetsTable';
import BetsProfile from './components/BetsProfile';
import _ from 'lodash';
import Won from './components/Won';
import AverageBet from './components/AverageBet';
import AverageReturn from './components/AverageReturn';


class BetsContainer extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {

        const { periodicity, isLoading, currency } = this.props;

        if (!currency) {return null}

        return (
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
                        <BetsTable
                                data={{
                                    bets: this.props.profile.getApp().getAllBets({ filters: {}})
                                }}
                            />
                    </Col>
                </Row>
                
          </Container>
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

