import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paragraph } from '../LiquidityWalletContainer/styles';
import { TabContainer, DepositContent, DepositAddress, CopyButton } from './styles';
import _ from 'lodash';
import copy from "copy-to-clipboard";  
var QRCode = require('qrcode.react');

class Deposit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            copied: false
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


    render() {
        const { wallet, copied } = this.state;
        if (_.isEmpty(wallet)) return null

        return (
           <>
           <TabContainer>
                <Paragraph>Choose the Amount of Liquidity you want to Deposit</Paragraph>
                <DepositContent>
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
