import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import BooleanInput from '../../../../shared/components/BooleanInput';
import ColorPickerInput from '../../../../shared/components/color_picker_input/ColorPickerInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";


const defaultState = {
    isActive: false,
    backgroundColor: '#000',
    textColor: '#000',
    text: '',
    locked: true,
    isLoading: false
}

class AnnouncementTab extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        const { locked } = this.state;

        if (locked) {
            this.projectData(props);
        }
    }

    projectData = async (props) => {
        const { topBar } = props.profile.getApp().getCustomization();
        const { isActive, backgroundColor, textColor, text } = topBar;
        this.setState({...this.state, 
            isActive,
            backgroundColor,
            textColor,
            text
        })
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
        this.setState({...this.state, isLoading : true});
        await profile.getApp().editTopBarCustomization(this.state);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, isActive, textColor, backgroundColor, text } = this.state; 
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
                                type={'announcementTab'} 
                                locked={locked}
                            >
                                <TextInput
                                    label={'Announcement Text'}
                                    name={'text'}
                                    type={'text'} 
                                    value={text}
                                    defaultValue={text}
                                    disabled={locked}
                                    changeContent={(type, value) => this.onChange({type, value})}
                                />
                                <ColorPickerInput 
                                    label={'Text Color'}
                                    name={'textColor'}
                                    color={textColor}
                                    disabled={locked}
                                    onChange={this.onChange}
                                />
                                <ColorPickerInput 
                                    label={'Background Color'}
                                    name={'backgroundColor'}
                                    color={backgroundColor}
                                    disabled={locked}
                                    onChange={this.onChange}
                                />
                                <BooleanInput
                                    checked={isActive} 
                                    onChange={this.onChange}
                                    disabled={locked}
                                    type={'isActive'}
                                    id={'check-active-101'}
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

export default connect(mapStateToProps)(AnnouncementTab);
