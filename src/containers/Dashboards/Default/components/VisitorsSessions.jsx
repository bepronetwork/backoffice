/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';
import Numbers from '../../../../services/numbers';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import Skeleton from '@material-ui/lab/Skeleton';

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

const defaultProps = {
    data : {
        bets : [0],
        games : []
    }
}

class VisitorsSessions extends React.Component{

    constructor(props){
        super(props)
        this.state = { ...defaultProps};
        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { bets, users } = props.data;

        if(bets.data.length > 0 && users.data.length > 0){
            
            const allBets = getAllBets(users.data);

            let amount = allBets.reduce((acc, game) => acc+game.betAmount, 0);

            let data = {
                betAmount : amount,
                games : DashboardMapperSingleton.toPieChart(allBets)
            }
            

            this.setState({...this.state, 
                data : data ? data : defaultProps.data
            })
        } else {
            this.setState({...this.state, 
                data: defaultProps.data
            })
        }
      
    }

    render = () => {
        const { data } = this.state;
        const { isLoading, periodicity } = this.props;

        return (
            <Panel
                title={'Users´ Stats'}
                subhead="What games are more popular?"
            >
                <div className="dashboard__visitors-chart">
                    <p className="dashboard__visitors-chart-title"> Total Bets <span>{periodicity}</span> </p>
                    {isLoading ? (
                    <>
                    <Skeleton variant="rect" width={50} height={29} style={{ marginTop: 10, marginBottom: 10, marginRight: 'auto' }}/>
                    <Skeleton variant="rect" height={210} style={{ marginTop: 10, marginBottom: 5 }}/> 
                    </>
                    ) : (
                    <>
                    <p className="dashboard__visitors-chart-number"><AnimationNumber decimals={0} number={data.betAmount}/></p>
                    <ResponsiveContainer className="dashboard__chart-pie" width="100%" height={220}>
                    <PieChart className="dashboard__chart-pie-container">
                        <Tooltip />
                        <Pie data={data.games} dataKey="value" cy={110} innerRadius={70} outerRadius={100} />
                        <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
                    </PieChart>
                    </ResponsiveContainer>
                    </>
                    )}
                </div>
            </Panel>
        )
        }
};

function getAllBets(users){

    const betsOnPeriodicity = users.map(index => index.games);
    const concatBets = [].concat(...betsOnPeriodicity);

    const allBets = Object.values([...concatBets].reduce((acc, { _id, name, edge, betsAmount, betAmount, profit, fees }) => {
    acc[_id] = { _id, name, 
        edge: (acc[_id] ? acc[_id].edge : 0) + edge,
        betsAmount: (acc[_id] ? acc[_id].betsAmount : 0) + betsAmount,
        betAmount: (acc[_id] ? acc[_id].betAmount : 0) + betAmount,
        profit: (acc[_id] ? acc[_id].profit : 0) + profit,
        fees: (acc[_id] ? acc[_id].fees : 0) + fees };
    return acc;
    }, {}));

    return allBets;
}

VisitorsSessions.propTypes = {
  	t: PropTypes.func.isRequired,
};

export default translate('common')(VisitorsSessions);
