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
    backgroundItem: null,
    isLoading: false,
    locks : {
        background : true
    }
}

class Background extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    onBackgroundAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({backgroundItem : blob});
    }

    projectData = async (props) => {
        const { background } = props.profile.getApp().getCustomization();

        this.setState({...this.state, 
            backgroundItem : background ? background.id : null
        })
    }

    renderBackgroundAddImage = () => {
        return(
            <div className='dropzone-image' style={{ marginBottom: 40}}>
                <Dropzone onDrop={this.onBackgroundAddedFile} width={200} ref={(el) => (this.dropzoneRef = el)} disabled={this.state.locks.background}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Background here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src, field) => {

        switch(field){
            case 'background' : {
                this.setState({backgroundItem : null})
                break;
            };
        }

    }

    renderImage = (src, field) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return (
            <div style={{paddingBottom : 20, height : 220, overflow : 'hidden', margin : 'auto'}}>
                <button disabled={[field] == 'background' ? this.state.locks.background : true} onClick={() => this.removeImage(src, field)} 
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
        const { backgroundItem } = this.state;

        this.setState({...this.state, isLoading : true});

        switch(field){
            case 'background' : {
                const postData = {
                    background :backgroundItem
                }
                await profile.getApp().editBackgroundCustomization(postData);
                break;
            };
        }
  
        this.setState({...this.state, isLoading : false, locks : {...this.state.locks, [field] : true }});

        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { isLoading, backgroundItem } = this.state; 
        
        return (
            <Card>
                <CardBody style={{ margin: "0px 15px" }}>
                    <div style={{border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 8, height : 410, marginBottom : 30, padding : 30, maxWidth: 293 }}>
                        <EditLock 
                        isLoading={isLoading} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        confirmChanges={this.confirmChanges} 
                        type={'background'} 
                        locked={this.state.locks.background}>
                            <div style={{paddingBottom : 20}}>
                                <h5 className={"bold-text dashboard__total-stat"}>Background</h5>
                                <h6>Upload your background image</h6>
                            </div>

                            <div style={{margin : 'auto'}}>
                                {
                                    backgroundItem ? 
                                    /* Background is Set */
                                    this.renderImage(backgroundItem, 'background')
                                    : 
                                    /* Background is not Set */
                                    this.renderBackgroundAddImage()
                                }
                            </div>
                        </EditLock>
                    </div>
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

export default connect(mapStateToProps)(Background);
