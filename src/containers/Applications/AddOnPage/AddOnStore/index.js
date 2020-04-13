import React from 'react';
import { Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import AddOnStoreContainer from "./AddOn";


const defaultState = {
    ecosystemAddOns : [
        { 
          name: 'AutoWithdraw',
          description: 'AutoWithdraw for your application',
          image_url: 'https://cdn1.iconfinder.com/data/icons/finance-banking-11/70/withdraw__ATM__cash__money__currency-512.png'
        }
    ]
}

class AddOnStorePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    addOn = async () => {
        const { profile } = this.props;
        await profile.getApp().addAutoWithdraw();
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
    }

    render = () => {
        const { ecosystemAddOns } = this.state;
        const { profile } = this.props;

        const isAdded = profile.getApp().params.addOn.hasOwnProperty('autoWithdraw');

        return (
            <div>
                <Row>
                    {ecosystemAddOns.map(addOn => {
                        return (
                            <Col md={4}>
                                <AddOnStoreContainer
                                    addOn={addOn}
                                    isAdded={isAdded}
                                    onClick={this.addOn}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

AddOnStorePageContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(AddOnStorePageContainer);

