import React from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import CurrencyStoreContainer from './store/Currency';
import { Header } from './components/LiquidityWalletContainer/styles';

import _ from 'lodash';
import { CurrencyStoreCard } from './store/styles';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

class CurrencyStore extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ecosystemCurrencies : [],
            integratedWallets : [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }
    
    projectData = async (props) => {
        let { profile } = props;
        
        this.setState({ isLoading: true });

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
            integratedWallets,
            isLoading: false
        })
    }

    hasRestriction = (appUseVirtualCurrencies, currency) => {
        return appUseVirtualCurrencies && currency._id === "5e108498049eba079930ae1c";
    }

    render = () => {
        const { ecosystemCurrencies, isLoading } = this.state;
        const { profile, loading } = this.props;

        const appUseVirtualCurrencies = profile.App.params.virtual;

        const currencies = ecosystemCurrencies.filter(currency => !this.hasRestriction(appUseVirtualCurrencies, currency));

        if ((_.isEmpty(currencies) && isLoading) || loading ) {
            return (
                <div style={{ margin: 10 }}>
                <Header style={{ paddingLeft: 10 }}>
                    <h3>Currency Store</h3>
                    <p>Available Currencies to Integrate</p>
                </Header>
                <div style={{marginTop: 20}}>
                    <Row>
                        { _.times(4, () => (
                            <Col lg={4} style={{ minWidth: 250 }}>
                                <CurrencyStoreCard>
                                    <Grid container direction='row' spacing={1}>
                                        <Grid item xs={3}>
                                            <Skeleton variant="circle" width={60} height={60} style={{ marginBottom: 30, marginLeft: 'auto', marginRight: 0 }}/>
                                        </Grid>         
                                    </Grid>
                                    <Skeleton variant="rect" width="30%" height={30} style={{ marginBottom: 20 }}/>
                                    <Skeleton variant="rect" width="40%" height={30} style={{ marginBottom: 10 }}/>
                                </CurrencyStoreCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            )
        }

        return (
            <div style={{ margin: 10 }}>
                <Header style={{ paddingLeft: 10 }}>
                    <h3>Currency Store</h3>
                    <p>Available Currencies to Integrate</p>
                </Header>
                <div style={{marginTop: 20}}>
                    <Row>
                        {currencies.map(currency => {
                            return (
                                <Col lg={4} key={currency._id} style={{ minWidth: 250 }}>
                                    <CurrencyStoreContainer currency={currency} isAdded={currency.isAdded}/>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency,
        loading: state.isLoading
    };
}

export default connect(mapStateToProps)(CurrencyStore);

