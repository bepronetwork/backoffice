import React, { Component } from 'react'
import { AnnouncementTab, Banners, Logo, Footer, Colors } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { LayersOutlineIcon, AnnouncementIcon, BrandingWatermarkIcon, ColorizeIcon, PageLayoutFooterIcon } from 'mdi-react';

export default class CustomizationContainer extends Component {
    render() {
        return (
            <div>
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Announc. Tab',
                                container :  <AnnouncementTab />,
                                icon : <AnnouncementIcon/>
                            },
                            {
                                title : 'Logo',
                                container : <Logo/>,
                                icon : <BrandingWatermarkIcon/>
                            },
                            {
                                title : 'Banners',
                                container : <Banners/>,
                                icon : <LayersOutlineIcon/>
                            },
                            {
                                title : 'Colors',
                                container : <Colors/>,
                                icon : <ColorizeIcon/>
                            },
                            {
                                title : 'Footer',
                                container : <Footer/>,
                                icon : <PageLayoutFooterIcon/>
                            },
                         
                        ]
                    }
                />
            </div>
        )
    }
}

