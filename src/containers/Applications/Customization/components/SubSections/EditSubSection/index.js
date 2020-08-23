import React, { Component } from 'react'
import _ from 'lodash';

import '../styles.css';
import { Container, SectionGrid, Title, Text, Image, DropzoneImage, BackgroundItems, UploadButton, RemoveButton, BackgroundImage, DialogHeader, ConfirmButton } from './styles';
import { FormGroup } from 'reactstrap';
import Dropzone from 'react-dropzone'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, MuiThemeProvider, withStyles, Dialog, DialogContent, ButtonBase } from '@material-ui/core';
import ColorPicker from '../../../../../../shared/components/color_picker_input/ColorPicker';

import { InputField, InputLabel } from '../styles';
import { UploadIcon, TrashCanOutlineIcon, CloseIcon, TitleBackwardIcon, ContentSaveIcon } from 'mdi-react';

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

class EditSection extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { subSection } = props;

        if (!_.isEmpty(subSection)) {
            const { _id, position, location, image_url, background_url, background_color, title, text } = subSection;

            this.setState({ _id, position, location, image_url, background_url, background_color, title, text });
        }
    }

    handleConfirmChanges = () => {
        const { setSubSections, subSections, setClose } = this.props;
        const { _id, position, location, image_url, background_url, background_color, title, text } = this.state;

        const index = subSections.findIndex(subSection => subSection._id === _id);
        const newSubSections = [...subSections];

        newSubSections[index] = { _id, position, location, image_url, background_url, background_color, title, text };
        
        setSubSections({
            newSubSections: newSubSections.filter(subSections => !_.isEmpty(subSections))
        })

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

        this.setState({ image_url: blob })
    }

    onAddedNewBackgroundImage = async (files) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview)

        this.setState({ background_url: blob })
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
        this.setState({ image_url: "" })
    }

    removeNewBackgroundImage = () => {
        this.setState({ background_url: "" })
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
        this.setState({ background_color: value })
    }

    handleChangeNewTitle = ({ value }) => {
        this.setState({ title: value ? value : "" })
    }

    handleChangeNewText = ({ value }) => {
        this.setState({ text: value ? value : "" })
    }

    render() {
        const { locked, open, setClose, subSection } = this.props;

        if (!subSection) return null;

        const { position, location, image_url, background_url, background_color, title, text } = this.state;

        return (
            <Dialog open={open} fullWidth maxWidth="lg">
                <DialogHeader>
                    <ButtonBase onClick={() => setClose()}>
                        <CloseIcon/>
                    </ButtonBase>
                </DialogHeader>
                <DialogContent>
                    <Container>
                        <SectionGrid className={positionsEnum[position]} backgroundColor={background_color}>
                            <Title>
                                <h1>{title}</h1>
                            </Title>
                            <Text>
                                <p>{text}</p>
                            </Text>
                            
                            { background_url && (
                                <BackgroundImage>
                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Background" src={this.renderImage(background_url)}/> 
                                </BackgroundImage>
                            )}

                            <Image>
                            { image_url ? (
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
                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Image" src={this.renderImage(image_url)}/> 
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
                                value={title}
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
                                value={text}
                                disabled={locked}
                                onChange={(e) => this.handleChangeNewText({ value: e.target.value })}
                            />
                        </FormGroup>

                        <BackgroundItems>
                            <FormGroup style={{ marginTop: 10 }}>
                                <InputLabel for="backgroundColor">Background color</InputLabel>
                                <ColorPicker
                                    name="backgroundColor"
                                    color={background_color}
                                    disabled={locked}
                                    onChange={this.handleChangeBackgroundColor}
                                />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 10 }}>
                                <InputLabel>Background image</InputLabel>
                                { !background_url ? (
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
                        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px" }}>
                            <ConfirmButton onClick={() => this.handleConfirmChanges()}>
                                <ContentSaveIcon style={{ margin: "0px 7px" }}/> Confirm changes
                            </ConfirmButton>
                        </div>
                    </div>
                </Container>
                </DialogContent>
            </Dialog>
        )
    }
}

export default EditSection;
