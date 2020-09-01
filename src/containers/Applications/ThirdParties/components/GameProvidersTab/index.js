import React from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import TextInput from '../../../../../shared/components/TextInput';
import { Card } from 'reactstrap';
import { CardBody, ProvidersList, ProviderContainer, Header, Actions, ApiField } from './styles';
import { connect } from "react-redux";

import _ from 'lodash';
import Provider from './Provider';


class GameProvidersTab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            providers: []
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { App } = props.profile;

        const providers = App.params.casino_providers;

        this.setState({ providers: !_.isEmpty(providers) ? providers : [] })
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

    addProvider = async ({ provider_id }) => {
        const { profile } = this.props;

        await profile.getApp().createProvider({ provider_id });
    }

    render() {
        const { isLoading, locked, providers } = this.state; 

        return (
            <Card>
                <CardBody>
                        {/* <div>
                            <img style={{width : 70}} src={stream}></img>
                            <p className="text-small text-left" style={{marginTop : 0}}><a href="https://getstream.io" target="_blank">https://getstream.io</a></p>
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
                        /> */}
                        <ProvidersList>
                            { !_.isEmpty(providers) && providers.map(provider => (
                                <Provider data={provider} addProvider={this.addProvider}/>
                            ))}
                        </ProvidersList>
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

export default connect(mapStateToProps)(GameProvidersTab);
