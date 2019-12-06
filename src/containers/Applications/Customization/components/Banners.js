import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import BooleanInput from '../../../../shared/components/BooleanInput';
import ColorPickerInput from '../../../../shared/components/color_picker_input/ColorPickerInput';
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
    new_items : [],
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
        this.setState({new_items : this.state.new_items.concat([blob])});
    }

    projectData = async (props) => {
        const { banners } = props.profile.getApp().getCustomization();
        const { ids, autoDisplay } = banners;
        this.setState({...this.state, 
            items : ids,
            autoDisplay
        })
    }

    renderAddImage = () => {
        return(
            <div className='dropzone-image'>
                <Dropzone onDrop={this.onAddedFile} width={400} ref={(el) => (this.dropzoneRef = el)}>
                    <img src={upload} className='image-info' style={{marginTop : 50}}/>
                    <p className='text-center'> Drop the Banner here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src) => {
        if(src.includes("https")){
            // Not new
            const index = this.state.items.indexOf(src);
            let items = this.state.items;
            items.splice(index, 1);
            this.setState({items})
        }else{
            // New Item
            const index = this.state.new_items.indexOf(src);
            let new_items = this.state.new_items;
            new_items.splice(index, 1);
            this.setState({new_items})
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
        const { items, new_items } = this.state;

        this.setState({...this.state, isLoading : true});
        const postData = {
            banners : items.concat(new_items),
            autoDisplay : false
        }
        await profile.getApp().editBannersCustomization(postData);
        this.setState({...this.state, isLoading : false, locked: true, new_items : []})
        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { isLoading, locked, autoDisplay, items, new_items } = this.state; 
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
                            <div style={{width : '80%', height : 350, margin : 'auto'}}>
                               
                                <AliceCarousel 
                                    infinite={false}
                                    ref={(el) => (this.Carousel = el)}
                                    autoPlay={true}
                                    startIndex={0}
                                    mouseTrackingEnabled={true}
                                    items={new_items.map(i => this.renderImage(i)).concat(items.map(i => this.renderImage(i)).concat(this.renderAddImage()))}
                                />
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
