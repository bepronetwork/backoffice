import React from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import TextInput from '../../../../../shared/components/TextInput';
import { Card } from 'reactstrap';
import { CardBody, ProvidersList, ProviderContainer, Header, Actions, ApiField } from './styles';
import { connect } from "react-redux";

import _ from 'lodash';
import Provider from './Provider';
import AddProvider from './AddProvider';

class GameProvidersTab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            providers: [],
            isLoading: false
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;

        this.setState({ isLoading: true })

        const response = await profile.getApp().getAllGameProviders();
        const providers = response.data.message ? response.data.message : [];

        this.setState({ providers: !_.isEmpty(providers) ? providers : [], isLoading: false })
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

    isAdded = ({ _id }) => {
        const { profile } = this.props;

        const appGameProviders = profile.App.params.casino_providers ? profile.App.params.casino_providers : [];
        const provider = appGameProviders.find(provider => provider.providerEco === _id);

        return !_.isEmpty(provider);
    }

    addProvider = async ({ provider_id }) => {
        const { profile } = this.props;

        await profile.getApp().createProvider({ provider_id });
    }

    editProvider = async ({ })

    render() {
        const { isLoading, locked, providers } = this.state; 
        const { profile } = this.props;

        const appGameProviders = profile.App.params.casino_providers ? profile.App.params.casino_providers : [];

        return (
            <Card>
                <CardBody>
                    <h1>You can add a new provider or manage existing ones</h1>
                    <br/>

                    <ProvidersList>
                        { providers.filter(provider => this.isAdded({ _id: provider._id })).map(provider => (
                            <AddProvider data={provider} addProvider={this.addProvider}/>
                        ))}
                    </ProvidersList>

                    <br/>
                    <hr/>
                    <br/>

                    <ProvidersList>
                        { appGameProviders.map(provider => (
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
