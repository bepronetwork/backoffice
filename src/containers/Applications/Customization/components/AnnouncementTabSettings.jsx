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
  announcementText: '',
  new_isActive: false,
  new_backgroundColor: '',
  new_textColor: '',
  new_announcementText: '',
  locked: {
    announcementTab: true,
  },
  isLoading: {
    announcementTab: false,
  }
}

class AnnouncementTabSettings extends Component {
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
      //TODO: in the API, create a getAnnouncementTabSettings (through the getApp), which
      //retrieves an object containing the four inputs for this settings to setState to.

      // let announcementTabSettings = props.profile.getApp().getAnnouncementTabSettings();
      // this.setState({...this.state, 
      //     announcementTabSettings
      // })
  }

  onChange = ({type, value}) => {
    this.setState({...this.state, [`new_${type}`] : value })
  }

  unlockField = ({field}) => {
      this.setState({...this.state, locked : {...this.state.locked, [field] : false }})
  }

  lockField = ({field}) => {
      this.setState({...this.state, locked : {...this.state.locked, [field] : true }})
  }

  confirmChanges = async ({field}) => {
    //TODO: on API side create a changeAnnouncementTabSettings function to send over the data changed by client
    //Reference Transaction.js (Should look something like this below)

    var { profile } = this.props;
    this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : true}})

    await profile.getApp().changeAnnouncementTabSettings({
          isActive : this.state[`new_${field}`],
          textColor : this.state[`new_${field}`],
          backgroundColor : this.state[`new_${field}`],
          announcementText : this.state[`new_${field}`]
    });

    this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}, locked: { announcementTab : true}})
    this.projectData(this.props);
}
  render() {
    console.log(this.state)
      return (
        <Card>
        <CardBody>
            <Row>
                <Col md={12}>
                    <EditLock 
                        isLoading={this.props.isLoading} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        confirmChanges={this.confirmChanges} 
                        type={'announcementTab'} 
                        locked={this.state.locked.announcementTab}>
                          <h3>Announcement Tab</h3>
                              <BooleanInput
                                label={'Active'}
                                isActive={this.state.isActive}
                                disabled={this.state.locked.announcementTab}
                                changeContent={ (type, value) => this.onChange({type, value})}
                              />
                              <ColorPickerInput 
                                label={'Text Color'}
                                name={'textColor'}
                                color={this.state.textColor}
                                disabled={this.state.locked.announcementTab}
                                changeContent={ (type, value) => this.onChange({type, value})}
                              />
                              <ColorPickerInput 
                                label={'Background Color'}
                                name={'backgroundColor'}
                                color={this.state.backgroundColor}
                                disabled={this.state.locked.announcementTab}
                                changeContent={ (type, value) => this.onChange({type, value})}
                              />
                               <TextInput
                                      label={'Announcement Text'}
                                      name={'announcementText'}
                                      type={'announcementText'} 
                                      value={this.state.announcementText}
                                      disabled={this.state.locked.announcementTab}
                                      changeContent={ (type, value) => this.onChange({type, value})}
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

export default connect(mapStateToProps)(AnnouncementTabSettings);
