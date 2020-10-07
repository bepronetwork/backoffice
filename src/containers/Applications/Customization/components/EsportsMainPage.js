import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { TextField, InputLabel } from './styles';

import './styles.css';

class EsportsMainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            locked: true
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;

        const customization = await profile.getApp().getCustomization();
        const { button_text, link_url, subtitle, title } = customization.esportsScrenner;

        this.setState({
            button_text,
            link_url,
            subtitle,
            title
        })
    }

    unlockField = () => {
        this.setState({ locked: false })
    }

    lockField = () => {
        this.setState({ locked: true })
    }

    onChangeLinkURL = value => {
        this.setState({ link_url: value ? value : "" })
    }

    onChangeButtonText = value => {
        this.setState({ button_text: value ? value : "" })
    }

    onChangeTitle = value => {
        this.setState({ title: value ? value : "" })
    }

    onChangeSubtitle = value => {
        this.setState({ subtitle: value ? value : "" })
    }

    confirmChanges = async () => {
        const { profile }= this.props;
        const { App } = profile;
        const { link_url, button_text, title, subtitle } = this.state;

        this.setState({ isLoading: true });

        await App.editEsportsPageCustomization({
            link_url: link_url ? link_url : "",
            button_text: button_text ? button_text : "",
            title: title ? title : "",
            subtitle: subtitle ? subtitle : ""
        });

        await profile.getApp().updateAppInfoAsync();
        await profile.update();
        
        this.setState({ isLoading: false, locked: true });
    }

    render() {
        const { isLoading, locked, link_url, button_text, title, subtitle } = this.state; 

        return (
            <Card>
                <CardBody style={{ margin: "0px 15px", borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <Row>
                        <Col md={12}>
                        <EditLock 
                            isLoading={isLoading} 
                            unlockField={this.unlockField} 
                            lockField={this.lockField} 
                            confirmChanges={this.confirmChanges} 
                            type={'EsportsMainPage'} 
                            locked={locked}>

                            <InputLabel>Link URL</InputLabel>
                            <TextField placeholder="" disabled={locked} value={link_url} onChange={(e) => this.onChangeLinkURL(e.target.value)}/>

                            <InputLabel>Button Text</InputLabel>
                            <TextField placeholder="" disabled={locked} value={button_text} onChange={(e) => this.onChangeButtonText(e.target.value)}/>

                            <InputLabel>Title</InputLabel>
                            <TextField placeholder="" disabled={locked} value={title} onChange={(e) => this.onChangeTitle(e.target.value)}/>

                            <InputLabel>Subtitle</InputLabel>
                            <TextField placeholder="" disabled={locked} value={subtitle} onChange={(e) => this.onChangeSubtitle(e.target.value)}/>

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

export default connect(mapStateToProps)(EsportsMainPage);
