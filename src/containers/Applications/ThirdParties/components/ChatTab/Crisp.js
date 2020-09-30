import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import TextInput from '../../../../../shared/components/TextInput';
import { connect } from "react-redux";

const defaultState = {
    isActive: true,
    id: '',
    name: '',
    key: '',
    integration_type: 'chat',
    locked: true
}

const crisp = `${process.env.PUBLIC_URL}/img/landing/crisp.png`;

class Crisp extends Component {
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
        const { profile } = props;
        const App = profile.getApp();

        const cripsr = App.params.integrations.cripsr;

        const { isActive, key, name, _id } = cripsr;

        this.setState({
            id: _id,
            name: name,
            isActive: isActive,
            key: key
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
        const { profile } = this.props;
        const { id, key, isActive} = this.state;

        this.setState({...this.state, isLoading : true});
        
        await profile.getApp().editCrispIntegration({
            isActive: isActive,
            key: key,
            cripsr_id: id
        });

        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, key } = this.state; 

        return (
            <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                type={'chatTab'} 
                locked={locked}
            >
                <div>
                    <img style={{width: 90}} src={crisp}></img>
                    <p className="text-small text-left" style={{marginTop: 8}}><a href="https://crisp.chat/en" target="_blank">https://crisp.chat/en</a></p>
                    <p className="text-left secondary-text" style={{marginTop: 40, marginBottom: 40}}> Add your API Key to integrate </p>
                </div>

                <TextInput
                    label={'API Key'}
                    name={'key'}
                    type={'text'} 
                    value={key}
                    defaultValue={key}
                    disabled={locked}
                    changeContent={(name, value) => this.onChange({name, value})}
                />
            </EditLock>
        )
    }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(Crisp);
