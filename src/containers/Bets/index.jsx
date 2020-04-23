import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import DataWidget from '../DataWidget/DataWidget';
import BetsTable from './components/BetsTable';


class BetsContainer extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {

        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <DataWidget> 
                        <BetsTable
                                data={{
                                    bets: this.props.profile.getApp().getAllBets({ filters: {}})
                                }}
                            />
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

BetsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(BetsContainer);

