import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";


const defaultState = {
    isActive: true,
    integration_id: '',
    publicKey: '',
    privateKey: '',
    integration_type: 'live_chat',
    locked: true
}

const stream = `${process.env.PUBLIC_URL}/img/landing/stream.png`;

class ChatTab extends Component {
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
        const chat = props.profile.getApp().getChatIntegration();
        const { isActive, privateKey, publicKey } = chat;
        this.setState({...this.state, 
            integration_id : chat._id,
            isActive,
            privateKey,
            publicKey
        })
    }

    onChange = ({name, value}) => {
        this.setState({...this.state, [name] : value })
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : true});
        await profile.getApp().editIntegration(this.state);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, privateKey } = this.state; 
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col md={12}>
                            <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'chatTab'} 
                                locked={locked}
                            >
                                <div>
                                    <img style={{width : 70}} src={stream}></img>
                                    <p className="text-small text-left" style={{marginTop : 0}}><a href="https://getstream.io">https://getstream.io</a></p>
                                    <p className="text-left secondary-text" style={{marginTop: 40, marginBottom: 40}}> Add your API Key to integrate </p>
                                </div>

                                <TextInput
                                    label={'API Key'}
                                    name={'privateKey'}
                                    type={'text'} 
                                    value={privateKey}
                                    defaultValue={privateKey}
                                    disabled={locked}
                                    changeContent={(name, value) => this.onChange({name, value})}
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

export default connect(mapStateToProps)(ChatTab);
