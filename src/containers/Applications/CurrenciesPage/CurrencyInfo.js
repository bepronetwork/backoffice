import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { BankIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
import EditLock from '../../Shared/EditLock';

class CurrencyInfo extends React.Component {
 
    constructor() {
        super();
        this.state = {
            newInitialBalance: 0,
            newMultiplier: 0,
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

    onChangeMultiplier = (value) => {
        this.setState({...this.state, newMultiplier: value ? parseFloat(value) : 0})
    }

    projectData = async (props) => {
        const { profile } = props;

        const app = await profile.getApp();

        if (app.params.addOn.hasOwnProperty('balance')) {
            this.setState({ currencies: app.params.addOn.balance.initialBalanceList });
        }

    }

    getCurrency = (currencyId) => {
        const { currencies } = this.state;

        const currency = currencies.find(c => c.currency === currencyId);

        return currency;
    }

    confirmChanges = async () => {
        const { profile, data } = this.props;
        const { newInitialBalance, newMultiplier } = this.state;

        this.setState({...this.state, loading: true })

        await profile.getApp().editInitialBalance({ balance: newInitialBalance, currency: data._id, multiplier: newMultiplier })
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
            <Card className='game-container' style={{ width: 307 }}>
                <CardBody className="dashboard__card-widget" style={{ width: 307, paddingBottom: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
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

                        <Col lg={8} style={{ marginTop: 15 }}>
                        <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Multiplier</h3>

                        <div style={{ display: "flex"}}>
                                <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{currency.multiplier}</h3>
                        </div>
                            <TextInput
                                name="multiplier"
                                label={<h6 style={{ fontSize: 11 }}>New Multiplier</h6>}
                                type="text"
                                disabled={lock}
                                changeContent={(type, value) => this.onChangeMultiplier(value)}
                            />

                    </Col>
                    </Row>
                    </EditLock>
                </CardBody>
            </Card>
        );
    }
}

export default CurrencyInfo;
