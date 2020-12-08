import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import ModalContainer from './ModalContainer';
import store from '../App/store';
import { addCurrencyWallet } from '../../redux/actions/addCurrencyWallet';
import { setCurrencyView } from '../../redux/actions/currencyReducer';

import { AddCurrencyButton, AddressInput, InputAddOn, WalletIDInput } from './styles';
import { InputGroup, InputGroupAddon } from 'reactstrap';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

class ModalAddCurrencyWallet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            address: "",
            subWalletId: ""
        };
    }

    handleCloseModal = () => {
        store.dispatch(addCurrencyWallet({ isActive: false }));
    }

    handleChangeAddress = value => {
        this.setState({ address: value || "" });
    }

    handleChangeWalletID = value => {
        this.setState({ subWalletId: value || "" });
    }

    handleAddCurrency = async () => {
        const { currency, profile } = this.props;
        const { address, subWalletId } = this.state;

        try {
            this.setState({ isLoading: true });

            await profile.getApp().addCurrencyWallet({ currency, address, subWalletId });
            await profile.getApp().updateAppInfoAsync();
            await profile.update();
            store.dispatch(addCurrencyWallet({ isActive: false }));

            this.setState({ isLoading: false });
        }catch (err){
            this.setState({ isLoading: false });
            await store.dispatch(setCurrencyView({}));
            store.dispatch(addCurrencyWallet({ isActive: false }));
        }
    }

    render = () => {
        const { addCurrencyWallet } = this.props;
        const { isActive } = addCurrencyWallet;

        if(!isActive){return null};

        const { currency } = this.props;
        const { name, image } = currency;
        const { isLoading, address, subWalletId } = this.state;

        return (
            <ModalContainer overflowY="scroll" onClose={() => this.handleCloseModal()} >
                    <h4 style={{ margin: '20px 0px' }}>{`Please add your ${name} credentials`}</h4>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputAddOn>
                                <img className='application__game__image' style={{ display: 'block', marginLeft: 0, marginRight: 0, height: 20, width: 20 }} src={image} alt={name}/>
                            </InputAddOn>
                        </InputGroupAddon>
                        <AddressInput name="address" placeholder={`Your ${name} address`} onChange={(e) => this.handleChangeAddress(e.target.value)}/>
                    </InputGroup>
                    <WalletIDInput name="walletId" placeholder="Wallet ID" onChange={(e) => this.handleChangeWalletID(e.target.value)}/>
                    
                    <AddCurrencyButton variant="contained" disabled={ isLoading || _.isEmpty(address) || _.isEmpty(subWalletId) } onClick={() => this.handleAddCurrency()}>
                        { isLoading ? <img src={loading} className={'loading_gif'} alt="Loading.."/> : <span>{`Add ${name}`}</span> } 
                    </AddCurrencyButton>
            </ModalContainer>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        addCurrencyWallet : state.addCurrencyWallet,
        currency: state.currency
    };
}

export default connect(mapStateToProps)(ModalAddCurrencyWallet);

