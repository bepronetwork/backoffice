import React, { Component } from 'react'
import TabsContainer from '../../../shared/components/tabs/Tabs';
import AddOnStorePageContainer from './AddOnStore';
import { StoreIcon, PuzzleIcon } from 'mdi-react';
import AddOnContainer from './AddOnContainer';

export default class AddOnsContainer extends Component {
    render() {
        return (
            <div>
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Add-Ons Store',
                                container :  <AddOnStorePageContainer />,
                                icon : <StoreIcon/>
                            },
                            {
                                title : 'My Add-Ons',
                                container :  <AddOnContainer />,
                                icon : <PuzzleIcon/>
                            }  
                        ]
                    }
                />
            </div>
        )
    }
}