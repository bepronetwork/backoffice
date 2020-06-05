import React from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import EditLock from '../../../../Shared/EditLock';
import TextInput from '../../../../../shared/components/TextInput';
import DateInput from '../../../../../shared/components/DateInput';

class LimitsBox extends React.Component{

    constructor(props){
        super(props)
    }

    

    render = () => {
        let { 
            title, 
            inputIcon, 
            currencyTicker, 
            image,
            lock,  
            inputType,
            type, 
            value,
            new_value, 
            isLoading,
            defaultValue,
            /* Functions */
            unlockField, 
            lockField, 
            onChange, 
            confirmChanges
        } = this.props;

        if(!inputType){
            inputType = 'text'
        }

        

        return (
            <Card>
                <CardBody style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <Row>
                        <Col md={4}>
                            <img className='application__game__image' src={image}/>
                            <hr></hr>
                                <h5 className=""> {title} {
                                    (currencyTicker ? `(${currencyTicker})` : null)
                                } </h5>

                            <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.props.value}</h3>
                        </Col>
                        <Col md={8}>
                            <EditLock isLoading={isLoading} unlockField={unlockField} lockField={lockField} confirmChanges={confirmChanges} type={type} locked={lock}>
                                <h6 className="">New {title} </h6>
                                    <h5 className={"bold-text dashboard__total-stat"}>{new_value} {currencyTicker} </h5>
                                {
                                    inputType == 'text' ?
                                        <TextInput
                                            icon={inputIcon}
                                            name={type}
                                            type="number"
                                            disabled={lock}
                                            changeContent={ (type, value) => onChange({type, value})}
                                        />
                                    : inputType == 'date' ?
                                        <DateInput
                                            name={type}
                                            defaultValue={defaultValue}
                                            label={type}
                                            changeContent={ (type, value) => onChange({type, value})}
                                        />
                                    : null
                                }
                            </EditLock>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

LimitsBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(LimitsBox);

