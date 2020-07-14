/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { AddIcon } from 'mdi-react';
import game_images from '../../components/game_images';
import { Grid } from '@material-ui/core';
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";

class GameStoreContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    onClick = async () => {
        const { onClick, game } = this.props;
        this.setState({...this.state, isLoading : true})
        if(onClick){ await onClick(game) }
        this.setState({...this.state, isLoading : false})
    }

    render() {
        const { game, isAdded, loading } = this.props;
        const { isLoading } = this.state;
        if(!game){return null}
        const { name, description, image_url } = game;

        const game_image = game_images[String(name).toLowerCase().replace(/ /g,"_")];
        const image = game_image ? game_image : game_images.default;

        return (
            <Col md={12} xl={12} lg={12} xs={12} style={{ minWidth: 288, maxWidth: 415, height: 230 }}>
                { loading ? (
                    <Card className='game-container'>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <Grid container direction='row' spacing={1}>
                            <Grid item xs={3}>
                                <Skeleton variant="circle" width={50} height={50} style={{ marginBottom: 10, marginLeft: 'auto', marginRight: 0 }}/>
                            </Grid>
                            <Grid item xs={9}>
                                <Skeleton variant="rect" width="60%" height={30} style={{ marginTop: 10, marginBottom: 10 }}/>
                                <Skeleton variant="rect" width="100%" height={20} style={{ marginTop: 10, marginBottom: 20 }}/>
                            </Grid>           
                        </Grid>
                        <Skeleton variant="rect" width="30%" height={30} style={{ marginBottom: 10 }}/>
                    </CardBody>
                </Card>
                ) : (
                    <Card className='game-container'>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <Row>
                            <Col lg={4} >  
                                <img className='application__game__image' style={{display: 'block', height: 50, width: 50 }} src={image} alt={name}/>
                            </Col>
                            <Col lg={8} >
                                <div className="dashboard__visitors-chart text-left">
                                    <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 20}}> {name} </p>
                                    <p className="text-left secondary-text"> {description} </p>
                                </div>
                            </Col>
                        </Row>
                        <Button disabled={isLoading || isAdded} style={{margin : 0, marginTop : 10}} className="icon" onClick={() => this.onClick()} >
                            {   
                                isLoading ?
                                    "Adding"
                                : isAdded ? 
                                    "Added"
                                : 
                                    <p><AddIcon className="deposit-icon"/> Add </p>
                            }
                        </Button>
                    </CardBody>
                </Card>)}
            </Col>
        );
    }
}


function mapStateToProps(state){
    return {
        loading: state.isLoading
    };
}

export default connect(mapStateToProps)(GameStoreContainer);
