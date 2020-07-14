import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import store from '../App/store';
import { setCurrencyView } from '../../redux/actions/currencyReducer';
import { setLoadingStatus } from '../../redux/actions/loadingAction';
import { addCurrencyWallet } from '../../redux/actions/addCurrencyWallet';
import CurrencyStoreContainer from './store/Currency';
import { Header } from './components/LiquidityWalletContainer/styles';

import _ from 'lodash';

class CurrencyStore extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ecosystemCurrencies : [],
            integratedWallets : []
        }
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    addCurrency = async currency => {
        await store.dispatch(setCurrencyView(currency));
        await store.dispatch(addCurrencyWallet({isActive : true}));
    }
    
    projectData = async (props) => {
        let { profile } = props;
        
        store.dispatch(setLoadingStatus(true));

        let ecosystemCurrencies = await profile.getApp().getEcosystemCurrencies();
        if(!(await profile.getApp().getSummaryData('walletSimple').data)){return null}
        let integratedWallets = (await profile.getApp().getSummaryData('walletSimple')).data;
        const { virtual } = await profile.getApp().getParams();

        ecosystemCurrencies = ecosystemCurrencies.map( ecoCurrency => {
            let exists = false;
            integratedWallets.map( w => {
                if(new String(w.currency._id).toString().toLowerCase().trim() == new String(ecoCurrency._id).toString().toLowerCase().trim()){
                    exists = true;
                };
            })
            if(!exists){return ecoCurrency}
            else{ return {...ecoCurrency, isAdded : true}}
        }).filter(el => el != null && ((virtual === true && !el.virtual) || (virtual === false && !el.hasOwnProperty('virtual')) || el.virtual === virtual));

        this.setState({...this.state, 
            ecosystemCurrencies,
            integratedWallets
        })

        store.dispatch(setLoadingStatus(false));
    }

    hasRestriction = (appUseVirtualCurrencies, currency) => {
        return appUseVirtualCurrencies && currency._id === "5e108498049eba079930ae1c";
    }

    render = () => {
        const { ecosystemCurrencies } = this.state;
        const { profile } = this.props;

        const appUseVirtualCurrencies = profile.App.params.virtual;

        const currencies = ecosystemCurrencies.filter(currency => !this.hasRestriction(appUseVirtualCurrencies, currency));

        return (
            <>
                <Header style={{ paddingLeft: 10 }}>
                    <h3>Currency Store</h3>
                    <p>Available Currencies to Integrate</p>
                </Header>
                <div style={{marginTop: 20}}>
                    <Row>
                        {currencies.map(currency => {
                            return (
                                <Col lg={4} key={currency._id} style={{ minWidth: 250 }}>
                                    <CurrencyStoreContainer onClick={this.addCurrency} currency={currency} isAdded={currency.isAdded}/>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency
    };
}

export default connect(mapStateToProps)(CurrencyStore);

