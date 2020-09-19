import React, { Component } from 'react'
import EditLock from '../../../../Shared/EditLock.js';
import { Col, Row, Card, CardBody, Label } from 'reactstrap';
import { connect } from "react-redux";
import { ButtonBase, Checkbox, createMuiTheme, MuiThemeProvider, withStyles, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import styled from 'styled-components';
import _ from 'lodash';

import { SkinPreview, MobileSkinPreview, MobileSkinsContainer, Header, Container } from './styles'

const defaultHome = `${process.env.PUBLIC_URL}/img/landing/default-home.png`;
const defaultHomeMobile = `${process.env.PUBLIC_URL}/img/landing/default-home-mobile.png`;

const digitalHome = `${process.env.PUBLIC_URL}/img/landing/digital-home.png`;
const digitalHomeMobile = `${process.env.PUBLIC_URL}/img/landing/digital-home-mobile.png`;


const theme = createMuiTheme({
    palette: {
      primary: { 
        main: '#894798' 
        }
    },
});


const cardStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none"
}

export const InputLabel = styled(Label)`
    font-size: 18px;
    font-family: Poppins;

    margin-bottom: 35px;
`;

const WhiteCheckbox = withStyles({
    root: {
      color: 'white',
      '&$checked': {
        color: 'white',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const StyledFormControlLabel = withStyles({
    label: {
      fontFamily: "Poppins",
      fontSize: "15px"
    },
})(FormControlLabel);

class SkinsTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            locked: true,
            isLoading: false,
            previewType: 'desktop',
            skins: []
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

        const skins = await profile.getApp().getEcosystemSkins();

        const app = await profile.getApp();
        const { params } = app;

        const selected_skin = params.customization.skin.skin_type;
        const _id = params.customization.skin._id;

        this.setState({ 
            skins: skins.data ? skins.data.message : [], 
            selected_skin: selected_skin ? selected_skin : "default",
            _id: _id 
        })
    }

    onChange = ({ type, value }) => {
        this.setState({ [type]: value })
    }

    unlockField = () => {
        this.setState({ locked: false})
    }

    lockField = () => {
        this.setState({ locked: true})
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { selected_skin, skins, _id } = this.state;

        this.setState({ isLoading: true });

        const skin = skins.find(skin => skin.skin_type === selected_skin);

        await profile.getApp().editSkinTypeCustomization({ skinParams: {
            _id: _id,
            skin_type: skin.skin_type,
            name: skin.name
        }});

        this.setState({ isLoading: false, locked: true });

        this.projectData(this.props);
    }

    handleChangePreviewType = event => {
        event.preventDefault();

       this.setState({ previewType: event.target.value })
    }

    render() {
        const { isLoading, locked, skins, selected_skin, previewType } = this.state; 

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
                            <Container>
                                <div className="header">
                                    <h1>Skin type</h1>
                                    <p>You can choose from available skins types</p>
                                    <hr/>
                                </div>
                            { !_.isEmpty(skins) && (
                                    <MuiThemeProvider theme={theme}>
                                        {/* <RadioGroup row aria-label="previewType" name="previewType" value={previewType} onChange={this.handleChangePreviewType}>
                                            <StyledFormControlLabel value={"desktop"} control={<Radio color="primary" size="small" />} label={"Desktop"} disabled={locked}/>

                                            <StyledFormControlLabel value={"mobile"} control={<Radio color="primary" size="small" />} label={"Mobile"} disabled={locked}/>
                                        </RadioGroup>
                                        <br/>

                                        { previewType === 'mobile' ? (
                                        <MobileSkinsContainer>
                                            <ButtonBase onClick={() => this.setState({ selected_skin: 'default' })} disabled={locked}>
                                                <MobileSkinPreview selected={selected_skin === 'default'}>
                                                    <Header>
                                                        <h1>Default</h1> <WhiteCheckbox checked={selected_skin === 'default'} size="small"/>
                                                    </Header>
                                                    <img src={defaultHomeMobile} alt="Default home" />
                                                </MobileSkinPreview>
                                            </ButtonBase>
                                        
                                            <ButtonBase onClick={() => this.setState({ selected_skin: 'digital' })} disabled={locked}>
                                                <MobileSkinPreview selected={selected_skin === 'digital'}>
                                                    <Header>
                                                        <h1>Digital</h1> <WhiteCheckbox checked={selected_skin === 'digital'} size="small"/>
                                                    </Header>
                                                    <img src={digitalHomeMobile} alt="Digital home" />
                                                </MobileSkinPreview>
                                            </ButtonBase>

                                            <div></div>
                                        </MobileSkinsContainer>
                                        ) : (
                                            <> */}
                                            <ButtonBase onClick={() => this.setState({ selected_skin: 'default' })} disabled={locked}>
                                                <SkinPreview selected={selected_skin === 'default'}>
                                                    <Header>
                                                        <h1>Default</h1> <WhiteCheckbox checked={selected_skin === 'default'} size="small"/>
                                                    </Header>
                                                    <img src={defaultHome} alt="Default home" />
                                                </SkinPreview>
                                            </ButtonBase>
                                            

                                            <br/>
                                            <br/>

                                            <ButtonBase onClick={() => this.setState({ selected_skin: 'digital' })} disabled={locked}>
                                                <SkinPreview selected={selected_skin === 'digital'}>
                                                    <Header>
                                                        <h1>Digital</h1> <WhiteCheckbox checked={selected_skin === 'digital'} size="small"/>
                                                    </Header>
                                                    <img src={digitalHome} alt="Digital home" />
                                                </SkinPreview>
                                            </ButtonBase>
                                            {/* </>
                                        )} */}
                                    </MuiThemeProvider>
                                )}
                            </Container>
                                
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

export default connect(mapStateToProps)(SkinsTab);
