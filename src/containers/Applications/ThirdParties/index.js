import React, { Component } from 'react'
import { ChatTab, EmailTab, GameProviders } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { ChatIcon, EmailIcon } from 'mdi-react';
import { Chat, Email } from '../../../components/Icons';

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
                                icon : <Email/>
                            }
                         
                        ]
                    }
                />
            </div>
        )
    }
}

