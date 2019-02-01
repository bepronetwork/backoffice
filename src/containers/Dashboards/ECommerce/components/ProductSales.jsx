import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const data = [{
  name: 'Mon', plan: 590, pv: 800, current: 1400,
},
{
  name: 'Tue', plan: 868, pv: 967, current: 1506,
},
{
  name: 'Wed', plan: 1397, pv: 1098, current: 989,
},
{
  name: 'Thu', plan: 1480, pv: 1200, current: 1228,
},
{
  name: 'Fri', plan: 1520, pv: 1108, current: 1100,
},
{
  name: 'Sat', plan: 1520, pv: 1108, current: 1100,
},
{
  name: 'Sun', plan: 1400, pv: 680, current: 1700,
}];

const ProductSales = ({ t }) => (
  <Panel lg={12} title={t('dashboard_commerce.product_sales')}>
    <ResponsiveContainer height={250} className="dashboard__area">
      <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickLine={false} />
        <Tooltip />
        <Legend />
        <CartesianGrid />
        <Area
          name="Current Sales"
          type="monotone"
          dataKey="current"
          fill="#894798"
          stroke="#894798"
          fillOpacity={0.2}
        />
        <Area name="Plan Sales" type="monotone" dataKey="plan" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  </Panel>
);

ProductSales.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(ProductSales);
