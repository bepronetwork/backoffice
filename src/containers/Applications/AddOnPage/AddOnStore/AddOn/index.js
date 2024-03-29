/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { AddIcon } from 'mdi-react';

class AddOnStoreContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            isLoading: false
        };
    }

    handleAddAddOn = async () => {
        const { addAddOn, addOn } = this.props;

        this.setState({ isLoading: true })

        await addAddOn(addOn.endpoint);

        this.setState({ isLoading: false })
    }

    render() {
        const { addOn, isAdded } = this.props;
        const { isLoading } = this.state;

        if(!addOn){return null}

        const { name, description, image_url } = addOn;
        
        return (
            <CardBody className="dashboard__card-widget" style={{ minHeight: 187, maxWidth: 307, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                <Row>
                    <Col lg={4} >  
                        <img className='application__game__image' 
                        style={{display: 'block', width: '60px'}} 
                        src={image_url}/>
                    </Col>
                    <Col lg={8} >
                        <div className="dashboard__visitors-chart text-left">
                            <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 20}}> {name} </p>
                            <p className="text-left secondary-text"> {description} </p>
                        </div>
                    </Col>
                </Row>
                <Button disabled={isLoading || isAdded} style={{margin : 0, marginTop : 10}} className="icon" onClick={this.handleAddAddOn} >
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
        );
    }
}

export default AddOnStoreContainer;
