import React, { Component } from 'react'
import _ from 'lodash';

import '../styles.css';
import { Container, SectionGrid, Title, Text, Image, DropzoneImage, BackgroundItems, UploadButton, RemoveButton, BackgroundImage, DialogHeader, ConfirmButton } from './styles';
import { FormGroup } from 'reactstrap';
import Dropzone from 'react-dropzone'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, MuiThemeProvider, withStyles, Dialog, DialogContent, ButtonBase, } from '@material-ui/core';
import ColorPicker from '../../../../../../shared/components/color_picker_input/ColorPicker';

import { InputField, InputLabel } from '../styles';
import { UploadIcon, TrashCanOutlineIcon, CloseIcon, ContentSaveIcon } from 'mdi-react';

const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const theme = createMuiTheme({
    palette: {
      primary: { 
        main: '#894798' 
        }
    },
});

const StyledFormControlLabel = withStyles({
    label: {
      fontFamily: "Poppins",
      fontSize: "15px"
    },
})(FormControlLabel);

const positionsEnum = Object.freeze({
    0: "RightImage",
    1: "LeftImage",
    2: "BottomImage",
    3: "TopImage"
});

class AddSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            position: 0,
            location: 0,
            newTitle: "",
            newText: "",
            newImage: "",
            newBackgroundColor: "",
            newBackgroundImage: "",
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { subSections } = props;

        this.setState({ subSections: !_.isEmpty(subSections) ? subSections : [] })
    }

    addNewSubSection = () => {
        const { newTitle, newText, newImage, newBackgroundColor, newBackgroundImage, position, location } = this.state;
        const { setSubSections, subSections, setClose } = this.props;
        
        const newSubSectionsObj = { 
            _id: Math.random().toString(36).substr(2, 9), 
            title: newTitle, 
            text: newText, 
            image_url: newImage, 
            background_url: newBackgroundImage, 
            background_color: newBackgroundColor, 
            position: position, 
            location: location
        }

        const newSubSections = subSections ? [newSubSectionsObj,...subSections] : [newSubSectionsObj];

        this.setState({
            position: 0,
            location: 0,
            newTitle: "",
            newText: "",
            newImage: "",
            newBackgroundColor: "",
            newBackgroundImage: "",
        })

        setSubSections({ newSubSections: newSubSections });
        setClose();
    }

    
    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    onAddedNewFile = async ({ files }) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview)

        this.setState({ newImage: blob })
    }

    onAddedNewBackgroundImage = async (files) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview)

        this.setState({ newBackgroundImage: blob })
    }

    renderAddNewImage = () => {
        const { locked } = this.props;

        return(
            <DropzoneImage>
                <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedNewFile({ files: files })} ref={(el) => (this.dropzoneRef = el)}>
                    <img src={upload} alt="upload" style={{ height: 20, width: 20 }}/>
                    <p className='text-center'>Drop the image here</p>
                </Dropzone>
            </DropzoneImage>
        )
    }

    removeNewImage = () => {
        this.setState({ newImage: "" })
    }

    removeNewBackgroundImage = () => {
        this.setState({ newBackgroundImage: "" })
    }

    onChange = ({ type, value }) => {
        this.setState({ [type]: value })
    }

    handleChangePosition = event => {
        event.preventDefault();

       this.setState({ position: parseInt(event.target.value) })
    }

    handleChangeLocation = event => {
        event.preventDefault();

       this.setState({ location: parseInt(event.target.value) })
    }

    handleChangeBackgroundColor = ({ _type, value }) => {
        this.setState({ newBackgroundColor: value })
    }

    handleChangeNewTitle = ({ value }) => {
        this.setState({ newTitle: value ? value : "" })
    }

    handleChangeNewText = ({ value }) => {
        this.setState({ newText: value ? value : "" })
    }

    render() {
        const { locked, open, setClose } = this.props;
        const { position, location, newImage, newBackgroundImage, newBackgroundColor, newTitle, newText } = this.state;

        return (
            <Dialog open={open} fullWidth maxWidth="lg">
                <DialogHeader>
                    <ButtonBase onClick={() => setClose()}>
                        <CloseIcon/>
                    </ButtonBase>
                </DialogHeader>
                <DialogContent>
                    <Container>
                        <SectionGrid className={positionsEnum[position]} backgroundColor={newBackgroundColor}>
                            <Title>
                                <h1>{newTitle}</h1>
                            </Title>
                            <Text>
                                <p>{newText}</p>
                            </Text>
                            
                            { newBackgroundImage && (
                                <BackgroundImage>
                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Background" src={this.renderImage(newBackgroundImage)}/> 
                                </BackgroundImage>
                            )}

                            <Image>
                            { newImage ? (
                                <>  
                                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: -5.5, marginBottom: -30 }}>
                                        <button
                                        disabled={locked}
                                        onClick={() => this.removeNewImage()}
                                        style={{ position: "inherit", zIndex: 20, right: 20, top: 6, backgroundColor: "transparent" }}
                                        className='carousel-trash button-hover'>
                                            <img src={trash} alt="remove" style={{ width: 15, height: 15 }}/>
                                        </button>
                                    </div>
                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Image" src={this.renderImage(newImage)}/> 
                                </>
                            ) : (
                                this.renderAddNewImage()
                            )}
                            </Image>
                        </SectionGrid>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormGroup style={{ margin: 0 }}>
                            <InputLabel for="title">Title</InputLabel>
                            <InputField
                                label="Title"
                                name="title"
                                type="text"
                                value={newTitle}
                                disabled={locked}
                                onChange={(e) => this.handleChangeNewTitle({ value: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup style={{ margin: 0 }}>
                            <InputLabel for="text">Text</InputLabel>
                            <InputField
                                label="Text"
                                name="text"
                                type="text"
                                value={newText}
                                disabled={locked}
                                onChange={(e) => this.handleChangeNewText({ value: e.target.value })}
                            />
                        </FormGroup>

                        <BackgroundItems>
                            <FormGroup style={{ marginTop: 10 }}>
                                <InputLabel for="backgroundColor">Background color</InputLabel>
                                <ColorPicker
                                    name="backgroundColor"
                                    color={newBackgroundColor}
                                    disabled={locked}
                                    onChange={this.handleChangeBackgroundColor}
                                />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 10 }}>
                                <InputLabel>Background image</InputLabel>
                                { !newBackgroundImage ? (
                                    <Dropzone onDrop={this.onAddedNewBackgroundImage} style={{ width: '100%', marginTop: 7, marginBottom: 15 }} ref={(el) => (this.dropzoneRef = el)} disabled={locked}>
                                        <UploadButton disabled={locked}>
                                            <p style={{ fontSize: '12px', color: "white" }}><UploadIcon className="deposit-icon"/> New background image </p>
                                        </UploadButton>
                                    </Dropzone>
                                ) : (
                                    <div style={{ width: '100%', marginTop: 7, marginBottom: 15 }}>
                                        <RemoveButton onClick={() => this.removeNewBackgroundImage()} disabled={locked}>
                                            <p style={{ fontSize: '12px', color: "white" }}><TrashCanOutlineIcon className="deposit-icon"/> Remove background image </p>
                                        </RemoveButton>
                                    </div>
                                )}
                            </FormGroup>
                        </BackgroundItems>

                        <MuiThemeProvider theme={theme}>

                            <InputLabel>Positioning</InputLabel>
                            <RadioGroup row aria-label="position" name="position" value={position} onChange={this.handleChangePosition}>
                                <StyledFormControlLabel value={0} control={<Radio color="primary" size="small" />} label="Image on the right" disabled={locked}/>
                                <StyledFormControlLabel value={1} control={<Radio color="primary" size="small" />} label="Image on the left" disabled={locked}/>
                                <StyledFormControlLabel value={2} control={<Radio color="primary" size="small" />} label="Image on the bottom" disabled={locked}/>
                                <StyledFormControlLabel value={3} control={<Radio color="primary" size="small" />} label="Image on the top" disabled={locked}/>
                            </RadioGroup>

                            <br/>

                            <InputLabel>Location</InputLabel>
                            <RadioGroup row aria-label="location" name="location" value={location} onChange={this.handleChangeLocation}>
                                <StyledFormControlLabel value={0} control={<Radio color="primary" size="small" />} label="Before the banners" disabled={locked}/>
                                <StyledFormControlLabel value={1} control={<Radio color="primary" size="small" />} label="Before the games list" disabled={locked}/>
                                <StyledFormControlLabel value={2} control={<Radio color="primary" size="small" />} label="Before the data lists" disabled={locked}/>
                                <StyledFormControlLabel value={3} control={<Radio color="primary" size="small" />} label="Before the footer" disabled={locked}/>
                                <StyledFormControlLabel value={4} control={<Radio color="primary" size="small" />} label="After the footer" disabled={locked}/>
                            </RadioGroup>

                        </MuiThemeProvider>

                        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 0px" }}>
                            <ConfirmButton onClick={() => this.addNewSubSection()}>
                                <ContentSaveIcon style={{ marginRight: 7 }}/> Create a new Subsection
                            </ConfirmButton>
                        </div>
                    </div>
                </Container>
                </DialogContent>
            </Dialog>
        )
    }
}

export default AddSection;
