import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import { Col, Row, Card, CardBody, Label } from 'reactstrap';
import { connect } from "react-redux";
import { createMuiTheme, FormControlLabel, MuiThemeProvider, Radio, RadioGroup, withStyles } from '@material-ui/core';
import styled from 'styled-components';

import _ from 'lodash';

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

class SkinsTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            locked: true,
            isLoading: false,
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

    handleChangeSkinType = event => {
        event.preventDefault();

       this.setState({ selected_skin: event.target.value })
    }

    render() {
        const { isLoading, locked, skins, selected_skin } = this.state; 

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
                                { !_.isEmpty(skins) && (
                                    <MuiThemeProvider theme={theme}>
                                        <InputLabel>Skin type</InputLabel>
                                        <br/>
                                        <RadioGroup row aria-label="position" name="position" value={selected_skin} onChange={this.handleChangeSkinType}>
                                            {skins.map(skin => (
                                                <StyledFormControlLabel value={skin.skin_type} control={<Radio color="primary" size="small" />} label={`${skin.name}`} disabled={locked}/>
                                            ))}
                                        </RadioGroup>
                                    </MuiThemeProvider>
                                )}
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
