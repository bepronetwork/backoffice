import React from 'react'
import { Card } from 'reactstrap';
import { CardBody, ProvidersList } from './styles';
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

    isAdded = ({ _id }) => {
        const { profile } = this.props;

        const appGameProviders = profile.App.params.casino_providers ? profile.App.params.casino_providers : [];
        const provider = appGameProviders.find(provider => provider.providerEco === _id);

        return !_.isEmpty(provider);
    }

    addProvider = async ({ provider_id }) => {
        const { profile } = this.props;

        await profile.getApp().createProvider({ provider_id });

        this.projectData(this.props);
    }

    editProvider = async ({ _id, api_key, activated, partner_id }) => {
        const { profile } = this.props;

        await profile.getApp().editProvider({ 
            providerParams: { 
                _id: _id, 
                api_key: api_key,
                activated: activated,
                partner_id: partner_id
            } 
        });
    }

    render() {
        const { providers } = this.state; 
        const { profile } = this.props;

        const appGameProviders = profile.App.params.casino_providers ? profile.App.params.casino_providers : [];
        const providersToAdd = providers.filter(provider => !this.isAdded({ _id: provider._id }));

        return (
            <Card>
                <CardBody>
                    { _.isEmpty(providersToAdd) ? (
                        <h5 style={{ marginBottom: 20 }}>There are no new providers available or all have already been added</h5>
                     ) : (
                         <>
                            <h5 style={{ marginBottom: 20 }}>Available game providers</h5>
                            <ProvidersList>
                                { providersToAdd.map(provider => (
                                    <AddProvider data={provider} addProvider={this.addProvider}/>
                                ))}
                            </ProvidersList> 
                            <br/>
                        </>
                    )}

                    <hr/>
                    <br/>
                    
                    { _.isEmpty(appGameProviders) ? (
                        <h5 style={{ marginBottom: 20 }}>You have no added providers currently</h5>
                    ) : (
                        <>
                            <h5 style={{ marginBottom: 20 }}>Currently enabled game providers</h5>
                            <ProvidersList>
                                { appGameProviders.map(provider => (
                                    <Provider data={provider} editProvider={this.editProvider}/>
                                ))}
                            </ProvidersList>
                        </>
                    )}
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
