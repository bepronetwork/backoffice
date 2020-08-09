import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import EditLock from '../../../../Shared/EditLock';
import RangeSlider from 'react-bootstrap-range-slider';
import _ from 'lodash';

import './styles.css';
import { Container, EditImage, Image, Label, TextField, Logo } from './styles';
import BooleanInput from '../components/utils/BooleanInput';
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
};

class PointsAddOn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            locked: true
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
            locked: true
        })
    }

    render() {
        const { locked, isLoading, currency, isValid, logo, name, ratio } = this.state;

        if (_.isEmpty(currency)) return null;

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