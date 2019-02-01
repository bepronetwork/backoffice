import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const data = [
  {
    name: 'Mon', cycling: 6.8, pv: 800, walking: 2.7,
  },
  {
    name: 'Tue', cycling: 8.1, pv: 967, walking: 0,
  },
  {
    name: 'Wed', cycling: 3, pv: 1098, walking: 5.4,
  },
  {
    name: 'Thu', cycling: 5.5, pv: 1200, walking: 4.8,
  },
  {
    name: 'Fri', cycling: 4, pv: 1108, walking: 2.6,
  },
  {
    name: 'Sat', cycling: 7, pv: 1108, walking: 6,
  },
  {
    name: 'Sun', cycling: 8.2, pv: 680, walking: 4.1,
  },
];

const ActivityChart = ({ t }) => (
  <Panel xs={12} lg={12} title={t('dashboard_fitness.activity_chart')}>
    <ResponsiveContainer height={250} className="dashboard__area">
      <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickFormatter={value => `${value}km`} tickLine={false} />
        <Tooltip />
        <Legend />
        <CartesianGrid />
        <Area name="Cycling" type="monotone" dataKey="cycling" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
        <Area name="Walking" type="monotone" dataKey="walking" fill="#894798" stroke="#894798" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  </Panel>
);

ActivityChart.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(ActivityChart);
