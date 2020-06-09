import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paragraph } from '../LiquidityWalletContainer/styles';
import { TabContainer, WithdrawContent, AddressInput, AmountInput, InputAddOn, WithdrawButton, ErrorMessage } from './styles';
import _ from 'lodash';
import { InputGroup, InputGroupAddon } from 'reactstrap';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

const withdrawMessage = Object.freeze({
    "1": "Asking Withdraw Permission..",
    "5": "Done!"
});

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: null, 
            error: null,
            isLoading: false,
            toAddress: null,
            amount: null
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { data } = props;

        if (!_.isEmpty(data)) {
            this.setState({
                wallet: data.wallet,
                bank_address: data.wallet.bank_address
            })
        } else {
            this.setState({
                wallet: {}
            })
        }

    }

    onChangeToAddress = value => {
        if (value) {
            this.setState({
                toAddress: value
            })
        } else {
            this.setState({
                toAddress: null
            })
        }
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

    createTokenWithdraw = async () => {
        try{
            const { profile } = this.props;
            const { amount, toAddress, wallet } = this.state;
            const { currency } = wallet;

            this.setState({
                isLoading: true, 
                state: "1",
                error: null
            });

            await profile.requestWithdraw({ tokenAmount: amount, currency, toAddress });

            this.setState({
                isLoading: false, 
                state: "5",
                error: null
            });

            return true;

        }catch(err){
            this.setState({
                isLoading: false,
                error: err.message
            });
        }
    }


    render() {
        const { wallet, error, toAddress, amount, isLoading, state } = this.state;
        if (_.isEmpty(wallet)) return null

        const { currency } = wallet;

        return (
           <>
           <TabContainer>
                <Paragraph>Choose the amount of Liquidity you want to withdraw</Paragraph>
                <WithdrawContent>
                    <AddressInput placeholder={`Your ${currency.name} address`} name="toAddress" onChange={(e) => this.onChangeToAddress(e.target.value)}/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputAddOn>
                                <span>Amount</span>
                                <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 20, width: 20 }} src={wallet.image} alt={currency.name}/>
                            </InputAddOn>
                        </InputGroupAddon>
                        <AmountInput name="amount" onChange={(e) => this.onChangeAmount(e.target.value)}/>
                    </InputGroup>
                    <ErrorMessage>
                        { error ? <Paragraph style={{ color: "#ec2727" }}>{error}</Paragraph> : null }
                    </ErrorMessage>
                    <WithdrawButton disabled={ _.isEmpty(toAddress) || !amount || isLoading } onClick={() => this.createTokenWithdraw()}>
                       { isLoading ? <img src={loading} className={'loading_gif'} alt="Loading.."/> : <span>Withdraw</span> } 
                    </WithdrawButton>
                { state ? <Paragraph>{withdrawMessage[state]}</Paragraph> : null }
                </WithdrawContent>
           </TabContainer>
           </>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(Withdraw);
