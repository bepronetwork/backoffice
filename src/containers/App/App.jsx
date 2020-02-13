import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import Web3 from 'web3';
import { ETHEREUM_NET_DEFAULT } from '../../config/apiConfig';
import { Modal2FA, ModalError, AbstractModal, ModalAddCurrencyWallet } from '../Modals';

i18next.init(i18nextConfig);

class App extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			loaded: false,
		};
    }

	asyncCalls = async () => {
		this.enterWebsite();

	}

	enterWebsite = () => {
		 window.addEventListener('load', () => {
			this.setState({ loading: false });
			setTimeout(() => this.setState({ loaded: true }), 500);
		}); 
	}

	componentDidMount() {
        this.asyncCalls();
        this.startWallet();
        
    }
    
    startWallet = async () => {
        // Modern dapp browsers...
        if (window.ethereum) {

            global.web3 = new Web3(window.ethereum);
            
            try {
                //await ethereum.enable();

                //var myContract = new web3.eth.Contract(abi,contractAddress);
                /* myContract.methods.RegisterInstructor('11','Ali')
                .send(option,function(error,result){
                    if (! error)
                        console.log(result);
                    else
                        console.log(error);
                }); */
            } catch (error) {
                global.web3 = new Web3(new Web3.providers.HttpProvider(`https://${ETHEREUM_NET_DEFAULT}.infura.io/`));
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            global.web3 = new Web3(new Web3.providers.HttpProvider(`https://${ETHEREUM_NET_DEFAULT}.infura.io/`));
             // Acccounts always exposed
        }
        // Non-dapp browsers...
        else {
            global.web3 = new Web3(new Web3.providers.HttpProvider(`https://${ETHEREUM_NET_DEFAULT}.infura.io/`));
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }        

    }
    

	render() {
		const { loaded, loading } = this.state;
		return (
			<Provider store={store}>
                <BrowserRouter basename="/">
                    <I18nextProvider i18n={i18next}>
                    <ScrollToTop>
                    {!loaded &&
                        <div className={`load${loading ? '' : ' loaded'}`}>
                        <div className="load__icon-wrap">
                            <svg className="load__icon">
                            <path fill="#894798" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                            </svg>
                        </div>
                        </div>
                    }
                    <div>
                        <ModalAddCurrencyWallet/>
                        <Modal2FA/>
                        <ModalError/>
                        <AbstractModal/>
                        <Router />
                    </div>
                    </ScrollToTop>
                    </I18nextProvider>
                </BrowserRouter>
			</Provider>
		);
		}
}

export default hot(module)(App);
