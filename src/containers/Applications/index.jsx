import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import GamesContainer from './components/GamesContainer';
import DataWidget from '../DataWidget/DataWidget';


class ApplicationsContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        console.log(this.props)
        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <DataWidget>
                            <GamesContainer data={this.props.profile.getApp().getSummaryData('games')}/>
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

ApplicationsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(ApplicationsContainer);

