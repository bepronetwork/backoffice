import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import '../../scss/app.scss';
import './App.css';
import GlobalStyle from './GlobalStyles';

import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import Web3 from 'web3';
import { ETHEREUM_NET_DEFAULT } from '../../config/apiConfig';
import { Modal2FA, ModalError, AbstractModal, ModalAddCurrencyWallet } from '../Modals';

const loadingBetprotocol = `${process.env.PUBLIC_URL}/img/loading-betprotocol.gif`;

i18next.init(i18nextConfig);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);

    async function startWallet() {
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

    useEffect(() => {
        async function fetchAsyncData() {
            window.addEventListener('load', () => {

                setLoading(false);

                setTimeout(() => setLoaded(true), 500);
            }); 

            await startWallet()
        }

        fetchAsyncData()
    }, [])

    
    return (
        <Provider store={store}>
            <BrowserRouter basename="/">
                <I18nextProvider i18n={i18next}>
                <ScrollToTop>
                {!loaded &&
                    <div className={`load${loading ? '' : ' loaded'}`}>
                        <div className="load__icon-wrap">
                            <img src={loadingBetprotocol} alt="loading..."/>
                        </div>
                    </div>
                }
                <div>
                    <ModalAddCurrencyWallet/>
                    <Modal2FA/>
                    <ModalError/>
                    <AbstractModal/>
                    <Router />
                    <GlobalStyle/>
                </div>
                </ScrollToTop>
                </I18nextProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
