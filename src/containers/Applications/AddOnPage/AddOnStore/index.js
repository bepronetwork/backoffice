import React from 'react';
import { Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import AddOnStoreContainer from "./AddOn";

class AddOnStorePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            ecosystemAddOns: [],
            appAddOns: []
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { params } = props.profile.App;

        this.setState({ ecosystemAddOns: params.storeAddOn, appAddOns: params.addOn });
    }

    addAddOn = async (url) => {
        const { profile } = this.props;

        await profile.getApp().addAddOn({ url: url });
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
    }

    isAdded = (AddOn) => {
        const { appAddOns } = this.state;

        return !!Object.keys(appAddOns).find(k => AddOn.name.toLowerCase().includes(k.toLowerCase()));
         
    }

    render() {
        const { ecosystemAddOns } = this.state;

        return (
            <div>
                <Row>
                    {ecosystemAddOns.map(addOn => {
                        return (
                            <Col md={4}>
                                <AddOnStoreContainer
                                    addOn={addOn}
                                    isAdded={this.isAdded(addOn)}
                                    addAddOn={this.addAddOn}
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

