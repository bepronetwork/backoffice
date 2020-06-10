import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogContent, Button } from '@material-ui/core';
import _ from 'lodash';
import { CloseIcon, ArrowUpIcon } from 'mdi-react';
import { DialogHeader, CloseButton, Container, CardHeader, CardContent, InputAddOn, AmountInput, ConfirmButton } from './styles';
import { Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import AnimationNumber from '../../../../UI/Typography/components/AnimationNumber';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

class UserContainer extends React.Component {
 
    constructor() {
        super();
        this.state = {
            open: false,
            user: {},
            amount: null,
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
        const { user, currency } = props;

        if (!_.isEmpty(user)){
            this.setState({
                user: user,
                currency: currency,
                wallet: user.wallet.find(wallet => wallet.currency._id === currency._id)
            })
        } else {
            this.setState({
                user: {}
            })
        }
    }

    setOpen = async () => {

        this.setState({
            open: true
        })

    }

    setClose = () => {

        this.setState({
            open: false
        })
    }

    
    onChangeAmount = value => {
        if (value) {
            this.setState({
                amount: parseFloat(value)
            })
        } else {
            this.setState({
                amount: null
            })
        }
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { App } = profile;
        const { user, wallet, amount } = this.state;

        if (amount) {
            this.setState({
                isLoading: true
            })

            await App.modifyUserBalance({ user: user._id, wallet: wallet._id, newBalance: amount });
            await profile.getApp().updateAppInfoAsync();
            await profile.update();

            this.setState({
                isLoading: false,
                open: false
            })
        }
    }


    render() {
        const { open, user, wallet, isLoading, amount } = this.state;

        return(
            <>
            <Button onClick={this.setOpen} variant="outlined" size="small" style={{ textTransform: "none", backgroundColor: "#63c965", color: "#ffffff", boxShadow: "none", height: 25, margin: "10px 0px" }}>
                <ArrowUpIcon style={{marginRight: 3}}/> Top Up
            </Button>
            { !_.isEmpty(user) ? 
                <Dialog
                // disableBackdropClick
                open={open}
                onClose={this.setClose}
                    >
                    <DialogHeader>
                        <CloseButton onClick={this.setClose}>
                            <CloseIcon/>
                        </CloseButton>
                    </DialogHeader>
                    <DialogContent style={{ paddingTop: 0 }}>
                        <Container style={{ paddingTop: 0 }}>
                            <CardHeader>
                            <h1>Wallet</h1>
                                <Row>
                                    <Col sd={12} md={12} lg={4}>
                                        <img src={wallet.currency.image} style={{ height: 75, width: 75 }}className='user-avatar' alt={wallet.currency.name}/>
                                    </Col>
                                    <Col sd={12} md={12} lg={8}>
                                        {/* UserInfo */}
                                        <h4 style={{marginTop : 5}}> <AnimationNumber decimals={6} font={'20pt'} number={wallet.playBalance ? wallet.playBalance : 0 }/> <span className='text-small'>{wallet.currency.ticker}</span></h4>
                                        <hr></hr>
                                        <p className='text-x-small'> #{wallet._id} </p>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardContent>
                                <h1>New balance</h1>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputAddOn>
                                            <span>Amount</span>
                                            <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 20, width: 20 }} src={wallet.currency.image} alt={wallet.currency.name}/>
                                        </InputAddOn>
                                    </InputGroupAddon>
                                    <AmountInput name="amount" onChange={(e) => this.onChangeAmount(e.target.value)}/>
                                </InputGroup>
                                <ConfirmButton disabled={!amount} onClick={this.confirmChanges}>
                                    { isLoading ? <img src={loading} className={'loading_gif'} alt="Confirming..."/> : <span>Confirm</span> } 
                                </ConfirmButton>
                            </CardContent>
                        </Container>
                      
                    </DialogContent>
                    {/* <DialogActions>
                    <button disabled={isLoading[withdraw._id]}className={`clean_button button-normal button-hover`} style={{ height: "35px", backgroundColor: "#63c965", margin: "25px", pointerEvents: isLoading[withdraw._id] ? 'none' : 'all' }} onClick={this.onSubmit}> 
                        { !isLoading[withdraw._id] ?
                        <p className='text-small text-white'>Yes, confirm withdraw</p>
                        : <p className='text-small text-white'>Confirming...</p> }
                    </button>
                    </DialogActions> */}
                </Dialog> : null }
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency: state.currency
    };
}


export default connect(mapStateToProps)(UserContainer);