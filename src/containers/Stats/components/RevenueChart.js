import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { translate } from 'react-i18next';
import Panel from '../../../shared/components/Panel';
import DashboardMapperSingleton from '../../../services/mappers/Dashboard';
import Skeleton from '@material-ui/lab/Skeleton';

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
        let data = props.data;
        const { currency } = props;

        this.setState({...this.state, 
            chartData : data.revenue.data ? DashboardMapperSingleton.toRevenueChart(data.revenue.data) : defaultProps.chartData,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            timeline : data.revenue.data ? defaultProps.timeline : defaultProps.timeline
        })
    }

    render(){

        const { isLoading } = this.props;

        return(
                <Panel naked={true} md={12} lg={12} xl={12} title={`Summary`}>
                    {isLoading ? (
                    <Skeleton variant="rect" height={250}/> 
                    ) : (
                    <ResponsiveContainer height={250} className="dashboard__area">
                        <AreaChart data={this.state.chartData} margin={{ top: 20, left: 5, bottom: 20 }} >
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis unit={` ${this.state.ticker}`} tickLine={false} >
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid />
                        <Area name="Revenue" type="monotone" dataKey="a" fill="#894798" stroke="#894798" fillOpacity={0.3} /> 
                        <Area name="Profit" type="monotone" dataKey="c" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.4} /> 
                        </AreaChart>
                    </ResponsiveContainer>)}
                </Panel>
                )
                
        }
}
    


export default translate('common')(RevenueChart);
