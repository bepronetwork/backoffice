/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
var QRCode = require('qrcode.react');

class QRCodeContainer extends PureComponent {
 
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
                <Card style={{margin : 'auto'}}>
                    <QRCode style={{margin : 'auto'}} value={this.props.value} size={128} bgColor={'#ffffff'} fgColor={'#000000'} />
                </Card>
            </Col>
        );
    }
}

export default QRCodeContainer;
