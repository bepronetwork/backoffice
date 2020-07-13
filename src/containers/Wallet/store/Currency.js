/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { AddIcon } from 'mdi-react';
import { CurrencyStoreCard, CardHeader, CardContent } from './styles';

class CurrencyStoreContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    onClick = async () => {
        const { onClick, currency } = this.props;
        this.setState({...this.state, isLoading : true})
        if(onClick){ await onClick(currency) }
        this.setState({...this.state, isLoading : false})
    }

    render() {
        const { currency, isAdded } = this.props;
        const { isLoading } = this.state;
        if(!currency){return null}
        const { image, _id, ticker, name } = currency;

        return (
            <CurrencyStoreCard>
                <CardHeader>
                    <img className='application__game__image' style={{display: 'block', marginLeft: `0px`, height: 60, width: 60 }} src={image}/>
                </CardHeader>
                <CardContent>
                    <h1>{ticker}</h1>
                </CardContent>
                <div className="flex-container">
                    <div style={{flexGrow: 5}} >
                        <Button disabled={isLoading || isAdded} style={{margin : 0, marginTop : 10}} className="icon" onClick={() => this.onClick()} >
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
            </CurrencyStoreCard>

        );
    }
}

export default CurrencyStoreContainer;
