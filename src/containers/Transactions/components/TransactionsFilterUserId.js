/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import { AccountBoxIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';

class TransactionsFilter extends PureComponent {
 
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            filters : []
        };
    }

    changeFilter = (key, value) => {
        console.log(key, value)
        this.setState({[key] : value});
    }

    render() {        
        let depositAmount = this.props.data.data.totalDeposited;
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> User Id <span>  </span></p>
                        </div>
                        <Row>
                            <Col lg={3}>
                                <div className="dashboard__visitors-chart">
                                    <TextInput
                                        icon={AccountBoxIcon}
                                        name="User Id"
                                        label="user_id"
                                        type="text"
                                        placeholder="539d32f2837ry28374"
                                        defaultValue={this.state.user_id}
                                        changeContent={this.changeContent}
                                    />
                                </div>
                            </Col>
                        </Row>
                        
                    </CardBody>
                </Card>
            </Col>
        );
    }
}


export default TransactionsFilter;
