import React, { Component } from 'react'
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { AnnouncementTabSettings, BannersSettings } from './components';
import TabsContainer from '../../../shared/components/tabs/Tabs';
import { LayersOutlineIcon, AnnouncementIcon } from 'mdi-react';

export default class CustomizationContainer extends Component {
    render() {
        return (
            <div>
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Announc. Tab',
                                container :  <AnnouncementTabSettings />,
                                icon : <AnnouncementIcon/>
                            },
                            {
                                title : 'Banners',
                                container : <BannersSettings/>,
                                icon : <LayersOutlineIcon/>
                            },
                        ]
                    }
                />
            </div>
        )
    }
}

