import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import ColorPickerInput from '../../../../shared/components/color_picker_input/ColorPickerInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { FormControlLabel } from '@material-ui/core';
import BooleanInput from "./utils/BooleanInput";


const defaultState = {
    locked: true,
    colors : [],
    isLoading: false
}

const COLORS = Object.freeze({
    backgroundColor: { name: "Background Color", locked: false },
    primaryColor: { name: "Boxes", locked: false },
    secondaryColor: { name: "Buttons", locked: false },
    thirdColor: { name: "", locked: true },
    forthColor: { name: "", locked: true },
    fifthColor: { name: "Title/Tab Text", locked: false },
    sixthColor: { name: "Overall Text", locked: false }, 
    seventhColor: { name: "1st Color Icons", locked: false },
    heightColor: { name: "2nd Color Icons", locked: false }
})

class Colors extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    projectData = async (props) => {
        const { colors, theme } = await props.profile.getApp().getCustomization();

        this.setState({...this.state, 
            colors,
            theme
        })
    }

    onChange = ({type, value}) => {
        let colors = this.state.colors;
        let changedColorIndex = colors.findIndex(c => c.type == type);
        colors[changedColorIndex].hex = value;
        this.setState({...this.state, colors})
    }

    onChangeTheme = async ({type, value}) => {
        const { theme } = this.state;

        const newTheme = theme === 'dark' ? 'light' : 'dark';

        this.setState({ theme: newTheme });
    }


    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        const { App } = this.props.profile;
        const { theme, colors } = this.state;
        
        this.setState({...this.state, isLoading : true});

        await App.editThemeCustomization({ theme: theme });
        await App.editColorsCustomization({colors});

        this.setState({...this.state, isLoading : false, locked: true})

        this.projectData(this.props);
    }

    renderColor = ({name, hex, type, locked, colorLock}) => {
        return (
            <>
                <ColorPickerInput 
                    label={name}
                    name={type}
                    color={hex}
                    disabled={ locked || colorLock }
                    onChange={this.onChange}
                />
            </>
        )
    }


    render() {
        const { isLoading, locked, colors, theme } = this.state; 

        return (
            <>
                <Card>
                    <h5> Note : Change of Colors will require a rebuild of the app, so expect a 5-20 min delay for the changes to take effect</h5>
                </Card>
                <Card>
                    <CardBody>
                        <EditLock 
                            isLoading={isLoading} 
                            unlockField={this.unlockField} 
                            lockField={this.lockField} 
                            confirmChanges={this.confirmChanges} 
                            type={'color'} 
                            locked={locked}
                        >
                            <h4 style={{ fontSize: 16 }}>Theme</h4>
                                <FormControlLabel
                                style={{margin: 0, marginBottom: 30, padding: 0}}
                                control={
                                    <BooleanInput
                                        disabled={isLoading || locked}
                                        checked={theme === 'light'} 
                                        onChange={this.onChangeTheme}
                                        type={'theme'}
                                        id={'check-theme'}
                                    />
                                }
                                label={theme === 'dark' ? <h4 style={{ fontSize: 14 }}>Dark</h4> 
                                : <h4 style={{ fontSize: 14 }}>Light</h4>}
                                labelPlacement="right"
                                />

                            <Row>
                                {colors.map ( c => { 
                                    return (
                                        <Col md={4}>
                                            {this.renderColor({ name: COLORS[c.type].name, type: c.type, hex: c.hex, locked: locked, colorLock: COLORS[c.type].locked })}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </EditLock>
                    </CardBody>
                </Card>
            </>
            
            )
        }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(Colors);
