import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import SettingsBox from '../components/SettingsBox';
import { ArrowExpandDownIcon, EmergencyExitIcon, OpenInAppIcon } from 'mdi-react';
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;
const withdrawal = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;
const time = `${process.env.PUBLIC_URL}/img/dashboard/stopwatch.png`;
const emergency = `${process.env.PUBLIC_URL}/img/dashboard/siren.png`;


const defaultState = {
    isPaused : false,
    locks : {},
    currencyTicker : 'N/A',
    locks : {
       
    },
    isLoading : {
        isPaused : false,
       
    }
}

class SettingsRiskContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        let currencyTicker = props.profile.getApp().getCurrencyTicker();
        let isPaused = await props.profile.getApp().isPaused(); 

        this.setState({...this.state, 
            currencyTicker,
            isPaused,
        })
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [`new_${type}`] : value })
    }

    unlockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : false }})
    }

    lockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : true }})
    }

    pauseContract = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : true}})
        await profile.getApp().pauseContract();
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : false}});
        this.projectData(this.props);
        return;
    }

    unpauseContract = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : true}})
        await profile.getApp().unpauseContract();
        this.setState({...this.state, isLoading : {...this.state.isLoading, isPaused : false}});
        this.projectData(this.props);
        return;
    }

    render = () => {

        return (
            <Container className="dashboard">               
                <p className="dashboard__visitors-chart-title text-left text-red" style={{fontSize : 18, marginBottom : 10}}> Risk Management </p>
                <hr></hr>
                <Row>
                    <Col md={4}>
                        <Card>
                             <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={emergency}/>
                                     
                                    </Col>
                                    <Col md={8}>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>  {!this.state.isPaused ? 'Working' : 'Paused'}  </h3>
                                        <h5 className=""> Status </h5>
                                        <hr></hr>
                                        {!this.state.isPaused ?
                                                <Button disabled={this.state.isLoading.isPaused} onClick={() => this.pauseContract()} className="icon" outline>
                                                    <p><EmergencyExitIcon className="deposit-icon"/> {!this.state.isLoading.isPaused ? 'Pause Contract' : '...is Updating'}</p>
                                                </Button>
                                            :        
                                            <div>
                                                <Button disabled={this.state.isLoading.isPaused} onClick={() => this.unpauseContract()} className="icon" outline>
                                                    <p><OpenInAppIcon className="deposit-icon"/>  {!this.state.isLoading.isPaused ? 'Activate Contract' : '...is Updating'}</p>
                                                </Button>
                                            </div>        
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
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

SettingsRiskContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(SettingsRiskContainer);

