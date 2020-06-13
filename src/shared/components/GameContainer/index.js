import React from 'react';
import { connect } from "react-redux";
import { ButtonBase, Dialog, DialogContent, Button } from '@material-ui/core';
import { Row, Col, Card, CardBody } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AnimationNumber from '../../../containers/UI/Typography/components/AnimationNumber';
import { CloseIcon, ArrowTopRightIcon, TableIcon, JsonIcon } from 'mdi-react';
import { DialogHeader, CloseButton, Title } from './styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { CSVLink } from 'react-csv';
import { Button as MaterialButton } from "@material-ui/core";
import { export2JSON } from '../../../utils/export2JSON';

class GameContainer extends React.Component {
 
    constructor() {
        super();
        this.state = {
            open: false,
            game: {},
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
        const { id, profile } = props;

        if (!_.isEmpty(this.state.game)) {
            const allGames = this.props.profile.getApp().getSummaryData('games');
            const gamesInfo = profile.getApp().getSummaryData('gamesInfo').data.data.message;
            const games = getAllGames(allGames.data, gamesInfo);

            if (!_.isEmpty(games)) {
                this.setState({
                    game: games.find(game => game._id === id)
                })
            } else {
                this.setState({
                    game: {}
                })
            }
        }
    }

    setOpen = async () => {
        const { id, profile } = this.props;

        if (_.isEmpty(this.state.game)) {
            const allGames = this.props.profile.getApp().getSummaryData('games');
            const gamesInfo = profile.getApp().getSummaryData('gamesInfo').data.data.message;
            const games = getAllGames(allGames.data, gamesInfo);

            if (!_.isEmpty(games)) {
                this.setState({
                    game: games.find(game => game._id === id),
                    open: true
                })
            }
        }
    }

    setClose = () => {

        this.setState({
            open: false,
            game: {}
        })
    }

    renderDataTitle = ({title, data, span, loading, decimals}) => {

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <p className='text-small pink-text'> {title} </p>
                    {loading ? (
                        <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                    ) : (
                        <h4 className='secondary-text' style={{marginTop : 5}}> <AnimationNumber decimals={decimals} font={'11pt'} number={data}/> <span className='text-x-small'>{span}</span></h4>
                    )}
                </CardBody>
            </Card>
        )
    }

    render() {
        const { currency } = this.props;
        const { open, game, isLoading } = this.state;
        const { _id, name, description, image_url, profit, betAmount, betsAmount, wallet, edge } = game;

        let csvData = [{}];
        let jsonData = [];
        let  headers = []

        if (!_.isEmpty(game)) {
            const data = [
                { 
                    _id: _id,
                    name: name,
                    description: description,
                    currency: currency,
                    profit: profit ? parseFloat(profit).toFixed(6) : 0,
                    betAmount: betAmount ? betAmount : 0,
                    betsAmount: betsAmount ? parseFloat(betsAmount).toFixed(6) : 0,
                    edge: profit ? parseFloat(edge).toFixed(2) : 0
                }
            ]
    
            headers = [
                { label: "Id", key: "_id" },
                { label: "Name", key: "name" },
                { label: "Description", key: "description" },
                { label: "Currency", key: "currency" },
                { label: "Profit", key: "profit" },
                { label: "Bets Amount", key: "betAmount" },
                { label: "TurnOver", key: "betsAmount" },
                { label: "Edge", key: "edge" }
            ];
    
            if (!_.isEmpty(data)) {
                csvData = data.map(row => ({...row, currency: row.currency.name}));
        
                jsonData = csvData.map(row => _.pick(row, ['_id', 'name', 'description', 'currency', 'profit', 'betAmount', 'betsAmount', 'edge']));
            }
        }

        return(
            <>
            <ButtonBase onClick={this.setOpen}>
                {this.props.children} 
            </ButtonBase>
            { !_.isEmpty(game) ? 
                <Dialog
                // disableBackdropClick
                open={open}
                onClose={this.setClose}
                fullWidth maxWidth="lg"
                    >
                    <DialogHeader style={{ paddingBottom: 0 }}>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginRight: 20 }}>
                        <CSVLink data={csvData} filename={"game.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "game")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                            <JsonIcon style={{marginRight: 7}}/> JSON
                        </MaterialButton>
                    </div>
                        <CloseButton onClick={this.setClose}>
                            <CloseIcon/>
                        </CloseButton>
                    </DialogHeader>
                    <DialogContent style={{ paddingTop: 0 }}>
                        <Row>
                            <Col md={4}>
                                <div className='user-page-top'>
                                    <Card>
                                        <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                                            <Row>
                                                <Col sd={12} md={12} lg={4}>
                                                    <div>
                                                        <img src={image_url} className='user-avatar'/>
                                                    </div>
                                                </Col>
                                                <Col sd={12} md={12} lg={8}>
                                                    <h5 className='pink-text'>{name}</h5>
                                                    <hr></hr>
                                                    <p className='secondary-text text-small'> {description}</p>
                                                    <p className='text-x-small'> #{_id} </p>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Bets Amount', data : betAmount ? betAmount : 0, span : "", loading: isLoading, decimals: 0})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'TurnOver', data :  betsAmount ? parseFloat(betsAmount).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Profit', data : profit ? parseFloat(profit).toFixed(6) : 0, span : currency.ticker, loading: isLoading, decimals: 6})}
                                    </Col>
                                    <Col sd={12} md={4} lg={3}>
                                        {this.renderDataTitle({title : 'Edge', data :  edge ? parseFloat(edge).toFixed(2) : 0, span : "%", loading: isLoading, decimals: 2})}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog> : null }
            </>
        )
    }

}

function getAllGames(data, gamesInfo){
    let allGames = [];

    const gamesOnPeriodicity = data.map(index => index.games);
    const concatGames = [].concat(...gamesOnPeriodicity);

    const games = Object.values([...concatGames].reduce((acc, { _id, name, edge, betsAmount, betAmount, profit, fees }) => {
    acc[_id] = { _id, name, 
        edge: (acc[_id] ? acc[_id].edge : 0) + edge,
        betsAmount: (acc[_id] ? acc[_id].betsAmount : 0) + betsAmount,
        betAmount: (acc[_id] ? acc[_id].betAmount : 0) + betAmount,
        profit: (acc[_id] ? acc[_id].profit : 0) + profit,
        fees: (acc[_id] ? acc[_id].fees : 0) + fees };
    return acc;
    }, {}));

    gamesInfo.filter(game => games.map(g => g._id).includes(game._id)).map(game => {
        games.filter(g => g._id === game._id).map(g => allGames.push({...g, ...game}));
    })

    gamesInfo.filter(game => !games.map(g => g._id).includes(game._id)).map(game => {
        allGames.push({edge: 0, betsAmount: 0, betAmount: 1, profit: 0, fees: 0, ...game });
    });

    return allGames;
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency: state.currency
    };
}


export default connect(mapStateToProps)(GameContainer);