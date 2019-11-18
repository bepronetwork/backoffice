import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import store from "../../../containers/App/store";
import { set2FA } from '../../../redux/actions/set2FA';


const defaultState = {
    has2FA : false,
    email : 'N/A',
    nam : 'N/A',
    username : 'N/A'
}

class SettingsAccountContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        const { profile, set2FA } = props;
        let params = profile.getUserInfo();
        let { success } = set2FA;
        this.setState({
            ...this.state,
            has2FA : params.security['2fa_set'] || success,
            email : params.email,
            name : params.name,
            username : params.username
        })
    }

    handleChange = async ({key, value}) => {
        var { profile } = this.props;
        switch(key){
            case 'set2FA' : {
                // Popup with QR Code and Instructions
                await store.dispatch(set2FA({isActive : true}));
            };
        }
        this.projectData(this.props);
      };

    render = () => {
        const {
            has2FA,
            username,
            email, 
            name
        } = this.state;

        return (
            <div>               
                <p className="dashboard__visitors-chart-title text-left text-red" style={{fontSize : 18, marginBottom : 10}}> My Account </p>
                <hr></hr>
                <Container>
                    <Row>
                        <Col sm={5}>
                            <h5> Name </h5>
                        </Col>
                        <Col sm={7}>
                            <p> {name}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm={5}>
                            <h5> Username </h5>
                        </Col>
                        <Col sm={7}>
                            <p> {username}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm={5}>
                            <h5> E-mail </h5>
                        </Col>
                        <Col sm={7}>
                            <p> {email}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm={5}>
                            <h5> 2FA Authentication </h5>
                        </Col>
                        <Col sm={7}>
                            <Switch color="primary" checked={has2FA} onChange={(value) => this.handleChange({key : 'set2FA', value})}value="checkedF" inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </Col>
                    </Row>
                </Container>
          </div>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        set2FA : state.set2FA

    };
}

SettingsAccountContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(SettingsAccountContainer);

