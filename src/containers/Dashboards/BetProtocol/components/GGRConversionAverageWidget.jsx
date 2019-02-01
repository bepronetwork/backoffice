/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const data = [
  { name: 'Page A', uv: 34.45 },
  { name: 'Page B', uv: 23.23 },
  { name: 'Page C', uv: 10.33 },
  { name: 'Page D', uv: 7.23 },
  { name: 'Page E', uv: 23 },
  { name: 'Page F', uv: 12 },
  { name: 'Page G', uv: 34 },
  { name: 'Page H', uv: 23 },
  { name: 'Page I', uv: 12 },
  { name: 'Page J', uv: 34 },
];

class GGRConversionAverageWidget extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

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
    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];
    const { t } = this.props;

    return (
      <Col md={12} xl={3} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h5 className="bold-text">{'GGR Average'}</h5>
            </div>
            <div className="dashboard__total">
              <TrendingUpIcon className="dashboard__trend-icon" />
              <p className="dashboard__total-stat">
                {(activeItem.uv).toFixed(2)}%
              </p>
              <ResponsiveContainer height={50} className="dashboard__chart-container">
                <BarChart data={data}>
                  <Bar dataKey="uv" onClick={this.handleClick}>
                    {
                      data.map((entry, index) => (
                        <Cell
                          cursor="pointer"
                          fill={index === activeIndex ? '#894798' : '#ff4861'}
                          key={`cell-${index}`}
                        />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default translate('common')(GGRConversionAverageWidget);
