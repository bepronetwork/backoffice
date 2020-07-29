import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import EditLock from '../../../../Shared/EditLock';
import { UploadIcon } from 'mdi-react';
import RangeSlider from 'react-bootstrap-range-slider';
import _ from 'lodash';

import './styles.css';
import { Container, EditImage, Image, Name, UploadButton, Label, TextField } from './styles';
import { Input } from 'reactstrap';


class PointsAddOn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            locked: false,
            ratio: 0.5
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { wallet } = props;
        const { currency } = wallet;

        this.setState({
            currency: currency
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

    getCurrencyImage = ({ id }) => {
        const { profile } = this.props;

        const wallet = profile.App.params.wallet;
        const currency = wallet.find(c => c.currency._id === id);

        return currency.image;
    }

    onChangeText = value => {
        
    }

    onChangeRatio = value => {
        const { ratio } = this.state;

        this.setState({
            ratio: value ? value : ratio
        })
    }

    render() {
        const { locked, isLoading, currency, ratio } = this.state;

        if (_.isEmpty(currency)) return null;

        const { _id, name, image } = currency;

        return (
            <Container>
                <EditLock 
                    unlockField={this.unlock} 
                    lockField={this.lock} 
                    confirmChanges={this.confirmChanges} 
                    isLoading={isLoading}
                    locked={locked}>

                    <EditImage>
                        <Image alt="Currency" src={ image ? this.renderImage(image) : this.getCurrencyImage(_id) }/>
                        {/* <Name>
                            { name }
                        </Name> */}
                        <Dropzone onDrop={this.onAddedFile} style={{ width: '100%', marginTop: 7, marginBottom: 15 }} ref={(el) => (this.dropzoneRef = el)} disabled={this.state.lock}>
                            <UploadButton variant="outlined" size="small" disabled={locked}>
                                <p><UploadIcon className="deposit-icon"/> New Logo </p>
                            </UploadButton>
                        </Dropzone>
                    </EditImage>
                    
                    <Label>Name</Label>
                    <TextField placeholder="" disabled={locked} value={name} onChange={(e) => this.onChangeText(e.target.value)}/>
                    
                    <br/>

                    <Label>Ratio</Label>
                    <RangeSlider 
                        min={0}
                        max={1}
                        step={0.1}
                        value={ratio}
                        tooltip="on"
                        onChange={changeEvent => this.onChangeRatio(changeEvent.target.value)}
                        />

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