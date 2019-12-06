import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import { connect } from "react-redux";
import Dropzone from 'react-dropzone'
import { Card, CardBody } from 'reactstrap';
import 'react-alice-carousel/lib/alice-carousel.css'
const image2base64 = require('image-to-base64');
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;

const defaultState = {
    item: null,
    locked: true,
    isLoading: false
}

class Logo extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    onAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({item : blob});
    }

    projectData = async (props) => {
        const { logo } = props.profile.getApp().getCustomization();
        console.log(props.profile.getApp().getCustomization())
        const { id } = logo;
        this.setState({...this.state, 
            item : id,
        })
    }

    renderAddImage = () => {
        return(
            <div className='dropzone-image'>
                <Dropzone onDrop={this.onAddedFile} width={400} ref={(el) => (this.dropzoneRef = el)}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Logo here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src) => {
        if(src.includes("https")){
            // Not new
            this.setState({item : null})
        }else{
            this.setState({item : null})
        }
    }

    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return (
            <div style={{width : 500, height : 240, overflow : 'hidden', margin : 'auto'}}>
                <button disabled={this.state.locked} onClick={() => this.removeImage(src)} className='carousel-trash button-hover'>
                    <img src={trash} style={{width : 15, height : 15}}/>
                </button>
                <img src={src} onDragStart={this.handleOnDragStart}/>
            </div>
        )
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [type] : value })
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        const { item } = this.state;

        this.setState({...this.state, isLoading : true});
        
        const postData = {
            logo : item
        }
        await profile.getApp().editLogoCustomization(postData);

        this.setState({...this.state, isLoading : false, locked: true});

        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { isLoading, locked, item } = this.state; 
        
        return (
            <Card>
                <CardBody>
                    <EditLock 
                        isLoading={isLoading} 
                        unlockField={this.unlockField} 
                        lockField={this.lockField} 
                        confirmChanges={this.confirmChanges} 
                        type={'logo'} 
                        locked={locked}
                    >
                    <div style={{width : '80%', height : 200, margin : 'auto'}}>
                        {
                            item ? 
                            /* Logo is Set */
                            this.renderImage(item)
                            : 
                            /* Logo is not Set */
                            this.renderAddImage()
                        }
                    </div>
                    </EditLock>
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
