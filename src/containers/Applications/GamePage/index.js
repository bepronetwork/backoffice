import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import Slider from './components/Slider';
import Numbers from '../../../services/numbers';
import game_images from '../components/game_images';
import { ArrowExpandRightIcon, LockIcon, BankIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import EditLock from '../../Shared/EditLock';
const image2base64 = require('image-to-base64');
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const edge = `${process.env.PUBLIC_URL}/img/dashboard/edge.png`;
const tableLimit = `${process.env.PUBLIC_URL}/img/dashboard/tableLimit.png`;


const defaultState = {
    name : 'N/A',
    edge : 0,
    tableLimit : 0,
    new_tableLimit : 0,
    currencyTicker : 'N/A',
    new_edge : 0,
    id : 'N/A',
    imageItem: null,
    backgroundItem: null,
    locks : {
        tableLimit : true,
        edge : true,
        image : true,
        background : true
    },
    isLoading : {
        edge : false,
        tableLimit : false,
        image : false,
        background : false
    }
}

class GamePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    getUpdatedGame({props, game}){
        const gamesInfo = props.profile.getApp().getSummaryData('gamesInfo').data.data.message;
        return {...game, ...gamesInfo.find( g => g._id == game._id)};
    }
    
    projectData = (props) => {
        let game = this.getUpdatedGame({props, game : props.game});
        if(!game){return null}
        let { edge, name, profit, _id, betsAmount, betAmount, fees, tableLimit, image_url, background_url } = game;
        let currencyTicker = props.profile.getApp().getCurrencyTicker();
        this.setState({...this.state, 
            edge,
            tableLimit,
            currencyTicker,
            name,
            profit : Numbers.toFloat(profit),
            id : _id,
            turnover : Numbers.toFloat(betsAmount),
            betAmount : Numbers.toFloat(betAmount), 
            fees : Numbers.toFloat(fees),
            imageItem : image_url,
            backgroundItem : background_url
        })
    }

    onAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({imageItem : blob});
    }

    onBackgroundAddedFile = async (files) => {
        const file = files[0];
        let blob = await image2base64(file.preview) // you can also to use url
        this.setState({backgroundItem : blob});
    }

    renderAddImage = () => {
        return(
            <div className='dropzone-image'>
                <Dropzone onDrop={this.onAddedFile} ref={(el) => (this.dropzoneRef = el)} 
                    style={{height:120, borderWidth: 2, borderolor: "#666666", borderStyle: "dashed", borderRadius: 5}}
                    disabled={this.state.locks.image}>
                    <img src={upload} className='image-info' style={{marginTop : 20, marginBottom : 20}}/>
                    <p className='text-center'> Drop image here</p>
                </Dropzone>
            </div>
        )
    }

    renderAddBackground = () => {
        return(
            <div className='dropzone-image'>
                <Dropzone onDrop={this.onBackgroundAddedFile} ref={(el) => (this.dropzoneRef = el)} 
                    style={{height:120, borderWidth: 2, borderolor: "#666666", borderStyle: "dashed", borderRadius: 5}}
                    disabled={this.state.locks.background}>
                    <img src={upload} className='image-info' style={{marginTop : 20, marginBottom : 20}}/>
                    <p className='text-center'> Drop background image here</p>
                </Dropzone>
            </div>
        )
    }

    removeImage = (src, field) => {
        switch(field){
            case 'image' : {
                this.setState({imageItem : null})
                break;
            };
            case 'background' : {
                this.setState({backgroundItem : null})
                break;
            }
        }

    }

    renderImage = (src, field) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return (
            <div style={{paddingBottom : 20, height : 220, overflow : 'hidden', margin : 'auto', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 5}}>
                <button disabled={[field] == 'image' ? this.state.locks.image : [field] == 'background' ? this.state.locks.background : true} onClick={() => this.removeImage(src, field)} 
                    style={{right : 20, top : 6}}
                    className='carousel-trash button-hover'>
                    <img src={trash} style={{width : 15, height : 15}}/>
                </button>
                <img src={src} onDragStart={this.handleOnDragStart}/>
            </div>
        )
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [`new_${type}`] : value })
    }

    unlockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : false }})
    }

    lockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : true }, isLoading : false})
    }

    confirmChanges = async ({field}) => {
        var { profile } = this.props;
        const { imageItem, backgroundItem } = this.state;

        this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : true}})

        switch(field){
            case 'edge' : {
                // Change Edge
                await profile.getApp().editEdge({game : this.state.id, edge : this.state[`new_${field}`]});
                break;
            };
            case 'tableLimit' : {
                // Change Table Limit
                let res = await profile.getApp().editTableLimit({game : this.state.id, tableLimit : this.state[`new_${field}`]});
                break;
            }
            case 'image' : {
                const postData = {
                    image_url : imageItem,
                    game : this.state.id
                }
                await profile.getApp().editGameImage(postData);
                break;
            }
            case 'background' : {
                const postData = {
                    background_url : backgroundItem,
                    game : this.state.id
                }
                await profile.getApp().editBackgroundImage(postData);
                break;
            };
        }
        await profile.setGameDataAsync();
        this.projectData(this.props);
        this.setState({...this.state, isLoading : {...this.state.isLoading, [field] : false}})
        this.lockField({field});
    }



    render = () => {
        const { imageItem, backgroundItem } = this.state; 
        let game_image = game_images[new String(this.state.name).toLowerCase().replace(/ /g,"_")];
        const image = game_image ? game_image : game_images.default;

        return (
            <Container className="dashboard">
                <Row>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col lg={4}>
                                        <img className='application__game__image' src={image}/>
                                    </Col>
                                    <Col lg={8}>
                                        <h5 className="">Game Name</h5>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.name}</h3>
                                        <p style={{marginTop : 10}} className={"dashboard__total-stat"}>#{this.state.id}</p>
                                    </Col>
                                </Row>
                               
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <h5 className="">Bets Amount</h5>
                                        <p className="dashboard__visitors-chart-number-second">
                                            <AnimationNumber decimals={0} number={this.state.betAmount}/> 
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <h5 className="">Turnover</h5>
                                        <p className="dashboard__visitors-chart-number-second">
                                            <AnimationNumber decimals={0} number={this.state.turnover}/> 
                                            <span> {this.state.currencyTicker} </span> 
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <h5 className="">Profit</h5>
                                        <p className="dashboard__visitors-chart-number-second">
                                            <AnimationNumber decimals={0} number={this.state.profit}/> 
                                            <span> {this.state.currencyTicker} </span> 
                                        </p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
                <Row>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={edge}/>
                                        <hr></hr>
                                        <h5 className="">Edge</h5>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.edge}%</h3>
                                    </Col>
                                    <Col md={8}>
                                        <EditLock 
                                            unlockField={this.unlockField} 
                                            lockField={this.lockField} 
                                            confirmChanges={this.confirmChanges} 
                                            type={'edge'} 
                                            isLoading={this.state.isLoading.edge}
                                            locked={this.state.locks.edge}>
                                            <h6 className="">New Edge </h6>
                                            <h5 className={"bold-text dashboard__total-stat"}>{this.state.new_edge}%</h5>
                                            <Slider disabled={this.state.locks.edge} value={this.state.edge} onChange={this.onChange}/>
                                        </EditLock>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={tableLimit}/>
                                        <hr></hr>
                                        <h5 className="">Table Limit ({this.state.currencyTicker})</h5>
                                        <h3 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>{this.state.tableLimit}</h3>
                                    </Col>
                                    <Col md={8}>
                                        <EditLock 
                                            unlockField={this.unlockField} 
                                            lockField={this.lockField} 
                                            confirmChanges={this.confirmChanges} 
                                            type={'tableLimit'} 
                                            isLoading={this.state.isLoading.tableLimit}
                                            locked={this.state.locks.tableLimit}>
                                            <h6 className="">New Table Limit </h6>
                                            <h5 className={"bold-text dashboard__total-stat"}>{this.state.new_tableLimit} {this.state.currencyTicker} </h5>
                                            <TextInput
                                                icon={BankIcon}
                                                name="tableLimit"
                                                label="Table Limit"
                                                type="number"
                                                disabled={this.state.locks.tableLimit}
                                                changeContent={ (type, value) => this.onChange({type, value})}
                                            />
                                        </EditLock>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <div style={{paddingBottom : 20}}>
                                            <h5 className={"bold-text dashboard__total-stat"}>Image</h5>
                                            <hr/>
                                            <h6>Upload game image</h6>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <EditLock 
                                        unlockField={this.unlockField} 
                                        lockField={this.lockField} 
                                        confirmChanges={this.confirmChanges} 
                                        type={'image'} 
                                        isLoading={this.state.isLoading.image}
                                        locked={this.state.locks.image}>
                                        
                                            <div style={{margin : 'auto'}}>
                                                {
                                                    imageItem ? 
                                                    this.renderImage(imageItem, 'image')
                                                    :
                                                    this.renderAddImage()
                                                }
                                            </div>
                                        </EditLock>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <div style={{paddingBottom : 20}}>
                                            <h5 className={"bold-text dashboard__total-stat"}>Background</h5>
                                            <hr/>
                                            <h6>Upload background game image</h6>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <EditLock 
                                        unlockField={this.unlockField} 
                                        lockField={this.lockField} 
                                        confirmChanges={this.confirmChanges} 
                                        type={'background'} 
                                        isLoading={this.state.isLoading.background}
                                        locked={this.state.locks.background}>
                                        
                                            <div style={{margin : 'auto'}}>
                                                {
                                                    backgroundItem ? 
                                                    this.renderImage(backgroundItem, 'background')
                                                    :
                                                    this.renderAddBackground()
                                                }
                                            </div>
                                        </EditLock>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
          </Container>
        )
    }
}  

function mapStateToProps(state){
    return {
        profile: state.profile,
        game : state.game
    };
}



export default connect(mapStateToProps)(GamePageContainer);

