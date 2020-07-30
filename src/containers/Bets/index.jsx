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


class BetsContainer extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {

        const { periodicity, isLoading, currency } = this.props;

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
                        <BetsTable
                                data={{
                                    bets: this.props.profile.getApp().getAllBets({ filters: {}})
                                }}
                            />
                    </Col>
                </Row>
                </Container>
            </Fade>
        )
    }

}



function mapStateToProps(state){
    console.log(state)
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

