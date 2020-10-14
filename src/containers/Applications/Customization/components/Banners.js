import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import Dropzone from 'react-dropzone'
import 'react-alice-carousel/lib/alice-carousel.css'
import { GridList, withStyles, FormLabel } from '@material-ui/core';
import BooleanInput from '../../../../shared/components/BooleanInput';
import { styles } from './styles';

import styled from 'styled-components'
import { Select, Checkbox } from 'antd';
import { BrandingWatermarkSharp } from '@material-ui/icons';

const image2base64 = require('image-to-base64');
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;

const { Option } = Select;

const defaultState = {
    autoDisplay: false,
    items: [],
    links: [],
    banners: [],
    locked: true,
    isLoading: false,
    language: 'EN'
}

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 16, 
    color: "#646777",
    padding: 10
}

const Text = styled.span`
    font-family: Poppins;
    font-size: 13px;
`;


class Banners extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    onAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        const banner = {
            image_url : blob,
            link_url : '',
            button_text : '',
            title : '',
            subtitle : ''
        }

        this.setState({ banners : this.state.banners.concat([banner]) });
    }

    projectData = async (props) => {
        const { language } = this.state;

        await this.fetchLanguageData(language);
    }

    fetchLanguageData = async (language) => {
        const { banners } = this.props.profile.getApp().getCustomization();

        const banner = banners.languages.find(l => l.language.prefix === language);
        const languages = banners.languages.map(l => l.language);

        const { ids, autoDisplay, fullWidth, useStandardLanguage } = banner;

        this.setState({...this.state,
            language, 
            languages: languages,
            useStandardLanguage,
            banners : ids,
            autoDisplay,
            fullWidth: fullWidth
        })
    }

    renderAddImage = () => {
        return(
            <div className='dropzone-image'>
                <Dropzone onDrop={this.onAddedFile} width='100%' ref={(el) => (this.dropzoneRef = el)} disabled={this.state.locked}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Banner here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src, index) => {
        let banners = this.state.banners;
        banners.splice(index, 1);

        this.setState({ banners });
    }

    getLanguageImage = language => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={language.logo} alt={language.logo} style={{ height: 20, width: 20, margin: "0px 5px" }}/>
            <Text>{language.name}</Text>
        </div>
    )

    renderImage = (src, index) => {
        const banners = this.state.banners;
        const link_url = banners[index].link_url;
        const button_text = banners[index].button_text;
        const title = banners[index].title;
        const subtitle = banners[index].subtitle;

        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }
        return (
            <div style={{paddingBottom : 20, width: '100%', height : 240, margin : 'auto'}}>
                <button disabled={this.state.locked} onClick={() => this.removeImage(src, index)} 
                className='carousel-trash button-hover'
                style={{right: 25, top: 3, position: 'relative'}}>
                    <img src={trash} style={{width : 15, height : 15}}/>
                </button>
                <img src={src} onDragStart={this.handleOnDragStart} style={{height : '100%'}}/>
                <div style={{marginTop : 36}}>
                    <TextInput
                        name="link_url"
                        label="Link URL"
                        type="text"
                        value={link_url}
                        defaultValue={link_url}
                        disabled={this.state.locked}
                        index={index}
                        changeContent={(name, value, index) => this.onChange({name, value, index})}
                    />
                </div>
                <div style={{marginTop : 10}}>
                    <TextInput
                        name="button_text"
                        label="URL Button Text"
                        type="text"
                        value={button_text}
                        defaultValue={button_text}
                        disabled={this.state.locked}
                        index={index}
                        changeContent={(name, value, index) => this.onChange({name, value, index})}
                    />
                </div>
                <div style={{marginTop : 10}}>
                    <TextInput
                        name="title"
                        label="Title"
                        type="text"
                        value={title}
                        defaultValue={title}
                        disabled={this.state.locked}
                        index={index}
                        changeContent={(name, value, index) => this.onChange({name, value, index})}
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <TextInput
                        name="subtitle"
                        label="Subtitle"
                        type="text"
                        value={subtitle}
                        defaultValue={subtitle}
                        disabled={this.state.locked}
                        index={index}
                        changeContent={(name, value, index) => this.onChange({name, value, index})}
                    />
                </div>
            </div>
        )
    }

    onChange = ({name, value, index}) => {
        let banners = this.state.banners;
        switch(name){
            case 'link_url' : {
                banners[index].link_url = value;
                break;
            };
            case 'button_text' : {
                banners[index].button_text = value;
                break;
            };
            case 'title' : {
                banners[index].title = value;
                break;
            };
            case 'subtitle' : {
                banners[index].subtitle = value;
                break;
            }
        }

        this.setState({...this.state, banners })
    }

    onChangeLanguage = async (value) => {
        this.setState({
            language: value ? value : ""
        })

        await this.fetchLanguageData(value)
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    onChangeFullwidth = () =>  {
        const { fullWidth } = this.state;

        this.setState({ fullWidth: !fullWidth });
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        const { banners, fullWidth, languages, language, useStandardLanguage } = this.state;

        const lang = languages.find(l => l.prefix === language)

        this.setState({...this.state, isLoading : true});
        const postData = {
            banners,
            autoDisplay: false,
            fullWidth: fullWidth,
            language: lang._id, 
            useStandardLanguage
        }
        await profile.getApp().editBannersCustomization(postData);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { isLoading, locked, autoDisplay, banners, fullWidth, languages, useStandardLanguage } = this.state; 
        const { classes } = this.props;
        
        return (
            <Card>
                <CardBody style={{ margin: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <Row>
                        <Col md={12} style={{ padding: 0 }}>
                            <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'announcementTab'} 
                                locked={locked}
                            >
                                <FormLabel component="legend" style={labelStyle}>Language</FormLabel>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: "5px 0px", marginTop: 20, padding: "0px 10px" }}>
                                    <Select
                                    defaultValue="EN"
                                    style={{ minWidth: 130 }}    
                                    placeholder="Language"
                                    onChange={this.onChangeLanguage}
                                    disabled={isLoading || locked}
                                    >
                                        { languages && languages.map(language => (
                                            <Option key={language.prefix}>{this.getLanguageImage(language)}</Option>
                                        ))}
                                    </Select>
                                    <Checkbox style={{ marginLeft: 10 }} disabled={isLoading || locked} checked={useStandardLanguage} onChange={() => this.setState({ useStandardLanguage: !useStandardLanguage})}>Use default language</Checkbox>
                                </div>
                                <br/>
                                <div style={{width : '96%', margin : 'auto'}}>
                                    <div style={{ marginTop: 10 }}>
                                        <FormLabel component="legend">Show full width banner</FormLabel>
                                        <BooleanInput
                                            checked={fullWidth} 
                                            onChange={this.onChangeFullwidth}
                                            disabled={locked}
                                            type={'isFullWidth'}
                                            id={'fullwidth'}
                                        />
                                    </div> 
                                    <div className={classes.root}>
                                        <GridList className={classes.gridList} cols={2.5} style={{ minHeight: '410px' }}>
                                        {banners.map((i, index) => {
                                            return (
                                                <div style={{border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: "white", borderRadius: 8, height : 630, width: 300, margin: 20, padding : "0px 30px 30px 30px"}}>
                                                    {this.renderImage(i.image_url, index)}
                                                </div>
                                            )
                                        })}
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <h4 style={{padding: 20, width: 200 }}>Add Banner</h4> 
                                            <div style={{border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: "white", borderRadius: 8, height : 270, width: 230, margin: "0px 20px 20px 20px"}}> 
                                                {this.renderAddImage(banners.length)}
                                            </div>
                                        
                                        </div>
                                        </GridList>
                                    </div>
                                </div>
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

export default connect(mapStateToProps)(withStyles(styles)(Banners));
