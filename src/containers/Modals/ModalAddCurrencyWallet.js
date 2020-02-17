import React from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import ModalContainer from './ModalContainer';
import store from '../App/store';
import Switch from '@material-ui/core/Switch';
import { addCurrencyWallet } from '../../redux/actions/addCurrencyWallet';
import { setCurrencyView } from '../../redux/actions/currencyReducer';
import TextInput from '../../shared/components/TextInput';
import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../../shared/components/Notification';
import jsPDF from 'jspdf';
import TermsConditions from '../Wallet/TermsConditions';
import { emptyObject } from '../../lib/misc';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;
const defaultState = {
    accepted : false,
    setWallet : false,
    setWalletEnable : false,
    enableClose : false,
    passhrase : null,
    keyResponse : null,
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
        const { currency, profile } = this.props;

        if ((!enableClose && !setWalletEnable) || enableClose) {
            await store.dispatch(addCurrencyWallet({isActive : false, success}));

            const wallet = profile.getApp().getWallet({currency_id : currency._id});
            if(emptyObject(wallet)){
                await store.dispatch(setCurrencyView({}));
            };

            this.setState({
                accepted : false,
                setWallet : false,
                setWalletEnable : false,
                enableClose : false,
                passhrase : null,
                keyResponse : null,
                isLoading : false
            });
        }
    }

    onChangeText = ({name, value}) => {
        this.setState({...this.state, [name] : value })
    }
    
    generatePDF = () => {
        const { currency } = this.props;
        const { keyResponse } = this.state;

        const pageWidth = 8.5, lineHeight = 1.2, margin = 0.5, maxLineWidth = pageWidth - margin * 2, ptsPerInch = 72, oneLineHeight = (12 * lineHeight) / ptsPerInch;
        var doc = new jsPDF({unit: "in", lineHeight: lineHeight});

        //doc.addImage("https://storage.googleapis.com/betprotocol-tokens/eth.png", "JPEG", 15, 40, 180, 180);
        doc.setFontSize(36);
        doc.text(currency.ticker, margin, margin + 2 * oneLineHeight);

        const title = "Keep my backup key secure with trusted partner (Coincover)";
        const titleLines = doc.setFontSize(12).splitTextToSize(title, maxLineWidth);
        doc.text(titleLines, margin, margin + 6 * oneLineHeight);

        const info = "Create a backup key with our trusted partner to ensure you NEVER lose access to the funds in your wallet. It is automatically set by default (https://www.coincover.com)."
        const infoLines = doc.setFontSize(12).splitTextToSize(info, maxLineWidth);
        doc.text(infoLines, margin, margin + 8 * oneLineHeight);

        doc.setLineWidth(0.01);
        doc.line(margin, 2.5, 7.6, 2.5);

        const json = keyResponse;
        const jsonLines = doc.setFontSize(12).splitTextToSize(json, maxLineWidth);
        doc.text(jsonLines, margin, margin + 12 * oneLineHeight);

        doc.save(currency.ticker+'-key.pdf');
    }


    handleChange = async ({key, value}) => {
        const { currency } = this.props;
        const { setWallet, passphrase } = this.state;

        try {
            switch(key) {
                case 'accepted' : {
                    if (value) {
                        const { profile } = this.props;

                        if (_.isEmpty(passphrase)) { showNotification("Passphrase is required"); break; }

                        this.setState({isLoading : true, setWalletEnable : true});
                        let res = await profile.getApp().addCurrencyWallet({currency : currency, passphrase});
                        let { status } = res.data;

                        if(status != 200){ 
                            showNotification(res.data); 
                            this.setState({isLoading : false, enableClose : true});
                            break; 
                        }

                        let keyResponse = JSON.stringify(res.data.message.keys.user, null, 4);

                        await profile.getApp().getSummary();
                        await profile.update();

                        this.setState({
                            accepted : value,
                            setWallet : (value) ? setWallet : false,
                            keyResponse,
                            isLoading: false
                        });
                    }
                };
                break;
                case 'setWallet' : {

                    this.generatePDF();

                    this.setState({
                        setWallet : value,
                        enableClose : value
                    })
                };
                break;
            }
        }catch (err){
            console.log(err)
            await store.dispatch(setCurrencyView({}));
        }
    };

    render = () => {
        const { isActive } = this.props.addCurrencyWallet;
        const { accepted, setWallet, setWalletEnable, enableClose, isLoading } = this.state;

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

