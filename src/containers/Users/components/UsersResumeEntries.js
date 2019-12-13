import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AreaChart, Tooltip, Area, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import Numbers from '../../../services/numbers';

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
  })),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
};

export default class UsersResumeEntries extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            users : [],
            data : [{
                name : moment(new Date()).format('L'),
                btc : 0
            }]
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        if(!props.data){return null}
        let users = props.data.data;
        var registeredByDay = [];
        for(var i = 0; i < users.length; i++){
            let day = moment(new Date(users[i].register_timestamp)).format('L');
            let index = registeredByDay.findIndex( (d) => d.name == day)
            if( index > -1){
                //exists
                registeredByDay[index].btc += 1;
            }else{
                // does not eist
                registeredByDay.push({
                    btc : 1,
                    name : day
                })
            }
        }
        this.setState({data : registeredByDay, users : props.data.data})
    }

    render() {
        const { activeIndex, data, users } = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                <CardBody className="dashboard__card-widget">
                    <Row>
                        <Col md={6}>
                            <div className="card__title">
                                <h5 className="bold-text">Users Registered</h5>
                                <h5 className="subhead">Last Days</h5>
                            </div>
                            
                        </Col>
                        <Col md={6}>
                            <ResponsiveContainer height={70} className="dashboard__chart-container">
                                <AreaChart data={data} margin={{ top: 10, left: 20, bottom: 10 }}>
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    name="Users"
                                    type="monotone"
                                    dataKey="btc"
                                    fill="purple"
                                    stroke="purple"
                                    fillOpacity={0.2}
                                />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                    <div>
                        <Row>
                            <Col md={2}>
                                <TrendingUpIcon className="dashboard__trend-icon" />
                            </Col>
                            <Col md={10}>
                                <p className="dashboard__visitors-chart-title"> {Numbers.toFloat(data[data.length-1].btc/users.length*100)}%  <span> { data[data.length-1].name} </span></p>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
                </Card>
            </Col>
        );
    }
}
