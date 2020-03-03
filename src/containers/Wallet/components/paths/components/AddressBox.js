/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import { CopyrightIcon, ContentPasteIcon } from 'mdi-react';

class AddressBox extends PureComponent {
 
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

    copyAddress = () => {

    }

    render() {
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card style={{margin : 'auto', paddingBottom : 0}}>
                    <p className="inside__card__text">
                        Deposit Address
                    </p>
                    <div className="form__form-group">

                        <div className="input__card" style={{display : 'block'}}>
                            <Row>
                                <Col lg={10}>
                                    <input
                                    style={{width: `100%`}}
                                    value={this.props.value}
                                    className={''}
                                    name="address"
                                    component="input"
                                    type={'text'}
                                    placeholder="Address"
                                />
                                </Col>
                                <Col lg={2}>
                                    <button
                                        className={'form__form-group-button'}
                                        onClick={e => { console.log(e); return this.copyAddress(e)}}
                                        >
                                        <ContentPasteIcon />
                                    </button>
                                </Col>
                            </Row>
                           
                          
                        </div>
                    </div>                
                </Card>
            </Col>
        );
    }
}

export default AddressBox;
  