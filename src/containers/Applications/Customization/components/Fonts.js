import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";

import saveFontImg from '../../../../shared/img/fonts/saveGoogleFont.gif';

const defaultState = {
    url: '',
    name: '',
    locked: true,
    isLoading: false
}

class Fonts extends Component {
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
        const { locked } = this.state;

        if (locked) {
            const typography  = props.profile.getApp().getTypography();
            const { name, url } = typography;
            this.setState({...this.state, 
                url,
                name
            });
        }
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [type] : value })
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        const { url, name } = this.state;
        this.setState({...this.state, isLoading : true});

        const typography = { url, name }
        await profile.getApp().editTypography(typography);

        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, url, name } = this.state; 
        return (
            <Card>
                <CardBody style={{ margin: "0px 15px" }}>
                    <Row>
                        <Col md={12}>
                            <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'fontTab'} 
                                locked={locked}
                            >

                                <div style={{marginBottom: 40}}>
                                    <p className="text-small text-left" style={{marginTop : 0}}><a href="https://fonts.google.com" target="_blank">https://fonts.google.com</a></p>
                                    <p className="text-left secondary-text" style={{marginTop: 20, marginBottom: 30}}> Choose a Google Font to install </p>
                                    <img style={{width : 650}} src={saveFontImg}></img>
                                </div>

                                <TextInput
                                    label={'Google Font URL'}
                                    name={'url'}
                                    type={'url'} 
                                    value={url}
                                    defaultValue={url}
                                    disabled={locked}
                                    changeContent={(type, value) => this.onChange({type, value})}
                                />
                                <TextInput
                                    label={'Font Name'}
                                    name={'name'}
                                    type={'name'} 
                                    value={name}
                                    defaultValue={name}
                                    disabled={locked}
                                    changeContent={(type, value) => this.onChange({type, value})}
                                />
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

export default connect(mapStateToProps)(Fonts);
