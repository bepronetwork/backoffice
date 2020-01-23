import React, { Component } from 'react'
import { ChatTab } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { ChatIcon } from 'mdi-react';

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
                            }
                         
                        ]
                    }
                />
            </div>
        )
    }
}

