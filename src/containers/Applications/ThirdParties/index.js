import React, { Component } from 'react'
import { ChatTab, EmailTab } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { ChatIcon, EmailIcon } from 'mdi-react';

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
                                icon : <ChatIcon/>
                            },
                            {
                                title : 'E-mail',
                                container :  <EmailTab />,
                                icon : <EmailIcon/>
                            }
                         
                        ]
                    }
                />
            </div>
        )
    }
}

