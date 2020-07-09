/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';

import { connect } from 'react-redux';

class UsersProfile extends PureComponent {
 
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
        const { profile } = this.props;
        const params = profile.getApp().params;
        const users = params.external_users ? params.external_users.length : Object.keys(this.props.data.data).length;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : '#646777'}
                            }><AnimationNumber decimals={0} number={users ? users : 0}/></p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Registerd Users <span> All </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(UsersProfile);
