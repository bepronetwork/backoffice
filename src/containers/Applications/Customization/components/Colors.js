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
        const App = this.props.profile.getApp();

        const newTheme = theme === 'dark' ? 'light' : 'dark';

        this.setState({ isLoading: true });

        this.setState({ theme: newTheme });
        await App.editThemeCustomization({ theme: newTheme });

        this.setState({ isLoading: false });
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : true});
        const { colors } = this.state;
        await profile.getApp().editColorsCustomization({colors});
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }

    renderColor = ({hex, type, locked}) => {
        return (
            <>
                <p>{type}</p>
                <ColorPickerInput 
                    label={type}
                    name={type}
                    color={hex}
                    disabled={locked}
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
                        <h4 style={{ fontSize: 16 }}>Theme</h4>
                        <FormControlLabel
                                style={{margin: 0, marginBottom: 30, padding: 0}}
                                control={
                                    <BooleanInput
                                        disabled={isLoading}
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

                        <EditLock 
                            isLoading={isLoading} 
                            unlockField={this.unlockField} 
                            lockField={this.lockField} 
                            confirmChanges={this.confirmChanges} 
                            type={'color'} 
                            locked={locked}
                        >
                            <Row>
                                {colors.map ( c => { 
                                    return (
                                        <Col md={4}>
                                            {this.renderColor({type : c.type, hex : c.hex, locked})}
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
