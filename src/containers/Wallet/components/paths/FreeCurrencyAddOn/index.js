import React from 'react';
import { connect } from 'react-redux';
import EditLock from '../../../../Shared/EditLock';
import _ from 'lodash';

import './styles.css';
import { Container, InputAddOn, Label, TextField } from './styles';
import BooleanInput from '../components/utils/BooleanInput';
import { AlertCircleOutlineIcon } from 'mdi-react';
import { FormLabel } from '@material-ui/core';
import { InputGroup, InputGroupAddon } from 'reactstrap';

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 15, 
    color: "#646777"
}

class FreeCurrencyAddOn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            locked: true,
            loadingConversion: false,
            anchorEl: null,
            selectingAbsolute: false,
            selectingRatio: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { profile, wallet } = props;
        const { currency } = wallet;

        const freeCurrency = profile.App.params.addOn.freeCurrency;
        const currentWallet = freeCurrency.wallets.find(wallet => wallet.currency === currency._id);

        const { activated, time, value, _id, multiplier } = currentWallet;

        this.setState({ 
            activated: activated, 
            currency: currency, 
            time: time / 60000, 
            value: value,
            multiplier: multiplier,
            _id: _id
        })
    }

    unlock = () => {
        this.setState({ locked: false });
    }

    lock = () => {
        this.setState({ locked: true });
    }

    getCurrencyImage = ({ id }) => {
        const { profile } = this.props;

        const wallet = profile.App.params.wallet;
        const currency = wallet.find(c => c.currency._id === id);

        return currency.image;
    }

    onChangeIsValid = () => {
        const { isValid } = this.state;

        this.setState({
            isValid: !isValid
        })
    }

    onChangeTime = value => {
        this.setState({ time: value ? value : null })
    }

    onChangeMultiplier = value => {
        this.setState({ multiplier: value ? value : null })
    }

    onChangeValue = value => {
        this.setState({ value: value ? value : null })
    }

    handleChangeActive = value => {
        this.setState({ activated: value })
    }

    confirmChanges = async () => {
        const { activated, currency, time, value, multiplier } = this.state;
        const { profile } = this.props;

        if (!time || !value || !multiplier || time < 1) {
            this.setState({ isLoading: false, locked: true });
            this.projectData(this.props);
        } else {

            this.setState({ isLoading: true });
        
            await profile.getApp().editFreeCurrency({ 
                activated: activated, 
                currency: currency._id, 
                time: time * 60000, 
                value: parseFloat(value),
                multiplier: parseFloat(multiplier)
            });

            await profile.getApp().updateAppInfoAsync();
            await profile.update();

            this.setState({
                isLoading: false,
                locked: true
            });
        }
    }

    render() {
        const { locked, isLoading, currency, activated, time, value, multiplier } = this.state;

        if (_.isEmpty(currency)) return null;

        return (
            <Container>
                <EditLock 
                    unlockField={this.unlock} 
                    lockField={this.lock} 
                    confirmChanges={this.confirmChanges} 
                    isLoading={isLoading}
                    locked={locked}>
                    
                    <div style={{ margin: "10px 0px" }}>
                        <FormLabel component="legend" style={labelStyle}>{ activated ? "Active" : "Inactive" }</FormLabel>
                        <BooleanInput
                            checked={activated} 
                            onChange={() => this.handleChangeActive(!activated)}
                            disabled={locked || isLoading}
                            type={'isActive'}
                            id={'isActive'}
                        />
                    </div>

                    <hr/>

                    <Label>Time in minutes</Label>
                    <TextField placeholder="" disabled={locked} value={time} type="number" onChange={(e) => this.onChangeTime(e.target.value)}/>

                    <br/>

                    <Label>Amount</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputAddOn>
                                <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 20, width: 20 }} src={currency.image} alt={currency.name}/>
                            </InputAddOn>
                        </InputGroupAddon>
                        <TextField disabled={locked} value={value} type="number" onChange={(e) => this.onChangeValue(e.target.value)}/>
                    </InputGroup>
                
                    <br/>

                    <Label>Multiplier</Label>
                    <TextField placeholder="" disabled={locked} value={multiplier} type="number" onChange={(e) => this.onChangeMultiplier(e.target.value)}/>

                    <br/>

                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        { time && value ? <span>{`${value} ${currency.ticker} after each ${time} minutes`}</span> : <span>Invalid time or amount</span> }
                        <AlertCircleOutlineIcon size={18} style={{ marginLeft: 5 }}/>
                    </div>
                </EditLock>
            </Container>
        )
    }

}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(FreeCurrencyAddOn);