import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';



const ABTestingAnalytics = (props) => {
  let data = DashboardMapperSingleton.toRevenueChart(props.data)
  return(
    <Panel naked={true} md={12} lg={12} xl={12} title={'Weekly Summary'}>
      <ResponsiveContainer height={250} className="dashboard__area">
        <AreaChart data={data} margin={{ top: 20, left: 5, bottom: 20 }} >
          <XAxis dataKey="name" tickLine={false} />
          <YAxis unit=" €" tickLine={false} >
        </YAxis>
          <Tooltip />
          <Legend />
          <CartesianGrid />
          {/*<Area name="Revenue" type="monotone" dataKey="a" fill="#894798" stroke="#894798" fillOpacity={0.3} /> */}
          {/*<Area name="Loss" type="monotone" dataKey="b" fill="#894798" stroke="#894798" fillOpacity={0.1} />*/}
          <Area name="Profit" type="monotone" dataKey="c" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.4} />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
  )
}

const AxisLabel = ({ axisType, x, y, width, height, children }) => {
  const isVert = axisType === 'yAxis';
  const cx = isVert ? x : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" >
      {children}
    </text>
  );
};
ABTestingAnalytics.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(ABTestingAnalytics);
