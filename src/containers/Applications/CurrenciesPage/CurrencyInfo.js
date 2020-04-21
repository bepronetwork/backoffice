/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { BankIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
import EditLock from '../../Shared/EditLock';

class CurrencyInfo extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            newInitialBalance: 0,
            currencies: [],
            lock: true
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    unlock = () => {
        this.setState({...this.state, lock: false })
    }

    lock = () => {
        this.setState({...this.state, lock: true })
    }

    onChangeInitialBalance = (value) => {
        this.setState({...this.state, newInitialBalance: value ? parseFloat(value) : 0})
    }

    projectData = async (props) => {
        const { profile } = props;

        const app = await profile.getApp();

        this.setState({ currencies: app.params.addOn.balance.initialBalanceList });
    }

    getCurrency = (currencyId) => {
        const { currencies } = this.state;

        const currency = currencies.find(c => c.currency === currencyId);

        return currency;
    }

    confirmChanges = async () => {
        const { profile, data } = this.props;
        const { newInitialBalance } = this.state;

        console.log(newInitialBalance);

        this.setState({...this.state, loading: true })

        await profile.getApp().editInitialBalance({balance: newInitialBalance, currency: data._id })
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({...this.state, loading: false })
        this.lock()

    }

    render() {
        const { data } = this.props;
        const { name, image, ticker } = data;
        const { lock } = this.state;
        const currency = this.getCurrency(data._id);

        if(!data || !currency){return null}
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card className='game-container'>
                    <CardBody className="dashboard__card-widget dashboard_borderTop" style={{width: '307px', paddingBottom: 10}}>
                            <EditLock 
                                unlockField={this.unlock} 
                                lockField={this.lock} 
                                confirmChanges={this.confirmChanges} 
                                isLoading={this.state.loading}
                                locked={lock}>
                        <Row>
                            <Col lg={4} >  
                                <img className='application__game__image' 
                                style={{display: 'block', width: '60px'}} 
                                src={image}/>
                                <div className="dashboard__visitors-chart text-center">
                                    <p className="dashboard__visitors-chart-title text-center" style={{fontSize: 26}}> {name} </p>
                                </div>
                            </Col>
                            <Col lg={8} >
                            <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Inital Balance</h3>

                            <div style={{ display: "flex"}}>
                                    <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{currency.initialBalance.toFixed(6)}</h3>
                                    <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>{ticker}</h3>
                            </div>
                                <TextInput
                                    icon={BankIcon}
                                    name="initialBalance"
                                    label={<h6 style={{ fontSize: 11 }}>New Intial Balance</h6>}
                                    type="text"
                                    disabled={lock}
                                    changeContent={(type, value) => this.onChangeInitialBalance(value)}
                                />

                            </Col>
                        </Row>
                        </EditLock>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default CurrencyInfo;
