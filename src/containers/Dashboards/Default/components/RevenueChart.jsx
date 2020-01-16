import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { translate } from 'react-i18next';
import Panel from '../../../../shared/components/Panel';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';

const defaultProps = {
    chartData : [
        {
            name : "N/A",
            a : 0,
            b : 0,
            c : 0,
            timestamp : new Date()
        }
    ],
    ticker : 'N/A',
    timeline  : 'Weekly'
}


class RevenueChart extends React.Component{
    
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
        let { data , periodicity, currency } = props;

        this.setState({...this.state, 
            chartData : data.revenue.data ? DashboardMapperSingleton.toRevenueChart(data.revenue.data) : defaultProps.chartData,
            ticker : currency.ticker ? currency.ticker : defaultProps.timeline,
            timeline : periodicity ? periodicity : defaultProps.timeline
        })
    }

    render(){

        return(
                <Panel naked={true} md={12} lg={12} xl={12} title={`${this.state.timeline} Summary`}>
                    <ResponsiveContainer height={250} className="dashboard__area">
                        <AreaChart data={this.state.chartData} margin={{ top: 20, left: 5, bottom: 20 }} >
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis unit={` ${this.state.ticker}`} tickLine={false} >
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid />
                        <Area name="Profit" type="monotone" dataKey="c" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.4} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Panel>
                )
                
        }
}
    


export default translate('common')(RevenueChart);
