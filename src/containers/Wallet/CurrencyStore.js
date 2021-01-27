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
            currencies: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    isAdded = (currency, wallet) => {
        return !_.isUndefined(wallet.find(w => w.currency._id === currency._id));
    }
    
    projectData = async (props) => {
        const { profile } = props;
        const app = await profile.getApp();
        
        this.setState({ isLoading: true });

        const ecosystemCurrencies = await app.getEcosystemCurrencies();
        const { wallet, virtual } = app.params;

        const filteredCurrencies = virtual ? ecosystemCurrencies : ecosystemCurrencies.filter(currency => !currency.virtual);
        const currencies = filteredCurrencies.map(currency => ({ ...currency, isAdded: this.isAdded(currency, wallet)}));

        this.setState({...this.state, 
            ecosystemCurrencies,
            currencies: currencies || [],
            isLoading: false
        })
    }

    hasRestriction = (appUseVirtualCurrencies, currency) => {
        return appUseVirtualCurrencies && currency.ticker === 'ETH';
    }

    render = () => {
        const { currencies, isLoading } = this.state;
        const { profile, loading } = this.props;

        const appUseVirtualCurrencies = profile.App.params.virtual;

        const filteredCurrencies = currencies.filter(currency => !this.hasRestriction(appUseVirtualCurrencies, currency));

        if ((_.isEmpty(filteredCurrencies) && isLoading) || loading ) {
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
                        {filteredCurrencies.map(currency => {
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

