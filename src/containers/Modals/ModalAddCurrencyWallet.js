import React from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import ModalContainer from './ModalContainer';
import store from '../App/store';
import Switch from '@material-ui/core/Switch';
import { addCurrencyWallet } from '../../redux/actions/addCurrencyWallet';
import TextInput from '../../shared/components/TextInput';
import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../../shared/components/Notification';
import { print } from 'react-html2pdf';
import KeysDocument from '../Wallet/KeysDocument';
import TermsConditions from '../Wallet/TermsConditions';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;
const defaultState = {
    accepted : false,
    setWallet : false,
    setWalletEnable : false,
    enableClose : false,
    passhrase : null,
    pubkey : null,
    privkey : null,
    isLoading : false
}

let notification = null;
const showNotification = (message) => {
	notification.notice({
		content: <BasicNotification
			title=" ❌ Add currency wallet"
			message={message}
		/>,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};

class ModalAddCurrencyWallet extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        NotificationSystem.newInstance({}, n => notification = n);
    }

    componentWillUnmount() {
        notification.destroy();
    }

    async closeModal(success=false){
        const { setWalletEnable, enableClose } = this.state;

        if ((!enableClose && !setWalletEnable) || enableClose) {
            await store.dispatch(addCurrencyWallet({isActive : false, success}));

            this.setState({
                accepted : false,
                setWallet : false,
                setWalletEnable : false,
                enableClose : false,
                passhrase : null,
                pubkey : null,
                privkey : null,
                isLoading : false
            });
        }
    }

    onChangeText = ({name, value}) => {
        this.setState({...this.state, [name] : value })
    }

    handleChange = async ({key, value}) => {
        const { currency } = this.props;
        const { setWallet, passphrase } = this.state;

        switch(key) {
            case 'accepted' : {
                if (value) {
                    const { profile } = this.props;

                    if (_.isEmpty(passphrase)) { showNotification("Passphrase is required"); break; }

                    this.setState({isLoading : true});
                    let res = await profile.getApp().addCurrencyWallet({currency : currency});
                    let { status } = res.data;

                    if(status != 200){ 
                        showNotification(res.data); 
                        this.setState({isLoading : false});
                        break; 
                    }

                    let pubkey = "98u98u";
                    let privkey = "98urg8uwge8";

                    await profile.getApp().getSummary();
                    await profile.update();

                    this.setState({
                        accepted : value,
                        setWallet : (value) ? setWallet : false,
                        setWalletEnable : value,
                        pubkey,
                        privkey,
                        isLoading: false
                    });
                }
            };
            break;
            case 'setWallet' : {
                print(currency.ticker + '-key', 'jsx-template');

                this.setState({
                    setWallet : value,
                    enableClose : value
                })
            };
            break;
        }
      };

    render = () => {
        const { isActive } = this.props.addCurrencyWallet;
        const { accepted, setWallet, setWalletEnable, enableClose, pubkey, privkey, isLoading } = this.state;
        const { currency } = this.props;

        if(!isActive){return null};

        return (
            <ModalContainer onClose={this.closeModal.bind(this)} title={'Activate your wallet'} height="700" width="800">
                <Container className="dashboard">
                    <h5 style={{marginTop : -20, marginBottom : 20, textAlign : "left"}}>
                        Use the keycard that was just downloaded to your computer to activate your wallet. 
                        Your keycard contains the information required to recover your wallet. 
                        If the keycard did not download.
                    </h5>
                    <div style={{overflowY : "scroll", height : 220, textAlign : "justify", paddingRight: 14, marginBottom: 30}}>
                        <TermsConditions/>
                    </div>
                    <TextInput
                        name="passphrase"
                        label="Passphrase to unlock the wallet"
                        type="text"
                        placeholder="Passphrase to unlock the wallet"
                        changeContent={(name, value) => this.onChangeText({name, value})}
                    />
                    <div style={{opacity: (isLoading) ? "0.5" : null, backgroundColor: (isLoading) ? "#ddd" : null, borderRadius: 5}}>
                        {isLoading ?
                            <div style={{position: "absolute", marginTop: 16, marginLeft: 324}}>
                                <img src={loading} style={{width : 40, height : 40}}/>
                            </div>
                        :
                            null
                        }
                        <div style={{textAlign : "left", marginTop : 20}}>
                            <Switch color="primary" name="accepted" checked={accepted} onChange={(event) => this.handleChange({key : 'accepted', value : event.target.checked})}/>
                            <span>Accept Terms & Conditions</span>
                        </div>
                        <div style={{textAlign : "left", opacity : (setWalletEnable ? null : 0.2)}}>
                            <Switch color="primary" name="setWallet" checked={setWallet} onChange={(event) => this.handleChange({key : 'setWallet', value : event.target.checked})} disabled={!setWalletEnable}/>
                            <span>I set my Wallet Offline. Download PDF.</span>
                        </div>
                    </div>
                    <div style={{marginTop : 20}}>
                        <Button color="primary" type="submit" onClick={this.closeModal.bind(this)} disabled={(!enableClose && setWalletEnable) || !setWalletEnable}>
                            Confirm
                        </Button>
                    </div>
                </Container>
                <KeysDocument pubkey={pubkey} privkey={privkey} currency={currency}/>
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

