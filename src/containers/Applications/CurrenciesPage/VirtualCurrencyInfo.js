/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { BankIcon, UploadIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
import EditLock from '../../Shared/EditLock';
import Dropzone from 'react-dropzone'
const image2base64 = require('image-to-base64');

class VirtualCurrencyInfo extends PureComponent {
 
    constructor() {
        super();
        this.state = {
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
        this.setState({ newInitialBalance: value ? parseFloat(value) : 0})
    }

    onChange = (type, value) => {
        this.setState({
            [`new${type}`]: value ? parseFloat(value) : 0
        })
    }

    projectData = async (props) => {
        const { profile, data } = props;

        const app = await profile.getApp();

        this.setState({ currencies: app.params.currencies });

        if (app.params.wallet.length > 0) {
            this.setState({
                wallet: app.params.wallet.find(w => w.currency._id === data._id)
            })
        }

    }

    getCurrency = (currencyId) => {
        const { App } = this.props.profile;
        
        const currencies = App.params.addOn.balance.initialBalanceList;

        const currency = currencies.find(c => c.currency === currencyId);

        return currency;
    }

    confirmChanges = async () => {
        const { profile, data } = this.props;

        const app = profile.getApp();

        this.setState({...this.state, loading: true })

        if (this.state.newInitialBalance) {
            await app.editInitialBalance({ balance: this.state.newInitialBalance, currency: data._id });
        }

        if (this.state.newImage) {
            await app.editVirtualCurrency({ params: { image: this.state.newImage } });
        }

        if (this.state.newBTC) {
            await app.editVirtualCurrency({ params: { price: this.state.newBTC, currency: "5e710b90f6e2b0765fac2304" } });
        }

        if (this.state.newEHT) {
            await app.editVirtualCurrency({ params: { price: this.state.newETH, currency: "5e108498049eba079930ae1c" } });
        }

        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({...this.state, loading: false })
        this.lock()

    }

    onAddedFile = async (files) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview) // you can also to use url

        this.setState({
            newImage: blob
        })

    }
    
    getCurrencyInfo = (currencyId) => {
        const { profile } = this.props;

        const currencies = profile.App.params.currencies;

        return currencies.find(c => c._id === currencyId);
    }

    getCurrencyImage = (currencyId) => {
        const { profile } = this.props;

        const wallet = profile.App.params.wallet;

        const currency = wallet.find(c => c.currency._id === currencyId);

        return currency.image;
    }

    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    isAdded = (AddOn) => {
        const { profile } = this.props;

        const app = profile.App;
        const appAddOns = app.params.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.toLowerCase().includes(k.toLowerCase()));
         
    }

    render() {
        const { data } = this.props;
        const { _id, name, ticker } = data;
        const { lock, wallet, newImage } = this.state;

        const hasInitialBalanceAddOn = this.isAdded('Initial Balance');
        const currency = this.getCurrency(data._id);


        if(!data || !currency || !wallet){return null}
        
        return (
            <Card className='game-container' style={{ width: 307 }}>
                <CardBody className="dashboard__card-widget dashboard_borderTop" style={{ width: 370 , paddingBottom: 10 }}>
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
                            src={newImage ? this.renderImage(newImage) : this.getCurrencyImage(_id)}/>
                            <div className="dashboard__visitors-chart text-center">
                                <p className="dashboard__visitors-chart-title text-center" style={{fontSize: 26}}> {name} </p>
                            </div>
                            <Dropzone onDrop={this.onAddedFile} style={{ width: '100%', marginTop: 7, marginBottom: 15 }} ref={(el) => (this.dropzoneRef = el)} disabled={this.state.lock}>
                                <Button className="icon" style={{ padding: 2, margin: 0}} disabled={this.state.lock}>
                                    <p style={{ fontSize: '12px' }}><UploadIcon className="deposit-icon"/> New Logo </p>
                                </Button>
                            </Dropzone>
                        </Col>

                        { hasInitialBalanceAddOn ? (
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

                        ) : null}
                    
                        <Col lg={8}>
                        <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Price</h3>
                        {wallet.price.map(p => (
                            <>
                            <br/>
                            <img src={this.getCurrencyInfo(p.currency).image} style={{float : 'left', marginRight : 4, width : 25, height : 25}}/>
                        <p className='bold-text' style={{margin: 0}}>{p.amount} {this.getCurrencyInfo(p.currency).name}</p>
                            <TextInput
                            style={{ margin: 0}}
                            name={this.getCurrencyInfo(p.currency).name}
                            label={<h6 style={{ fontSize: 11 }}>{`New ${this.getCurrencyInfo(p.currency).name} price`}</h6>}
                            type="text"
                            disabled={lock}
                            changeContent={(type, value) => this.onChange(type, value)}
                            />
                            </>
                        ))}
                        </Col>
                    </Row>
                    </EditLock>
                </CardBody>
            </Card>
        );
    }
}

export default VirtualCurrencyInfo;
