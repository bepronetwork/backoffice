/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Preview } from 'react-html2pdf';
import _ from 'lodash';

const defaultProps = {
    ticker  : 'No Currency Chosen',
    image   : 'N/A',
    pubkey  : 'N/A',
    privkey : 'N/A'
}


class KeysDocument extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        const { currency, pubkey, privkey }  = props;

        this.setState({...this.state, 
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            image : currency.image ? currency.image : defaultProps.image,
            pubkey : pubkey ? pubkey : defaultProps.pubkey,
            privkey : privkey ? privkey : defaultProps.privkey
        })
    }

    render() {        
        const { pubkey, privkey, ticker, image} = this.state;
        return (
            <Preview id={'jsx-template'} >
                <div style={{margin : 60}}>
                    <div style={{height: 30}}/>
                    <div style={{display: "flex", fontSize: 60, paddingTop: 10}}>
                        <div style={{flex : "0 0 65%", textAlign: "left"}}>
                            {ticker}
                        </div>
                        <div style={{flex : 1, textAlign: "right"}}>
                            <img style={{borderRadius: 0, height: 60, width: 60}} src={image} alt="avatar" />
                        </div>
                    </div>
                    <div style={{textAlign: "left"}}>
                        <p>
                            Keep my backup key secure with trusted partner (Coincover)
                            <br/><br/>
                            Create a backup key with our trusted partner to ensure you NEVER lose access to the funds in your wallet. It is automatically set by default (https://www.coincover.com).
                        </p>
                    </div>
                    <div style={{marginTop: 60, width: "100%", backgroundColor: "#ddd", padding: 5, borderRadius: 3}}>
                        Public Key
                    </div>
                    <div style={{width: "100%", padding: 10}}>
                        {pubkey}
                    </div>
                    <div style={{marginTop:  20, width: "100%", backgroundColor: "#ddd", padding: 5, borderRadius: 3}}>
                        Private Key
                    </div>
                    <div style={{width: "100%", padding: 10}}>
                        {privkey}
                    </div>
                </div>
            </Preview>
        );
    }
}

export default KeysDocument;

