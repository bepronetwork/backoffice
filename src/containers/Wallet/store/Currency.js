/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { AddIcon } from 'mdi-react';

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
            <div>
                <CardBody className="dashboard__card-widget box-content">
                    <Row>
                        <Col lg={5} >  
                            <img className='application__game__image' src={image}/>
                        </Col>
                        <Col lg={7} >
                            <div className="dashboard__visitors-chart text-left">
                                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 25}}> {ticker} </p>
                                <p className="text-left secondary-text"> {name} </p>
                            </div>
                        </Col>
                    </Row>
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
                </CardBody>
            </div>
        );
    }
}

export default CurrencyStoreContainer;
