import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import Numbers from '../../../../../services/numbers';
import { Link } from 'react-router-dom';
import { TickCircleIcon } from 'mdi-react';
const tick = `${process.env.PUBLIC_URL}/img/tick.gif`;

class ReciptBox extends PureComponent {
 
    constructor(props) {
        super(props);
            this.state = {
        };
    }

  
    render() {  

        let recipt = this.props.recipt;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <hr></hr>
                <div className="dashboard__visitors-chart">
                    <h3>Amount</h3> 
                    <p style={{fontSize : 20}} className="dashboard__visitors-chart-title">{Numbers.toMoney(recipt.amount)}<span> ETH </span></p>
                    <p style={{fontSize : 20}} className="dashboard__visitors-chart-title">{ Numbers.toMoney(recipt.usd_amount)}<span> € </span></p>
                </div>
                <div className="dashboard__visitors-chart">
                    <h3>Transaction Hash</h3> 
                    <p className="dashboard__visitors-chart-title">{recipt.block}</p>
                </div>
                <img style={{width : 200, margin : 'auto', display : 'block'}} src={tick}></img>
                <Link to={'/wallet'}>
                    <Button outline className="primary" >
                        <p><TickCircleIcon className="deposit-icon"/> Confirm </p>   
                    </Button> 
                </Link>

            </Col>
        );
    }
}

export default ReciptBox;
  