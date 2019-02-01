import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const data = [
  { name: '12.03', uv: 4000 },
  { name: '13.03', uv: 3000 },
  { name: '14.03', uv: 2000 },
  { name: '15.03', uv: 2780 },
  { name: '16.03', uv: 1890 },
  { name: '17.03', uv: 2390 },
  { name: '18.03', uv: 3490 },
  { name: '19.03', uv: 3490 },
  { name: '20.03', uv: 3490 },
  { name: '21.03', uv: 3490 },
];

const BounceRateArea = ({ t }) => (
  <Panel  title={'New Users'}>
    <p className="dashboard__visitors-chart-title"> Sign Up <span> today </span></p>
    <p className="dashboard__bounce-percent">3490</p>
    <ResponsiveContainer height={220} className="dashboard__area">
      <AreaChart
        data={data}
        margin={{
         top: 0, right: 0, left: -15, bottom: 0,
        }}
      >
        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickLine={false} />
        <CartesianGrid vertical={false} />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#894798" fill="#894798" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  </Panel>
);

BounceRateArea.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(BounceRateArea);
