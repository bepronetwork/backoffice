import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import EditLock from '../../../../Shared/EditLock';
import _ from 'lodash';

import './styles.css';
import { Container, EditImage, Image, Label, TextField, Logo, ConvertContainer } from './styles';
import BooleanInput from '../components/utils/BooleanInput';
import { Box, Button, ButtonBase, Popover } from '@material-ui/core';
import { SwapHorizontalIcon } from 'mdi-react';
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
};

const ButtonStyle = {
    textTransform: "none", 
    backgroundColor: "#894798", 
    color: "#ffffff", 
    boxShadow: "none", 
    height: 35,
    marginTop: -55
}

const AbsoluteButtonStyle = {
    textTransform: "none", 
    border: "2px solid #894798", 
    color: "#894798", 
    backgroundColor: "#8947981a",
    boxShadow: "none", 
    height: 35,
    width: 95,
    margin: "0px 10px"
}

const RatioButtonStyle = {
    textTransform: "none", 
    border: "2px solid #894798", 
    color: "#894798", 
    backgroundColor: "#8947981a",
    boxShadow: "none", 
    height: 35,
    width: 95,
    margin: "0px 10px"
}

class PointsAddOn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            locked: true,
            loadingConversion: false,
            anchorEl: null,
            selectingAbsolute: false,
            selectingRatio: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { profile, wallet } = props;
        const { currency } = wallet;

        const points = profile.App.params.addOn.pointSystem;

        this.setState({
            currency: currency._id,
            isValid: points.isValid,
            logo: points.logo,
            name: points.name.trim(),
            ratio: points.ratio.find(ratio => ratio.currency === currency._id).value
        })
    }

    unlock = () => {
        this.setState({ locked: false });
    }

    lock = () => {
        this.setState({ locked: true });
    }

    renderImage = (src) => {
        if (!src.includes("https")) {
            src = "data:image;base64," + src;
        }

        return src;
    }

    renderAddNewImage = () => {
        const { locked } = this.state;

        return(
            <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedNewFile({ files: files })} ref={(el) => (this.dropzoneRef = el)}>
                <img src={upload} className='image-info' style={{ height: 20, width: 20 }}/>
                <p className='text-center'> Drop the new logo here</p>
            </Dropzone>
        )
    }

    getCurrencyImage = ({ id }) => {
        const { profile } = this.props;

        const wallet = profile.App.params.wallet;
        const currency = wallet.find(c => c.currency._id === id);

        return currency.image;
    }

    onChangeIsValid = () => {
        const { isValid } = this.state;

        this.setState({
            isValid: !isValid
        })
    }

    onChangeText = value => {
        this.setState({
            name: value ? value : ""
        })
    }

    onChangeRatio = value => {
        this.setState({
            ratio: value ? value : ""
        })
    }

    onAddedNewFile = async ({ files }) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview)

        this.setState({
            logo: blob
        })
    }

    removeNewLogo = () => {
        this.setState({
            logo: ""
        })
    }

    confirmChanges = async () => {
        const { isValid, logo, name, ratio, currency } = this.state;
        const { profile } = this.props;

        this.setState({
            isLoading: true
        })

        const pointSystemParams = {
            isValid: isValid,
            logo: logo,
            name: name,
            ratio: !_.isEmpty(ratio) ? parseFloat(ratio) : 0
        }
        
        await profile.getApp().editPointSystem({ currency: currency, pointSystemParams });

        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({
            isLoading: false,
            locked: true,
            anchorEl: null
        })
    }

    setOpen = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    setClose = () => {
        this.setState({ anchorEl: null, selectingAbsolute: false, selectingRatio: false })
    }

    handleConvertPoints = async ({ isAbsolut }) => {
        const { profile } = this.props;

        this.setState({ loadingConversion: true, isLoading: true });

        const { currency } = this.state;

        if (currency) {
            await profile.getApp().convertPoints({ currency: currency, isAbsolut: isAbsolut, user: 'all' });

            await profile.getApp().updateAppInfoAsync();
            await profile.update();
        }

        this.setState({ loadingConversion: false, isLoading: false, locked: true, anchorEl: null });

        this.setClose()
    }

    render() {
        const { locked, isLoading, currency, isValid, logo, name, ratio, loadingConversion, anchorEl, selectingAbsolute, selectingRatio } = this.state;

        if (_.isEmpty(currency)) return null;

        const open = Boolean(anchorEl);

        const wallet = this.props.profile.App.params.wallet;
        const walletSelected = wallet.find(c => c.currency._id === currency);

        const ticker = walletSelected.currency.ticker;

        return (
            <Container>
                <EditLock 
                    unlockField={this.unlock} 
                    lockField={this.lock} 
                    confirmChanges={this.confirmChanges} 
                    isLoading={isLoading}
                    locked={locked}>
                    
                    <h4 style={{ margin: 0, fontSize: 14 }}>Point System</h4>
                    <BooleanInput
                        checked={isValid === true}
                        onChange={this.onChangeIsValid}
                        color="primary"
                        name="isValid"
                        disabled={locked}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />

                    { isValid && (
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={event => this.setOpen(event)} variant="outlined" size="small" style={ButtonStyle} disabled={loadingConversion || locked}>
                            <SwapHorizontalIcon style={{marginRight: 3}}/> Convert points
                        </Button>
                        <Popover
                            id={"convert"}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.setClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',   
                            }}
                        >
                            <ConvertContainer>
                                <h4 style={{ margin: 0, fontSize: 16 }}>Ratio</h4>
                                <hr/>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <Button onClick={() => this.setState({ selectingAbsolute: true, selectingRatio: false })} variant="outlined" size="small" style={AbsoluteButtonStyle} disabled={loadingConversion || locked || selectingAbsolute}>
                                        Absolute
                                    </Button>
                                    <h4 style={{ margin: 0, fontSize: 14 }}>{`1 point = 1.00 ${ticker}`}</h4>
                                </div>
                                    { selectingAbsolute && <ButtonBase style={{ margin: "20px 10px"}} onClick={() => this.handleConvertPoints({ isAbsolut: true })}>
                                        <a style={{ fontSize: 14, color: "#894798" }}>{ loadingConversion && selectingAbsolute ? "Converting..." : `Yes, substitue all points for ${ticker}` }</a>
                                    </ButtonBase> }
                                
                                <br/>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <Button onClick={() => this.setState({ selectingAbsolute: false, selectingRatio: true })} variant="outlined" size="small" style={RatioButtonStyle} disabled={loadingConversion || locked || selectingRatio}>
                                        Ratio based
                                    </Button>
                                    <h4 style={{ margin: 0, fontSize: 14 }}>{`1 point = ${(1 / parseFloat(ratio)).toFixed(2)} ${ticker}`}</h4>
                                </div>
                                    { selectingRatio && <ButtonBase style={{ margin: "20px 10px"}} onClick={() => this.handleConvertPoints({ isAbsolut: false })}>
                                        <a style={{ fontSize: 14, color: "#894798" }}>{ loadingConversion && selectingRatio ? "Converting..." : `Yes, substitue all points for ${ticker}` }</a>
                                    </ButtonBase> }
                            </ConvertContainer>
                        </Popover>
                        </div>
                    )}
                    <hr/>

                    <EditImage>
                        <Label style={{ marginBottom: 10 }}>Logo</Label>
                        { _.isEmpty(logo.trim()) ? (
                            <Logo>
                                { this.renderAddNewImage() }
                            </Logo>
                        ) : (
                            <>
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "40%", marginTop: -10, marginBottom: -30 }}>
                                <button
                                disabled={locked}
                                onClick={() => this.removeNewLogo()}
                                style={{ position: "inherit", right: 20, top: 6 }}
                                className='carousel-trash button-hover'>
                                    <img src={trash} alt="Remove" style={{ width: 15, height: 15 }}/>
                                </button>
                            </div>
                            <Image alt="Logo" src={ this.renderImage(logo) }/>
                            </>
                        )}
                    </EditImage>
                    
                    <Label>Name</Label>
                    <TextField placeholder="" disabled={locked} value={name} onChange={(e) => this.onChangeText(e.target.value)}/>
                    
                    <br/>

                    <Label>Ratio</Label>
                    <TextField placeholder="" disabled={locked} value={ratio} onChange={(e) => this.onChangeRatio(e.target.value)}/>

                    <br/>
                </EditLock>
            </Container>
        )
    }

}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(PointsAddOn);