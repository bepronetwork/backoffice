import React from 'react';
import { PieChart, Pie } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';
import Numbers from '../../../../services/numbers';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';

const BudgetStatistic = (props) =>  {
	let data = {
		bets : props.data[0].bets,
		graph : [
		{ value: 100-Numbers.toFloat(props.data[0].bets.percentage_won*100), fill: '#894798' },
		{ value: 100-Numbers.toFloat(props.data[0].bets.percentage_won*100), fill: '#eeeeee' }]
	}

	let percentage = 100-Numbers.toFloat(data.bets.percentage_won*100);
	return (
		<Panel title={'Bet´s Stats'}     subhead="last 7 days"
		>
		<div className="dashboard__stat dashboard__stat--budget">
		<div className="dashboard__stat-main">
			<p className="dashboard__stat-main-title">Won Bets</p>
			<p className="dashboard__stat-main-number"><AnimationNumber decimals={true} number={percentage}/> %</p>
			<hr />
		</div>
		<div className="dashboard__stat-chart">
			<PieChart height={120} width={120}>
			<Pie data={data.graph} dataKey="value" cx={55} cy={55} innerRadius={50} outerRadius={60} />
			</PieChart>
			<p className="dashboard__stat-label">€</p>
		</div>
		<div className="dashboard__stat-data">
			<div>
			<p className="dashboard__stat-data-number"><AnimationNumber decimals={true} number={data.bets.avg_bet}/> €</p>
			<p style={{ color: '#ff4861' }}> Average User Bet </p>
			</div>
			<div>
			<p className="dashboard__stat-data-number"> <AnimationNumber decimals={true} number={data.bets.avg_bet_return}/> €</p>
			<p style={{ color: '#894798' }}>Average Return (No Fee)</p>
			</div>
		</div>
		</div>
	</Panel>
	)
}
 
BudgetStatistic.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(BudgetStatistic);
