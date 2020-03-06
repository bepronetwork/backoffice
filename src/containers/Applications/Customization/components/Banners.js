import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import AliceCarousel from 'react-alice-carousel'
import Dropzone from 'react-dropzone'
import 'react-alice-carousel/lib/alice-carousel.css'
const image2base64 = require('image-to-base64');
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;

const defaultState = {
    autoDisplay: false,
    items: [],
    links: [],
    banners: [],
    locked: true,
    isLoading: false
}

class Banners extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
    }

    onAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        const banner = {
            image_url : blob,
            link_url : ''
        }

        this.setState({ banners : this.state.banners.concat([banner]) });
    }

    projectData = async (props) => {
        const { banners } = props.profile.getApp().getCustomization();
        const { ids, autoDisplay } = banners;
        this.setState({...this.state, 
            banners : ids,
            autoDisplay
        })
    }

    renderAddImage = () => {
        return(
            <div className='dropzone-image'>
                <Dropzone onDrop={this.onAddedFile} width='100%' ref={(el) => (this.dropzoneRef = el)} disabled={this.state.locked}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Banner here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src, index) => {
        let banners = this.state.banners;
        banners.splice(index, 1);

        this.setState({ banners });
    }

    renderImage = (src, index) => {
        const banners = this.state.banners;
        const link_url = banners[index].link_url;

        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }
        return (
            <div style={{width : '100%', height : 240, margin : 'auto'}}>
                <button disabled={this.state.locked} onClick={() => this.removeImage(src, index)} className='carousel-trash button-hover' style={{right: '0%'}}>
                    <img src={trash} style={{width : 15, height : 15}}/>
                </button>
                <img src={src} onDragStart={this.handleOnDragStart} style={{height : '100%'}}/>
                <div style={{marginTop : 36}}>
                    <TextInput
                        name="link_url"
                        label="Link URL"
                        type="text"
                        value={link_url}
                        defaultValue={link_url}
                        disabled={this.state.locked}
                        index={index}
                        changeContent={(name, value, index) => this.onChange({name, value, index})}
                    />
                </div>
            </div>
        )
    }

    onChange = ({name, value, index}) => {
        let banners = this.state.banners;
        banners[index].link_url = value;
        this.setState({...this.state, banners })
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        const { banners } = this.state;

        this.setState({...this.state, isLoading : true});
        const postData = {
            banners,
            autoDisplay : false
        }
        await profile.getApp().editBannersCustomization(postData);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { isLoading, locked, autoDisplay, banners } = this.state; 
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col md={12}>
                            <EditLock 
                                isLoading={isLoading} 
                                unlockField={this.unlockField} 
                                lockField={this.lockField} 
                                confirmChanges={this.confirmChanges} 
                                type={'announcementTab'} 
                                locked={locked}
                            >
                                <div style={{width : '96%', margin : 'auto'}}>
                                    <Row>
                                        {banners.map((i, index) => {
                                            return (
                                                <Col lg={6}>
                                                    <div style={{border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 8, height : 410, marginBottom : 30, padding : 30}}>
                                                        {this.renderImage(i.image_url, index)}
                                                    </div>
                                                </Col>
                                            )
                                        })}
                                        <Col lg={6}>
                                            <div style={{border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 8, height : 270, marginBottom : 30, padding : 30}}>
                                                {this.renderAddImage(banners.length)}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
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

export default connect(mapStateToProps)(Banners);
