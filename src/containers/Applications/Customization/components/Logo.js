import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import { connect } from "react-redux";
import Dropzone from 'react-dropzone';
import { Col, Row, Card, CardBody } from 'reactstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
const image2base64 = require('image-to-base64');
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;

const defaultState = {
    logoItem: null,
    faviconItem: null,
    loadingGifItem: null,
    isLoading: false,
    locks : {
        logo : true,
        favicon : true,
        loadingGif : true
    }
}

class Logo extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    onLogoAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({logoItem : blob});
    }

    onFaviconAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({faviconItem : blob});
    }

    onLoadingGifAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({loadingGifItem : blob});
    }

    projectData = async (props) => {
        const { logo, topIcon, loadingGif } = props.profile.getApp().getCustomization();

        this.setState({...this.state, 
            logoItem : logo ? logo.id : null,
            faviconItem : topIcon ? topIcon.id : null,
            loadingGifItem : loadingGif ? loadingGif.id : null
        })
    }

    renderLogoAddImage = () => {
        return(
            <div className='dropzone-image' style={{ marginBottom: 40}}>
                <Dropzone onDrop={this.onLogoAddedFile} width={200} ref={(el) => (this.dropzoneRef = el)}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Logo here</p>
                </Dropzone>
            </div>
        )
    }

    renderFaviconAddImage = () => {
        return(
            <div className='dropzone-image' style={{ marginBottom: 40}}>
                <Dropzone onDrop={this.onFaviconAddedFile} width={200} ref={(el) => (this.dropzoneRef = el)}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Favicon here</p>
                </Dropzone>
            </div>
        )
    }

    renderLoadingGifAddImage = () => {
        return(
            <div className='dropzone-image' style={{ marginBottom: 40}}>
                <Dropzone onDrop={this.onLoadingGifAddedFile} width={200} ref={(el) => (this.dropzoneRef = el)}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Loading Image here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src, field) => {

        switch(field){
            case 'logo' : {
                this.setState({logoItem : null})
                break;
            };
            case 'favicon' : {
                this.setState({faviconItem : null})
                break;
            }
            ;
            case 'loadingGif' : {
                this.setState({loadingGifItem : null})
                break;
            }
        }

    }

    renderImage = (src, field) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return (
            <div style={{paddingBottom : 20, height : 220, overflow : 'hidden', margin : 'auto'}}>
                <button disabled={[field] == 'logo' ? this.state.locks.logo : [field] == 'favicon' ? this.state.locks.favicon : [field] == 'loadingGif' ? this.state.locks.loadingGif : true} onClick={() => this.removeImage(src, field)} 
                    style={{right : 20, top : 6}}
                    className='carousel-trash button-hover'>
                    <img src={trash} style={{width : 15, height : 15}}/>
                </button>
                <img src={src} onDragStart={this.handleOnDragStart}/>
            </div>
        )
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [type] : value })
    }

    unlockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : false }})
    }   

    lockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : true }})
    }

    confirmChanges = async ({field}) => {
        var { profile } = this.props;
        const { logoItem, faviconItem, loadingGifItem } = this.state;

        this.setState({...this.state, isLoading : true});

        switch(field){
            case 'logo' : {
                const postData = {
                    logo : logoItem
                }
                await profile.getApp().editLogoCustomization(postData);
                break;
            };
            case 'favicon' : {
                const postData = {
                    topIcon : faviconItem
                }
                await profile.getApp().editFaviconCustomization(postData);
                break;
            };
            case 'loadingGif' : {
                const postData = {
                    loadingGif : loadingGifItem
                }
                await profile.getApp().editLoadingGifCustomization(postData);
                break;
            }
        }
  
        this.setState({...this.state, isLoading : false, locks : {...this.state.locks, [field] : true }});

        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { isLoading, logoItem, faviconItem, loadingGifItem } = this.state; 
        
        return (
            <Card>
                <CardBody style={{ margin: 10, minWidth: 320, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 15 }}>
                    <Row>
                        <Col md={6}>
                            <div style={{ border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: "white", borderRadius: 8, height: 410, marginBottom: 30, padding: 15 }}>
                                <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'logo'} 
                                locked={this.state.locks.logo}>
                                    <div style={{paddingBottom : 20}}>
                                        <h5 className={"bold-text dashboard__total-stat"}>Logo</h5>
                                        <h6>Upload your logo</h6>
                                    </div>

                                    <div style={{margin : 'auto'}}>
                                        {
                                            logoItem ? 
                                            /* Logo is Set */
                                            this.renderImage(logoItem, 'logo')
                                            : 
                                            /* Logo is not Set */
                                            this.renderLogoAddImage()
                                        }
                                    </div>
                                </EditLock>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div style={{ border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: "white", borderRadius: 8, height: 410, marginBottom: 30, padding: 15 }}>
                                <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'favicon'} 
                                locked={this.state.locks.favicon}>
                                    <div style={{paddingBottom : 20}}>
                                        <h5 className={"bold-text dashboard__total-stat"}>Favicon</h5>
                                        <h6>Upload your favicon</h6>
                                    </div>

                                    <div style={{margin : 'auto'}}>
                                        {
                                            faviconItem ? 
                                            this.renderImage(faviconItem, 'favicon')
                                            : 
                                            this.renderFaviconAddImage()
                                        }
                                    </div>
                                </EditLock>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={6}>
                            <div style={{ border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: "white", borderRadius: 8, height: 410, marginBottom: 30, padding: 15 }}>
                                <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'loadingGif'} 
                                locked={this.state.locks.loadingGif}>
                                    <div style={{paddingBottom : 20}}>
                                        <h5 className={"bold-text dashboard__total-stat"}>Loading Image</h5>
                                        <h6>Upload your Loading Image</h6>
                                    </div>

                                    <div style={{margin : 'auto'}}>
                                        {
                                            loadingGifItem ? 
                                            this.renderImage(loadingGifItem, 'loadingGif')
                                            : 
                                            this.renderLoadingGifAddImage()
                                        }
                                    </div>
                                </EditLock>
                            </div>
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

export default connect(mapStateToProps)(Logo);
