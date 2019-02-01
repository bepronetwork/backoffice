import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const data = [
  {
    name: 'Mon', revenue: 1300, costs: 800, profit: 500,
  },
  {
    name: 'Tue',revenue: 1800, costs: 500, profit: 200,
  },
  {
    name: 'Wed', revenue: 3100, costs: 400, profit: 2600,
  },
  {
    name: 'Thu',  revenue: 1700, costs: 900, profit: 600,
  },
  {
    name: 'Fri', revenue: 4100, costs: 1000, profit: 2600,
  },
  {
    name: 'Sat',  revenue: 5700, costs: 1400, profit: 4600,
  },
  {
    name: 'Sun',  revenue: 8000, costs: 1400, profit: 6600,
  },
];

const ActivityChart = ({ t }) => (
  <Panel xs={12} lg={12} title={t('dashboard.revenue_chart')}>
    <ResponsiveContainer height={250} className="dashboard__area">
      <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickFormatter={value => `$${value}`} tickLine={false} />
        <Tooltip />
        <Legend />
        <CartesianGrid />
        <Area name="Revenue" type="monotone" dataKey="revenue" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
        <Area name="Profit" type="monotone" dataKey="profit" fill="#894798" stroke="#894798" fillOpacity={0.2} />
        <Area name="Costs" type="monotone" dataKey="costs" fill="#ff2525" stroke="#ff2525" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  </Panel>
);

ActivityChart.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(ActivityChart);
