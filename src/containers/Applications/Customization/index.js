import React, { Component } from 'react'
import { AnnouncementTab, Banners, Logo, Footer, Colors, Fonts, Tabs, SubSections, Skins, Icons, Social, Languages } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import Background from './components/Background';
import { Bet, Reward, Phone, Settings, Rewards, AddOn, Withdraw, User, Chat } from '../../../components/Icons';
import EsportsMainPage from './components/EsportsMainPage';

export default class CustomizationContainer extends Component {
    render() {
        return (
            <div>
                <TabsContainer 
                    items={[{
                                title : 'Skins',
                                container : <Skins/>,
                                icon : <Rewards/>
                            },
                            {
                                title : 'Icons',
                                container : <Icons/>,
                                icon : <AddOn/>
                            },
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
                                title : 'Tabs',
                                container : <Tabs/>,
                                icon : <Settings/>
                            },
                            {
                                title : 'Languages',
                                container : <Languages/>,
                                icon : <Chat/>
                            },
                            {
                                title : 'Subsections',
                                container : <SubSections/>,
                                icon : <Settings/>
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
                            {
                                title : 'Esports',
                                container : <EsportsMainPage/>,
                                icon : <Reward/> 
                            },
                            {
                                title : 'Social Links',
                                container : <Social/>,
                                icon : <User/>
                            },
                         
                        ]
                    }
                />
            </div>
        )
    }
}

