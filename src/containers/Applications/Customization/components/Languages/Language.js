import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import { LanguageCard, LanguageCardContent, InputField, LanguageImage, InputLabel } from './styles';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import EditLock from '../../../../Shared/EditLock';
import BooleanInput from '../../../../../shared/components/BooleanInput';
import { Divider } from '@material-ui/core';
import { connect } from 'react-redux';
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
};

class Language extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locked: true,
            isLoading: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { language } = props;

        if (!_.isEmpty(language)) {
            this.setState({
                isActivated: language.isActivated,
                logo: language.logo,
                name: language.name,
                prefix: language.prefix,
                _id: language._id
            })
        }
    }

    onAddedFile = async ({ files }) => {
        const file = files[0];
        
        this.setState({ isSVG: false })

        if (file.type === 'image/svg+xml') {
            this.setState({ isSVG: true })
        }
        
        let blob = await image2base64(file.preview) // you can also to use url

        this.setState({
            logo: blob
        })
    }

    renderAddImage = () => {
        const { locked } = this.props;

        return(
            <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedFile({ files: files })} ref={(el) => (this.dropzoneRef = el)}>
                <img src={upload} className='image-info' style={{ height: 20, width: 20 }}/>
                <p className='text-center'> Drop the image here</p>
            </Dropzone>
        )
    }

    
    renderImage = (src) => {
        const { isSVG } = this.state;

        if(!src.includes("https")){
            src = isSVG ? "data:image/svg+xml;base64," + src : "data:image;base64," + src;
        }

        return src;
    }

    removeImage = () => {
        this.setState({ logo: "" })
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
        const { logo, isActivated, _id } = this.state;

        if (_.isEmpty(logo)) {
            this.setState({ locked: true })
            this.projectData(this.props)
        } else {
            this.setState({ isLoading: true });

            await profile.getApp().editLanguage({ logo: logo, isActivated: isActivated, language_id: _id });
            await profile.getApp().updateAppInfoAsync();
            await profile.update();
    
            this.setState({ isLoading: false, locked: true });
        }
    }

    render() {
        const { isActivated, logo, name, prefix, locked, isLoading } = this.state;

        return (
            <>
            <Col md={3} style={{ minWidth: 300, margin: 10 }}>
                <LanguageCard>
                    <EditLock 
                        isLoading={isLoading} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        confirmChanges={this.confirmChanges} 
                        type={'languages'} 
                        locked={locked}
                    >
                    <LanguageCardContent>
                        { !_.isEmpty(logo) ? 
                        <>  
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: -10, marginBottom: -30 }}>
                                <button
                                disabled={locked}
                                onClick={() => this.removeImage()}
                                style={{ position: "inherit", right: 20, top: 6 }}
                                className='carousel-trash button-hover'>
                                    <img src={trash} style={{width : 15, height : 15}}/>
                                </button>
                            </div>
                            <img className='application__game__image' style={{ display: 'block', width: 78, height: 78 }} src={this.renderImage(logo)}/> 
                        </>
                        : 
                        <LanguageImage>
                            { this.renderAddImage() }
                        </LanguageImage> }

                        <div style={{ display: "flex", flexDirection: "column", marginBottom: 5, padding: 10, width: "100%" }}>
                            <InputLabel for="isActivated" style={{ paddingLeft: 10 }}>{ isActivated ? "Active" : "Inactive" }</InputLabel>
                            <BooleanInput
                                checked={isActivated === true} 
                                onChange={this.onChange}
                                disabled={locked || prefix === "EN"}
                                type={'isActivated'}
                                id={'isActivated'}
                            />
                        </div>
                        <Divider/>

                        <FormGroup style={{ marginBottom: 5 }}>
                            <InputLabel for="name">Name</InputLabel>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            defaultValue={name}
                            disabled={true}
                        />
                        </FormGroup>
                        <FormGroup style={{ marginBottom: 5 }}>
                            <InputLabel for="prefix">Prefix</InputLabel>
                        <InputField
                            label="Prefix"
                            name="prefix"
                            type="text"
                            defaultValue={prefix}
                            disabled={true}
                        />
                        </FormGroup>
                    </LanguageCardContent>
                    </EditLock>
                </LanguageCard>
            </Col>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}
    
export default connect(mapStateToProps)(Language);
