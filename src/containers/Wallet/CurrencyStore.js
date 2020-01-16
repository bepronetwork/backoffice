import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import AnimationNumber from '../UI/Typography/components/AnimationNumber';
import { Tooltip, IconButton } from '@material-ui/core';
import { InformationIcon } from 'mdi-react';
import CurrencyStoreContainer from './store/Currency';


class CurrencyStore extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ecosystemCurrencies : [],
            integratedWallets : []
        }
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    addCurrency = async currency => {
        const { profile } = this.props;
        await profile.getApp().addCurrency({currency : currency});
        await profile.getApp().getSummary();
        await profile.update();
        await this.projectData(this.props)
    }
    
    projectData = async (props) => {
        let { profile } = props;
        let ecosystemCurrencies = await profile.getApp().getEcosystemCurrencies();
        if(!(profile.getApp().getSummaryData('walletSimple').data)){return null}
        let integratedWallets = (profile.getApp().getSummaryData('walletSimple')).data;
        ecosystemCurrencies = ecosystemCurrencies.map( ecoCurrency => {
            let exists = false;
            integratedWallets.map( w => {
                if(new String(w.currency._id).toString().toLowerCase().trim() == new String(ecoCurrency._id).toString().toLowerCase().trim()){
                    exists = true;
                };
            })
            if(!exists){return ecoCurrency}
            else{ return {...ecoCurrency, isAdded : true}}
        }).filter(el => el != null);

        this.setState({...this.state, 
            ecosystemCurrencies,
            integratedWallets
        })
    }

    render = () => {
        const { ecosystemCurrencies } = this.state;

        return (
            <Container className="dashboard">
                <div className="dashboard__visitors-chart">
                    <h4 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}> Currency Store </h4>
                    <p>
                       Available Currencies to Integrate
                    </p>
                </div>
                <div style={{marginTop : 20}}>
                    <Row>
                        {ecosystemCurrencies.map( c => {
                            return (
                                <Col md={3}>
                                    <CurrencyStoreContainer onClick={this.addCurrency} currency={c} isAdded={c.isAdded}/>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
                
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(CurrencyStore);

