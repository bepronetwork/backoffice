import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Card, CardBody, Col, Row } from 'reactstrap';
import FlashIcon from 'mdi-react/FlashIcon';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const data = [{ value: 360, fill: '#894798' },
  { value: 140, fill: '#eeeeee' }];

const BPROBag = ({ t }) => (
  <Col md={12} xl={3} lg={6} sm={12} xs={12}>
    <Card>
      <CardBody className="dashboard__health-chart-card">
        <div className="card__title">
          <h5 className="bold-text">{t('dashboard.bpro_bag')}</h5>
        </div>
        <div className="dashboard__health-chart">
          <ResponsiveContainer height={180}>
            <PieChart>
              <Pie data={data} dataKey="value" cy={85} innerRadius={80} outerRadius={90} />
            </PieChart>
          </ResponsiveContainer>
          <div className="dashboard__health-chart-info">
            <FlashIcon style={{ fill: '#894798' }} />
            <p className="dashboard-chart-number">$100 000</p>
            <p className="dashboard__health-chart-units">BPRO</p>
          </div>
        </div>
        <div className='container'>
          <button className='icon btn btn-ternary btn-sm'>
            Charge
          </button>
        </div>
      </CardBody>
    </Card>
  </Col>
);

BPROBag.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(BPROBag);
