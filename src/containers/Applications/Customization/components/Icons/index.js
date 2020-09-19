import React, { Component } from 'react'
import { Col, Row, Card, CardBody, Label } from 'reactstrap';
import { connect } from "react-redux";
import styled from 'styled-components';

import { IconsList } from './styles'
import Icon from './Icon'
import AddIcon from './AddIcon'

import _ from 'lodash';
import EditLock from '../../../../Shared/EditLock';

const cardStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none"
}

export const InputLabel = styled(Label)`
    font-size: 16px;
    font-family: Poppins;
`;

class IconsTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            locked: true,
            isLoading: false,
            icons: []
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        const { locked } = this.state;

        if (locked) {
            this.projectData(props);
        }
    }

    projectData = async (props) => {
        const { profile } = props;
        
        const app = await profile.getApp();
        const { params } = app;

        const icons = params.customization.icons.ids;
        const icon_id =  params.customization.icons._id;

        this.setState({ 
            icons: !_.isEmpty(icons) ? icons : [],
            icon_id: icon_id
        })
    }

    setIcons = ({ newIcons }) => {
        this.setState({ icons: newIcons })
    }

    
    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    confirmChanges = async () => {
        const { icons, icon_id } = this.state;
        const { profile } = this.props;

        const filteredIcons = icons.map(icon => ({ 
            name: icon.name, 
            link: icon.link, 
            position: icons.indexOf(icon) 
        }));
        
        this.setState({ isLoading: true })

        await profile.getApp().editIconsCustomization({ icon_id: icon_id, icons: filteredIcons });

        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({
            isLoading: false,
            locked: true
        })
    }

    unlockField = () => {
        this.setState({ locked: false })
    }

    lockField = () => {
        this.setState({ locked: true })
    }

    render() {
        const { isLoading, locked, icons } = this.state; 

        return (
            <Card>
                <CardBody style={cardStyle}>
                    <Row>
                        <Col md={12}>
                            <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'skinType'} 
                                locked={locked}
                            >
                                <IconsList>
                                    <AddIcon icons={icons} setIcons={this.setIcons} locked={locked}/>
                                    { !_.isEmpty(icons) && icons.map(icon => (
                                        <Icon icons={icons} icon={icon} setIcons={this.setIcons} locked={locked}/>
                                    ))}
                                </IconsList>
                                
                            </EditLock>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            )
        }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(IconsTab);
