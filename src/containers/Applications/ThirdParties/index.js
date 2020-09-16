import React, { Component } from 'react'
import { ChatTab, EmailTab, GameProviders, KYC } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { Chat, Email, Hand } from '../../../components/Icons';

export default class ThirdPartiesContainer extends Component {
    render() {
        return (
            <div>
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Chat',
                                container :  <ChatTab />,
                                icon : <Chat/>
                            },
                            {
                                title : 'E-mail',
                                container :  <EmailTab />,
                                icon : <Email/>
                            },
                            {
                                title : 'Game Providers',
                                container :  <GameProviders />,
                                icon : <Hand/>
                            },
                            {
                                title : 'KYC',
                                container :  <KYC />,
                                icon : <Chat/>
                            }
                         
                        ]
                    }
                />
            </div>
        )
    }
}

