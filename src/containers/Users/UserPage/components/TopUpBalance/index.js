import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogContent, Button } from '@material-ui/core';
import _ from 'lodash';
import { CloseIcon, ArrowUpIcon } from 'mdi-react';
import { DialogHeader, CloseButton, Container, CardHeader, CardContent, InputAddOn, AmountInput, ConfirmButton, ReasonInput } from './styles';
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

    handleChangeReason = value => {
        this.setState({ reason: value ? value : null })
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { App } = profile;
        const { user, wallet, amount, reason } = this.state;

        if (amount && reason) {
            this.setState({
                isLoading: true
            })

            await App.modifyUserBalance({ user: user._id, wallet: wallet._id, currency: wallet.currency._id, newBalance: amount, reason: reason });
            await profile.getApp().updateAppInfoAsync();
            await profile.update();

            this.setState({
                isLoading: false,
                open: false
            })
        }
    }


    render() {
        const { open, user, wallet, isLoading, amount, reason } = this.state;

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
                            <hr/>
                            <CardContent>
                                <h1>New balance</h1>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputAddOn>
                                            <span>Amount</span>
                                            <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 20, width: 20 }} src={wallet.currency.image} alt={wallet.currency.name}/>
                                        </InputAddOn>
                                    </InputGroupAddon>
                                    <AmountInput name="amount" type="number" onChange={(e) => this.onChangeAmount(e.target.value)}/>
                                </InputGroup>
                                <h1>Reason</h1>
                                <ReasonInput name="reason" type="text" onChange={(e) => this.handleChangeReason(e.target.value)}/>
                                <ConfirmButton disabled={ !amount || !reason || isLoading } onClick={this.confirmChanges}>
                                    { isLoading ? <img src={loading} className={'loading_gif'} alt="Confirming..."/> : <span>Confirm</span> } 
                                </ConfirmButton>
                            </CardContent>
                        </Container>
                      
                    </DialogContent>
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