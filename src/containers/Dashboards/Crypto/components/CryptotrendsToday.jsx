/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const data01 = [{ name: 'Bitcoin', value: 20432, fill: '#894798' },
  { name: 'Ethereum', value: 15432, fill: '#70bbfd' },
  { name: 'Bitcoin Cash', value: 12934, fill: '#f6da6e' },
  { name: 'Ripple', value: 9934, fill: '#ff4861' }];

const style = {
  left: 0,
  width: 150,
  lineHeight: '24px',
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {
        payload.map((entry, index) => (
          <li key={`item-${index}`}><span style={{ backgroundColor: entry.color }} />{entry.value}</li>
        ))
      }
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    vslue: PropTypes.string,
  })).isRequired,
};

const CryptotrendsToday = ({ t }) => (
  <Panel
    lg={12}
    xl={6}
    xs={12}
    title={t('dashboard_crypto.cryptotrends_today')}
    subhead="Top selling items statistic by last month"
  >
    <ResponsiveContainer className="dashboard__chart-pie dashboard__chart-pie--crypto" height={360}>
      <PieChart className="dashboard__chart-pie-container">
        <Tooltip formatter={value => (`$${value.toFixed(2)}`)} />
        <Pie
          data={data01}
          dataKey="value"
          cy={175}
          innerRadius={130}
          outerRadius={160}
          label={value => (`$${value.value.toFixed(2)}`)}
        />
        <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  </Panel>
);

CryptotrendsToday.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(CryptotrendsToday);
