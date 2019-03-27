import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';

class DataWidget extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {

        let {
            data
        } = this.props.children.props

        let summary = {
            data : {}
        };
        
        // TO DO : To setup correctly Condition Statement
        try{
            if(data){
                if(data.data){
                    summary = this.props.profile.hasAppStats(data.type);
                }else if(!_.has(data,'data')){
                    let array = Object.keys(data).map( (key) => {
                        return this.props.profile.hasAppStats(data[key].type);
                    })
                    for(var i = 0; i < array.length; i++){
                        summary.data[array[i].type] = array[i]
                    }
                }else{
                    throw new Error('No Data')
                }
            }
        }catch(err){
            summary = null;
        }

        let hasData = summary && !_.isEmpty(summary.data);
        
        return (
            hasData ? 
                this.props.children
            : null
        )
    }

}






function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

DataWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DataWidget);

