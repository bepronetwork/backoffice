import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { AreaChart, Tooltip, Area, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import PropTypes from 'prop-types';

const data = [{ name: 'Mon', btc: 7 },
  { name: 'Tue', btc: 2 },
  { name: 'Wed', btc: 5 },
  { name: 'Thu', btc: 2 },
  { name: 'Fri', btc: 1 },
  { name: 'Sat', btc: 3 },
  { name: 'Sun', btc: 1 }];

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
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];

    return (
      <Col md={12} xl={12} lg={12} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h5 className="bold-text">Daily Active Users</h5>
              <h5 className="subhead">This Week</h5>
            </div>
            <div className="dashboard__total dashboard__total--area">
              <TrendingUpIcon className="dashboard__trend-icon" />
              <p className="dashboard__total-stat">
                2.3%
              </p>
              <ResponsiveContainer height={70} className="dashboard__chart-container">
                <AreaChart data={data} margin={{ top: 0, left: 20, bottom: 0 }}>
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    name="BTC"
                    type="monotone"
                    dataKey="btc"
                    fill="purple"
                    stroke="purple"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
