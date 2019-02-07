/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import { BarcodeIcon } from 'mdi-react';

class GenerateReferenceBox extends PureComponent {
 
    constructor() {
        super();
        this.state = {
        activeIndex: 0,
        };
    }

    handleClick = (index) => {
        this.setState({
        activeIndex: index,
        });
    };

    render() {        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                   
                </Card>
            </Col>
        );
    }
}

export default GenerateReferenceBox;
