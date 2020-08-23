import React from 'react'
import TabsContainer from '../../../shared/components/tabs/Tabs';
import AddOnStorePageContainer from './AddOnStore';
import AddOnContainer from './AddOnContainer';
import { AddOn, Cash } from '../../../components/Icons';

export default class AddOnsContainer extends React.PureComponent {
    render() {
        return (
            <>
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Add-Ons Store',
                                container :  <AddOnStorePageContainer />,
                                icon : <Cash/>
                            },
                            {
                                title : 'My Add-Ons',
                                container :  <AddOnContainer />,
                                icon : <AddOn/>
                            }  
                        ]
                    }
                />
            </>
        )
    }
}