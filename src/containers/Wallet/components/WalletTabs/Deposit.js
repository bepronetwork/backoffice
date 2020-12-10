import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paragraph } from '../LiquidityWalletContainer/styles';
import { TabContainer, DepositContent, DepositAddress, CopyButton, InputAddOn, AmountInput, DepositButton } from './styles';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import _, { isNull } from 'lodash';
import copy from "copy-to-clipboard";  
var QRCode = require('qrcode.react');

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

class Deposit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            copied: false,
            isLoading: false,
            newBalance: null
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

    copyToClipboard = () => {
        const { bank_address } = this.state;

        copy(bank_address);

        this.setState({
            copied: true
        })

        setTimeout(() => {
            this.setState({ 
                copied: false 
            });
        }, 5000)
    }

    handleChangeAmount = value => {
        this.setState({ newBalance: value || null });
    }

    handleAddBalanceToApp = async () => {
        const { profile } = this.props;
        const { newBalance, wallet } = this.state;
        const { currency } = wallet;

        if (!isNull(newBalance) && newBalance > 0 ) {
            this.setState({ isLoading: true });

            await profile.getApp().updateAppBalance({ increase_amount: parseFloat(newBalance), currency: currency._id });

            await profile.getApp().updateAppInfoAsync();
            await profile.update();

            this.setState({ isLoading: false, newBalance: null });
        }
    }

    render() {
        const { wallet, copied, isLoading, newBalance } = this.state;
        if (_.isEmpty(wallet)) return null

        const { image, name } = wallet.currency;

        return (
           <>
           <TabContainer>
                <Paragraph>Choose the Amount of Liquidity you want to Deposit</Paragraph>
                <DepositContent>
                    <InputGroup style={{ margin: "20px 0px" }}>
                        <InputGroupAddon addonType="prepend">
                            <InputAddOn style={{ marginTop: 0 }}> 
                                <span>Amount</span>
                                <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 20, width: 20 }} src={image} alt={name}/>
                            </InputAddOn>
                        </InputGroupAddon>
                        <AmountInput name="amount" type="number" onChange={(e) => this.handleChangeAmount(e.target.value)} style={{ margin: 0 }}/>
                        <InputGroupAddon addonType="append">
                            <DepositButton variant="contained" onClick={() => this.handleAddBalanceToApp()} disabled={ isLoading || isNull(newBalance) }>
                                { !isLoading ? 'Deposit' : <img src={loading} className={'loading_gif'} alt="Loading.."/> }
                            </DepositButton>
                        </InputGroupAddon>
                    </InputGroup>
                    <hr/>
                    <QRCode value={wallet.bank_address} size={225} bgColor={'#ffffff'} fgColor={'#000000'} style={{ marginBottom: 60 }}/>
                    <DepositAddress>
                        <h6>{wallet.bank_address}</h6>
                        <CopyButton variant="contained" onClick={() => this.copyToClipboard()} disabled={copied}>
                            {copied ? 'Copied!' : 'Copy'}
                        </CopyButton>
                    </DepositAddress>
                </DepositContent>
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


export default connect(mapStateToProps)(Deposit);
