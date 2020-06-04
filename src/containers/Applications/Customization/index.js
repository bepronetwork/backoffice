import React, { Component } from 'react'
import { AnnouncementTab, Banners, Logo, Footer, Colors, Fonts } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { LayersOutlineIcon, AnnouncementIcon, BrandingWatermarkIcon, ColorizeIcon, PageLayoutFooterIcon, FormatFontIcon, ImageIcon } from 'mdi-react';
import Background from './components/Background';
import { Bet, Reward, Phone, Settings, Rewards, AddOn, Withdraw } from '../../../components/Icons';

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
                                icon : <Bet/>
                            },
                            {
                                title : 'Logo',
                                container : <Logo/>,
                                icon : <Reward/>
                            },
                            {
                                title : 'Background',
                                container : <Background/>,
                                icon : <Phone/>
                            },
                            {
                                title : 'Banners',
                                container : <Banners/>,
                                icon : <Settings/>
                            },
                            {
                                title : 'Colors',
                                container : <Colors/>,
                                icon : <Rewards/>
                            },
                            {
                                title : 'Font',
                                container : <Fonts/>,
                                icon : <AddOn/>
                            },
                            {
                                title : 'Footer',
                                container : <Footer/>,
                                icon : <Withdraw/>
                            },
                         
                        ]
                    }
                />
            </div>
        )
    }
}

