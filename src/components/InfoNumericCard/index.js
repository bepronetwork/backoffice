/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody } from 'reactstrap';
import AnimationNumber from '../../containers/UI/Typography/components/AnimationNumber';

const defaultProps = {
    title : 'N/A',
    amount : 'N/A',
    ticker : 'N/A',
    subtitle : 'N/A'
}


class InfoNumericCard extends PureComponent {
 
    constructor(props){
        super(props);
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
        const { title, ticker, amount, subtitle } = props;
        this.setState({...this.state, 
            title,
            ticker,
            amount,
            subtitle
        })
    }


  
    render() {
        const { title, ticker, amount, subtitle} = this.state;
        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <div className="dashboard__visitors-chart">
                        <p className="dashboard__visitors-chart-number-second"
                        ><AnimationNumber decimals={2} number={amount}/> 
                        <span style={ {color : '#646777'}}> {ticker}</span> </p>
                    </div>
                    <div className="dashboard__visitors-chart">
                        <h4 className="dashboard__visitors-chart-title"> {title}</h4> 
                        <p className="dashboard__visitors-chart-title"> {subtitle} </p>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default InfoNumericCard;
