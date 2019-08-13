/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { ArrowDownIcon, ArrowCollapseDownIcon, ArrowUpDropCircleIcon, KeyChangeIcon, CheckBoxIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
const paybear = `${process.env.PUBLIC_URL}/img/dashboard/paybear.png`;

class PaybearWidget extends PureComponent {
 
    constructor(props) {
        super(props);
        this.state = {}
        
    } 

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    connect = async () => {
        try{
            let res = await this.props.profile.addPaybearToken(this.state.paybearkey);
        }catch(err){
            //this.props.showNotification(err.message);
        }
    }


    render() {        

        let paybearToken =  this.props.data;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget " style={{borderTop : '6px solid #7dbfe1'}}>
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={paybear} alt="paybear" />
                            </Col>
                            <Col lg={9}>
                                <div className="dashboard__visitors-chart">
                                    <Row>
                                        <Col lg={8}>
                                            <p className="dashboard__visitors-chart-number-second" style={
                                                {color : '#646777'}
                                            }> Paybear </p>
                                        </Col>
                                        <Col>
                                            {paybearToken ? <CheckBoxIcon></CheckBoxIcon> : null}
                                        </Col>
                                    </Row>
                                </div>


                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> <span style={{fontSize : 15}}>Paybear Integration</span></p>
                                </div>
                            </Col>
                            
                            <Col lg={12}>
                                {!paybearToken ? 
                                    <div>   
                                        <TextInput
                                            icon={KeyChangeIcon}
                                            name="paybearkey"
                                            label="API Secret Key"
                                            type="text"
                                            placeholder="se983fsdiufh934t20trr"
                                            changeContent={this.changeContent}
                                        />
                                        <Button onClick={() => this.connect()} style={{margin : 0, marginTop : 10}} className="icon" ><p><ArrowUpDropCircleIcon className="deposit-icon"/> Connect </p></Button>
                                    </div>
        
                                    :
                                        <div>
                                        </div>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

PaybearWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(PaybearWidget);
