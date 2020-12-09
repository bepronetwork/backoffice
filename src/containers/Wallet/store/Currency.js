/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {  Button } from 'reactstrap';
import { AddIcon } from 'mdi-react';
import { CurrencyStoreCard, CardHeader, CardContent } from './styles';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

class CurrencyStoreContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            isLoading: false
        };
    }

    handleAddCurrency = async () => {
        const { currency, profile } = this.props;

        this.setState({ isLoading: true });
        
        await profile.getApp().addCurrencyWallet({ currency });

        this.setState({ isLoading: false });
    }

    render() {
        const { currency, isAdded, loading } = this.props;
        const { isLoading } = this.state;
        if(!currency){return null}
        const { image, ticker } = currency;

        return (
            <CurrencyStoreCard>
                { loading ? (
                    <>
                        <Grid container direction='row' spacing={1}>
                            <Grid item xs={3}>
                                <Skeleton variant="circle" width={60} height={60} style={{ marginBottom: 30, marginLeft: 'auto', marginRight: 0 }}/>
                            </Grid>         
                        </Grid>
                        <Skeleton variant="rect" width="30%" height={30} style={{ marginBottom: 20 }}/>
                        <Skeleton variant="rect" width="40%" height={30} style={{ marginBottom: 10 }}/>
                    </>
                ) : (
                    <>
                    <CardHeader>
                        <img className='application__game__image' style={{display: 'block', marginLeft: `0px`, height: 60, width: 60 }} src={image}/>
                    </CardHeader>
                    <CardContent>
                        <h1>{ticker}</h1>
                    </CardContent>
                    <div className="flex-container">
                        <div style={{flexGrow: 5}} >
                            <Button disabled={isLoading || isAdded} style={{margin : 0, marginTop : 10}} className="icon" onClick={() => this.handleAddCurrency()} >
                                {   
                                    isLoading ?
                                        "Adding"
                                    : isAdded ? 
                                        "Added"
                                    : 
                                        <p><AddIcon className="deposit-icon"/> Add </p>
                                }
                            </Button>
                        </div>
                        <div style={{flexGrow: 5}} >
                        </div>
                    </div>
                    </>
                )}
            </CurrencyStoreCard>

        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        loading: state.isLoading
    };
}

export default connect(mapStateToProps)(CurrencyStoreContainer);
