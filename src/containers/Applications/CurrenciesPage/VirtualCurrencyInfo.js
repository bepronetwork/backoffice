/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { BankIcon, UploadIcon } from 'mdi-react';
import TextInput from '../../../shared/components/TextInput';
import EditLock from '../../Shared/EditLock';
import Dropzone from 'react-dropzone'
import _ from 'lodash';
const image2base64 = require('image-to-base64');
class VirtualCurrencyInfo extends React.Component {
 
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
        this.setState({ initialBalance: value ? parseFloat(value) : 0})
    }

    onChangeMultiplier = (value) => {
        this.setState({ multiplier: value ? parseFloat(value) : 0})
    }

    onChange = (type, value) => {
        this.setState({
            [`new${type}`]: value ? parseFloat(value) : 0
        })
    }

    projectData = async (props) => {
        const { profile, data } = props;

        const app = await profile.getApp();

        if (this.isAdded('Initial Balance')) {
            this.setState({ currencies: app.params.addOn.balance.initialBalanceList });
        }

        if (app.params.wallet.length > 0) {
            this.setState({
                wallet: app.params.wallet.find(w => w.currency._id === data._id)
            })
        }

    }

    getCurrency = (currencyId) => {
        const { currencies } = this.state;

        const currency = currencies.find(c => c.currency === currencyId);

        return currency;
    }

    confirmChanges = async () => {
        const { profile, data } = this.props;

        const app = profile.getApp();

        this.setState({...this.state, loading: true })

        if (this.state.initialBalance || this.state.multiplier) {
            
            await app.editInitialBalance({ 
                balance: this.state.initialBalance ? this.state.initialBalance : this.getCurrency(data._id).initialBalance, 
                currency: data._id, 
                multiplier: this.state.multiplier ? this.state.multiplier : this.getCurrency(data._id).multiplier 
            });
        }

        if (this.state.newImage) {
            await app.editVirtualCurrency({ params: { image: this.state.newImage } });
        }

        const prices = _.pickBy(this.state, (value, key) => key.startsWith("new"))

        for (const [key, value] of Object.entries(prices)) {
            const currency = key.replace("new", "");

            await app.editVirtualCurrency({ params: { price: value, currency: currency, image: this.state.newImage ? this.state.newImage : this.getCurrencyImage(data._id) } });
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

        if(!data || !wallet){return null};
        
        return (
            <Card className='game-container' style={{ width: 307 }}>
                <CardBody className="dashboard__card-widget" style={{ width: 370 , paddingBottom: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
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

                        { hasInitialBalanceAddOn && (this.getCurrency(_id) !== undefined) ? (
                            <>
                                <Col lg={8} >
                                <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Inital Balance</h3>

                                <div style={{ display: "flex"}}>
                                        <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{this.getCurrency(_id).initialBalance.toFixed(6)}</h3>
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

                                <Col lg={8} style={{ margin: "15px 0px" }}>
                                <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Multiplier</h3>

                                <div style={{ display: "flex"}}>
                                        <h3 style={{marginTop: 20, marginRight: 0}} className={"dashboard__total-stat"}>{this.getCurrency(_id).multiplier}</h3>
                                </div>
                                    <TextInput
                                        name="multiplier"
                                        label={<h6 style={{ fontSize: 11 }}>New Multiplier</h6>}
                                        type="text"
                                        disabled={lock}
                                        changeContent={(type, value) => this.onChangeMultiplier(value)}
                                    />

                                </Col>
                            </>

                        ) : null}   
                    
                        <Col lg={8}>
                        { !_.isEmpty(wallet.price) ? <h3 style={{ fontSize: 17, marginLeft: 0 }} className={"dashboard__total-stat"}>Price</h3> : null }
                        {wallet.price.map(p => (
                            <>
                            <br/>
                            <img src={this.getCurrencyInfo(p.currency).image} style={{float : 'left', marginRight : 4, width : 25, height : 25}}/>
                        <p className='bold-text' style={{margin: 0}}>{p.amount} {this.getCurrencyInfo(p.currency).name}</p>
                            <TextInput
                            style={{ margin: 0}}
                            name={p.currency}
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
