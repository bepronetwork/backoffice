import React from 'react';
import { connect } from "react-redux";
import { ButtonBase, Dialog, DialogContent, Button } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AnimationNumber from '../../../containers/UI/Typography/components/AnimationNumber';
import { CloseIcon, ArrowTopRightIcon, TableIcon, JsonIcon } from 'mdi-react';
import { DialogHeader, CloseButton, Title } from './styles';
import { CSVLink } from 'react-csv';
import { Button as MaterialButton } from "@material-ui/core";
import { export2JSON } from '../../../utils/export2JSON';

class CurrencyContainer extends React.Component {
 
    constructor() {
        super();
        this.state = {
            open: false,
            currency: {},
            wallet: {},
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
        const { App } = profile;

        if (!_.isEmpty(this.state.currency)) {

            const wallets = App.params.wallet;
            const currencies = App.params.currencies;
            const currency = currencies.find(currency => currency._id === id);
            const wallet = wallets.find(wallet => wallet.currency._id === currency._id);

            if (!_.isEmpty(currency)) {
                this.setState({
                    currency: currency,
                    wallet: wallet
                })
            } else {
                this.setState({
                    currency: {},
                    wallet: {}
                })
            }
        }
    }

    setOpen = async () => {
        const { id,  profile } = this.props;
        const { App } = profile;

        if (_.isEmpty(this.state.currency)) {

            const wallets = App.params.wallet;
            const currencies = App.params.currencies;
            const currency = currencies.find(currency => currency._id === id);
            const wallet = wallets.find(wallet => wallet.currency._id === currency._id);

            if (!_.isEmpty(currency)) {
                this.setState({
                    currency: currency,
                    wallet: wallet,
                    open: true
                })
            }
        }
    }

    setClose = () => {

        this.setState({
            open: false,
            currency: {},
            wallet: {}
        })
    }

    render() {
        const { open, currency, wallet } = this.state;

        let csvData = [{}];
        let jsonData = [];
        let  headers = []

        if (!_.isEmpty(currency)) {
            const data = [
                { 
                    _id: currency._id,
                    name: currency.name,
                    ticker: currency.ticker,
                    walletId: wallet._id,
                    walletPlayBalance: wallet.playBalance ? parseFloat(wallet.playBalance).toFixed(6) : 0
                }
            ]
    
            headers = [
                { label: "Id", key: "_id" },
                { label: "Name", key: "name" },
                { label: "Ticker", key: "ticker" },
                { label: "Wallet", key: "walletId" },
                { label: "Wallet Balance", key: "walletPlayBalance" }
            ];
    
            if (!_.isEmpty(data)) {
                csvData = data;
        
                jsonData = csvData.map(row => _.pick(row, ['_id', 'name', 'ticker', 'walletId', 'walletPlayBalance']));
            }
        }

        return(
            <>
            <ButtonBase onClick={this.setOpen}>
                {this.props.children} 
            </ButtonBase>
            { !_.isEmpty(currency) ? 
                <Dialog
                // disableBackdropClick
                open={open}
                onClose={this.setClose}
                    >
                    <DialogHeader style={{ paddingBottom: 0 }}>
                        <div style={{ display: "flex", justifyContent: "flex-start", marginRight: 20 }}>
                            <CSVLink data={csvData} filename={"currency.csv"} headers={headers}>
                                <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                    <TableIcon style={{marginRight: 7}}/> CSV
                                </MaterialButton>
                            </CSVLink>
                            <MaterialButton onClick={() => export2JSON(jsonData, "currency")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                                <JsonIcon style={{marginRight: 7}}/> JSON
                            </MaterialButton>
                        </div>
                        <CloseButton onClick={this.setClose}>
                            <CloseIcon/>
                        </CloseButton>
                    </DialogHeader>
                    <DialogContent style={{ paddingTop: 0 }}>
                    <Title>Currency</Title>
                        <Row>
                            <Col sd={12} md={12} lg={4}>
                                <img src={currency.image} style={{ height: 75, width: 75 }}className='user-avatar' alt={currency.name}/>
                            </Col>
                            <Col sd={12} md={12} lg={8}>
                                <h4 style={{marginTop : 5}}> {currency.name} 
                                {/* <span className='text-small'>{currency.ticker}</span> */}
                                </h4>
                                <p className='text-x-small'> #{currency._id} </p>
                                <hr></hr>
                            </Col>
                        </Row>
                        <Row>
                            <Col sd={12} md={12} lg={4}>
                            <Title>Wallet</Title>
                            <Link to={'/wallet'}>
                            <Button variant="outlined" size="small" style={{ textTransform: "none", backgroundColor: "#63c965", color: "#ffffff", boxShadow: "none", height: 35, margin: "10px 0px", marginTop: 0, marginLeft: -5 }}>
                                <ArrowTopRightIcon style={{ marginRight: 3 }}/> Wallet
                            </Button>
                            </Link>
                            </Col>
                            <Col sd={12} md={12} lg={8} style={{ paddingTop: 30 }}>
                                <h4 style={{marginTop : 5}}> <AnimationNumber decimals={6} font={'20pt'} number={wallet.playBalance ? wallet.playBalance : 0 }/> <span className='text-small'>{wallet.currency.ticker}</span></h4>
                                <p className='text-x-small'> #{wallet._id} </p>
                                <hr></hr>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog> : null }
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(CurrencyContainer);