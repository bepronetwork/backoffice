import React from 'react';
import { PieChart, Pie } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';
import Numbers from '../../../../services/numbers';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import { connect } from "react-redux";

const defaultProps = {
    betsData : {
        bets : [0],
        graph : [
            { value: 0, fill: '#894798' },
            { value: 0, fill: '#eeeeee' }
        ]
    },
    percentage : 0,
    ticker : 'N/A'
}


class BetsStatistics extends React.Component {

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
        const { bets, wallet } = props.data;
        const { currency } = props;

        if(bets.data[0]){
            let betsData = {
                bets : bets.data[0].bets,
                graph : [
                    { value: 100-Numbers.toFloat(bets.data[0].bets.percentage_won*100), fill: '#894798' },
                    { value: 100-Numbers.toFloat(bets.data[0].bets.percentage_won*100), fill: '#eeeeee' }
                ]
            }
        
            let percentage = 100-Numbers.toFloat(betsData.bets.percentage_won*100);
    
    
            this.setState({...this.state, 
                betsData : betsData ? betsData : defaultProps.betsData,
                ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
                percentage
            })
        }
      
    }

    render = () => {
        return (
            <Panel title={'Bet´s Stats'} subhead="last 7 days"
            >
                <div className="dashboard__stat dashboard__stat--budget">
                    <div className="dashboard__stat-main">
                        <p className="dashboard__stat-main-title">Won Bets</p>
                        <p className="dashboard__stat-main-number percent"><AnimationNumber font = '45px' decimals={2} number={this.state.percentage}/> %</p>
                        <hr />
                    </div>
                    <div className="dashboard__stat-chart">
                        <PieChart height={120} width={120}>
                        <Pie data={this.state.betsData.graph} dataKey="value" cx={55} cy={55} innerRadius={50} outerRadius={60} />
                        </PieChart>
                        <p className="dashboard__stat-label">{this.state.ticker}</p>
                    </div>
                    <div className="dashboard__stat-data">
                        <div>
                        <p className="dashboard__stat-data-number"><AnimationNumber decimals={6} number={this.state.betsData.bets.avg_bet}/> {this.state.ticker}</p>
                        <p style={{ color: '#ff4861' }}> Average User Bet </p>
                        </div>
                        <div>
                        <p className="dashboard__stat-data-number"> <AnimationNumber decimals={6} number={this.state.betsData.bets.avg_bet_return}/> {this.state.ticker}</p>
                        <p style={{ color: '#894798' }}>Average Return (No Fee)</p>
                        </div>
                    </div>
                </div>
            </Panel>
        )
        
    }
} 
 
function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency
    };
}

export default connect(mapStateToProps)(BetsStatistics);

