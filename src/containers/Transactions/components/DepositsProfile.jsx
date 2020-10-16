/* eslint-disable react/no-array-index-key */
import Skeleton from '@material-ui/lab/Skeleton';
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';

class DepositsProfile extends PureComponent {
 
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
        let deposits = this.props.data;
        const { loading } = this.props;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    {loading ? (
                        <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/> ) : (
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : '#646777'}
                            }><AnimationNumber decimals={0} number={deposits.length}/></p>
                        </div>)}
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Total Deposits <span> All </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default DepositsProfile;
