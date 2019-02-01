/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const data01 = [{ name: 'Cycling', value: 10, fill: '#894798' },
  { name: 'Walking', value: 37, fill: '#70bbfd' },
  { name: 'Run', value: 21, fill: '#f6da6e' },
  { name: 'Swimming', value: 32, fill: '#ff4861' }];

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

const ActivityRating = ({ t }) => (
  <Panel lg={12} xl={6} md={12} title={t('dashboard_fitness.activity_rating')}>
    <ResponsiveContainer className="dashboard__chart-pie dashboard__chart-pie--fitness" width="100%" height={360}>
      <PieChart className="dashboard__chart-pie-container">
        <Tooltip />
        <Pie data={data01} dataKey="value" cy={180} innerRadius={130} outerRadius={160} label />
        <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  </Panel>
);

ActivityRating.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(ActivityRating);
