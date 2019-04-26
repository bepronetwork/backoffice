/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';
import Numbers from '../../../../services/numbers';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';

const data01 = [{ name: 'CoinFlip', value: 2034, fill: '#894798' },
	{ name: 'Dice', value: 934, fill: '#70bbfd' },
	{ name: 'Roulette', value: 2432, fill: '#f6da6e' },
	{ name: 'Crash', value: 8432, fill: '#ff4861' }];

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


const VisitorsSessions  = (props) =>  {

	let data = {
		betAmount : props.data.bets.data[0].bets.amount,
		games : DashboardMapperSingleton.toPieChart(props.data.users.data[0].games)
    }
	return (
		<Panel
            title={'Users´ Stats'}
            subhead="What games are more popular?"
		>
            <div className="dashboard__visitors-chart">
                <p className="dashboard__visitors-chart-title"> Total Bets <span> this week </span></p>
                <p className="dashboard__visitors-chart-number"><AnimationNumber number={data.betAmount}/></p>
                <ResponsiveContainer className="dashboard__chart-pie" width="100%" height={220}>
                <PieChart className="dashboard__chart-pie-container">
                    <Tooltip />
                    <Pie data={data.games} dataKey="value" cy={110} innerRadius={70} outerRadius={100} />
                    <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
                </PieChart>
                </ResponsiveContainer>
            </div>
		</Panel>
	)
};

VisitorsSessions.propTypes = {
  	t: PropTypes.func.isRequired,
};

export default translate('common')(VisitorsSessions);
