import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import CasinoContract from "./CasinoContract";
import ERC20TokenContract from "./ERC20Contract";
import CryptographySingleton from "../services/security/Cryptography";
import codes from "../config/codes";
import Numbers from "../services/numbers";
import { getNonce } from "../lib/number";
import { getMetamaskAddress } from "../lib/metamask";
import { getPastTransactions, getTransactionDataERC20 } from "../lib/etherscan";
import { setCurrencyView } from "../redux/actions/currencyReducer";
import CasinoContractETH from "./CasinoContractETH";

class App{    
    constructor(params){
        this.params = params;
        this.data = {
            summary : {}
        };
        this.casinoContract = null;
    }

    getSummary = async () => {
        // grab current state
        const state = store.getState();
        const { periodicity, currency } = state;

        try{
            let res = await Promise.all([
                ConnectionSingleton.getSummary({
                    params : {
                        app : this.params.id,
                        type : 'USERS',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    params : {
                        app : this.params.id,
                        type : 'GAMES',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    params : {
                        app : this.params.id,
                        type : 'BETS',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    params : {
                        app : this.params.id,
                        type : 'REVENUE',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    params : {
                        app : this.params.id,
                        type : 'WALLET',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getApp({
                    app : this.params.id,
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getTransactions({
                    app : this.params.id,
                    filters : [],
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                this.getGamesAsync({currency : currency._id}),
                this.getUsersAsync({size : 1000, currency : currency._id}),
                this.getWithdrawsAsync({size : 1000, currency : currency._id})
            ]);

            console.log("res", res[0]);

            let serverApiInfo = {
                users : res[0].data ? res[0].data.message : [],
                games : res[1].data ? res[1].data.message : [],
                bets : res[2].data ? res[2].data.message : [],
                revenue : res[3].data ? res[3].data.message : [],
                wallet : res[4].data ? res[4].data.message[0] : [],        
                affiliates : res[5].data.message ? res[5].data.message.affiliateSetup : null,
                app : res[5].data.message ? res[5].data.message : null,
                walletSimple : res[5].data.message ? res[5].data.message.wallet : null,
                transactions :  (res[6].data && res[6].data.message) ? res[6].data.message[0] : null,
                gamesInfo : res[7],
                usersInfoSummary : res[8],
                withdraws : res[9]
            } 
            this.params = serverApiInfo.app;

            this.data = {
                ...this.data,
                summary : {
                    ...serverApiInfo
                }
            };

            return res;
        }catch(err){
            throw err;
		}
    }


    getTokenAmount = async () => {
        try{
            return await this.casinoContract.getHouseTokenAmount();
        }catch(err){
            throw 'N/A';
        }
    }

    updateAppInfoAsync = async () => {
        this.params = (await ConnectionSingleton.getApp({
            app : this.params.id,
            headers : authHeaders(this.params.bearerToken, this.params.id)
        })).data.message;
    }

    getDepositReference = async ({currency}) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.getDepositReference(
                {   
                    currency, 
                    entity : this.getId(), 
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                });
        }catch(err){
            throw err;
        }
    }

    getTransactions = async ({filters}) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.getTransactions(
                {   
                    app : this.getId(),
                    filters,
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                });
        }catch(err){
            throw err;
        }
    }

    deployApp = async () => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.deployApp(
                {   
                    params : {
                        app : this.getId()
                    },
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                });
        }catch(err){
            throw err;
        }
    }

    setGamesAsync = async () => {
        try{
            const { currency } = store.getState();
            this.data.summary.gamesInfo = await this.getGamesAsync({currency : currency._id});
        }catch(err){
            throw err;
        }
    }

    async addServices(services){
        try{
            let res = await ConnectionSingleton.addServices({
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken, this.params.id),
                services
            });
            return res;
        }catch(err){
            throw err;
		}
    }

    async generateTokenTransfer({currency, decimals, amount, platformAddress, tokenAddress}){
        try{


            
            await this.enableMetamask(currency);
            let erc20Contract = new ERC20TokenContract({
                web3 : window.web3,
                contractAddress : tokenAddress
            });

            let res = await erc20Contract.sendTokens({
                decimals,
                to : platformAddress,
                amount
            })
            return res;

        }catch(err){
            throw err;
        }
    }

    async createTokenWithdraw({currency, decimals, amount}){
        try{
            let res = await this.casinoContract.getBankRoll();
            await this.enableMetamask(currency);
            return await this.casinoContract.withdrawTokens({
                decimals,
                amount
            })

        }catch(err){
            throw err;
        }
    }

    async updateContract({newContractAddress}){
        try{
            let res = await this.casinoContract.getBankRoll();
            await this.enableMetamask();
            return await this.casinoContract.updateContract({
                newContractAddress
            })

        }catch(err){
            throw err;
        }
    }

    async editAffiliateStructure({structures}){
        try{           
            return await ConnectionSingleton.editAffiliateStructure({
                params : {
                    app : this.getId(),
                    structures, 
                    affiliateTotalCut : structures.reduce( (acc, s) => acc+parseFloat(s.percentageOnLoss), 0)
                },
                headers : authHeaders(this.getBearerToken(), this.getId())
            })
        }catch(err){
            throw err;
        }
    }

    async setCustomAffiliateStructureToUser({user, affiliatePercentage}){
        try{           
            return await ConnectionSingleton.setCustomAffiliateStructureToUser({
                params : {
                    app : this.getId(),
                    user,
                    affiliatePercentage
                },
                headers : authHeaders(this.getBearerToken(), this.getId())
            })
        }catch(err){
            throw err;
        }
    }


    getName(){
        return this.params.name;
    }

    getCroupier(){
        return this.params.croupier;
    }

    getDescription(){
        return this.params.description;
    }

    getServices(){
        return this.params.services;
    }

    getAppLink(){
        return this.params.web_url;
    }

    getId(){
        return this.params.id;
    }

    getCustomization(){
        return this.params.customization;
    }

    getChatIntegration(){
        return this.params.integrations.chat;
    }

    getInformation(key){
        return this.params[key];
    }

    getBearerToken(){
        return this.params.bearerToken;
    }

    getWallet = ({currency_id}) => {
        return this.params.wallet.find( w => new String(w.currency._id).toString() == new String(currency_id).toString());
    }

    getCasinoContract = () => this.casinoContract;

    isConnected(){
        return this.params.isValid;
    }

    isDeployed(){
        return this.params.web_url;
    }

    hasPaybearToken(){
        return this.params.paybearToken;
    }

    async updateWallet({amount, transactionHash, currency_id}){
        try{
            let res = await ConnectionSingleton.updateWallet({
                params : {
                    app : this.getId(),
                    amount,
                    transactionHash,
                    currency : currency_id
                },
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });
            let {
                message,
                status
            } = res.data;

            if(parseInt(status) == 200){
                return true;
            }else{
                throw new Error(res.data.message);
            }
        }catch(err){
            console.log(err);
            throw err;
		}
    }

    getParams = () => this.params;

    getWithdraws = ({currency}) => this.params.withdraws.filter( w => new String(w.currency).toString() == new String(currency._id).toString()) || [];

    getDeposits = ({currency}) => this.params.deposits.filter( d => new String(d.currency).toString() == new String(currency._id).toString()) || [];

    getDexDepositsAsync = async (address) => {
        let depositsApp = this.params.deposits || [];
        let allTxsDeposits = await this.getUnconfirmedBlockchainDeposits(address);
        return (await Promise.all(allTxsDeposits.map( async tx => {
            var isConfirmed = false, deposit = null;
            for(var i = 0; i < depositsApp.length; i++){
                if(new String(depositsApp[i].transactionHash).toLowerCase().trim() == new String(tx.transactionHash).toLowerCase().trim()){
                    isConfirmed = true;
                    deposit = depositsApp[i];
                }
            }
            if(isConfirmed){
                return {...deposit, isConfirmed}
            }else{
                return {...tx, isConfirmed}
            }
        }))).filter(el => el != null)
    }

    requestWithdraw = async ({tokenAmount, currency}) => {
        try{
            let metamaskAddress = await getMetamaskAddress();
            
            /* Get Request Withdraw Response */
            var res_with = await ConnectionSingleton.requestWithdraw({
                params : {
                    address : metamaskAddress, 
                    nonce : getNonce(), 
                    currency : currency._id,
                    tokenAmount,
                    app : this.getId()
                },
                headers : authHeaders(this.params.bearerToken, this.params.id),
            });
    
            return res_with;

        }catch(err){
            throw err;
        }
    }

    getUserAsync = async ({user}) => {
        return (await ConnectionSingleton.getUser({
            params : {
                user,
                app : this.getId()
            },
            headers : authHeaders(this.params.bearerToken, this.params.id),
        })).data.message;
    }

    getUsersAsync = async ({size=1000, offset=0}) => {
        try{
            /* Get App Users  */
            this.data.summary.usersInfoSummary = (await ConnectionSingleton.getAppUsers({
                params : {
                    size,
                    offset,
                    app : this.getId()
                },
                headers : authHeaders(this.params.bearerToken, this.params.id),
            })).data.message;
            return this.data.summary.usersInfoSummary;
        }catch(err){
            throw err;   
        }
    }

    getWithdrawsAsync = async ({size=1000, offset=0}) => {
        try{
            this.data.summary.withdraws = (await ConnectionSingleton.getWithdraws({
                params : {
                    size,
                    offset,
                    app : this.getId()
                },
                headers : authHeaders(this.params.bearerToken, this.params.id),
            })).data.message;
            return this.data.summary.withdraws;
        }catch(err){
            throw err;   
        }
    }

    totalDecentralizedLiquidity = async () => {
        return await this.casinoContract.getSmartContractLiquidity();
    }

    withdrawAmount = async ({amount}) => {
        let metamaskAddress = await getMetamaskAddress();
        try{
            var res_with = await this.casinoContract.withdrawApp({
                address : metamaskAddress,
                amount : amount
            });
            return res_with;
        }catch(err){
            throw err;
        }
    }

    approveWithdraw = async ({amount, address, user, _id, currency, bank_address}) => {
        try{

            let contract = await this.getContract({currency, bank_address});
            console.log(amount)
            var res_with = await contract.setUserWithdrawal({
                address : address,
                amount : amount
            });

            let res = await ConnectionSingleton.finalizeUserWithdraw({
                params : {
                    user, app : this.getId(), transactionHash : res_with.transactionHash, withdraw_id : _id, currency : currency._id
                },
                headers : authHeaders(this.params.bearerToken, this.getId())
            })

            return res;
        }catch(err){
            throw err;
        }
    }

    approveWithdrawsBatch = async (items) => {
        try{
            var addresses = items.map( i => i.address);     
            var amounts = items.map( i => i.amount); 

            var res_with = await this.casinoContract.setUserWithdrawalBatch({
                addresses : addresses,
                amounts : amounts
            });

            let users_array = [];

            for(var i = 0; i < items.length; i++){
                if(users_array.findIndex(u => items[i].user == u));
                /* TO DO */
                let item = items[i];
                let res = await ConnectionSingleton.finalizeUserWithdraw({
                    user : item.user, app : this.getId(), transactionHash : res_with.transactionHash, withdraw_id : item._id,
                    headers : authHeaders(this.params.bearerToken, this.getId())
                });
                console.log(res);
            }
            return true;
        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({ amount, withdraw_id, currency, bank_address }) => {
        try {
            let metamaskAddress = await getMetamaskAddress();
            let contract = await this.getContract({currency, bank_address});
            console.log(currency);

            /* Run Withdraw Function */
            const resEthereum = await contract.withdrawApp({
                address : metamaskAddress,
                amount
            });

            /* Get Finalize Withdraw Response */
            let res_fin = await ConnectionSingleton.finalizeWithdraw({
                params : {
                    nonce : getNonce(),
                    tokenAmount : amount,
                    withdraw_id,
                    currency : currency._id,
                    transactionHash : resEthereum.transactionHash,
                    app : this.getId()
                },
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });
            return res_fin;

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    editTableLimit = async ({game, tableLimit}) => {
        try{
            /* Cancel Withdraw Response */ 
            return await ConnectionSingleton.editTableLimit({               
                app : this.getId(),
                game, tableLimit,
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

        }catch(err){
            throw err;
        }
    }

    editTopBarCustomization = async ({textColor, backgroundColor, text, isActive}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editTopBarCustomization({   
                params : {
                    app : this.getId(),
                    textColor,
                    backgroundColor,
                    text,
                    isActive
                },         
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editIntegration = async ({isActive, integration_id, publicKey, privateKey, integration_type}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editIntegration({   
                params : {
                    app : this.getId(),
                    isActive,
                    integration_id,
                    publicKey,
                    privateKey,
                    integration_type
                },         
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editBannersCustomization = async ({banners, autoDisplay}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editBannersCustomization({   
                params : {
                    app : this.getId(),
                    banners,
                    autoDisplay
                },         
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editLogoCustomization = async ({logo}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editLogoCustomization({   
                params : {
                    app : this.getId(),
                    logo
                },         
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editColorsCustomization = async ({colors}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editColorsCustomization({   
                params : {
                    app : this.getId(),
                    colors
                },         
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editFooterCustomization = async ({communityLinks, supportLinks}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editFooterCustomization({   
                params : {
                    app : this.getId(),
                    communityLinks,
                    supportLinks
                },         
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    cancelWithdraw = async () => {
        try{
            /* Cancel Withdraw Response */
            return await ConnectionSingleton.cancelWithdraw({               
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

        }catch(err){
            throw err;
        }
    }

    getGamesAsync = async ({currency}) => {
        try{
            /* Cancel Withdraw Response */
            return await ConnectionSingleton.getGames({       
                params : {
                    app : this.getId(),
                    currency
                }, 
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

        }catch(err){
            throw err;
        }
    }
    
    getContract = async ({currency, bank_address}) => {

        let metamaskAddress = await getMetamaskAddress();
        let croupierAddress = await this.getEcosystemCroupier();

        switch(new String(currency.ticker).toLowerCase()){
            case 'eth' : {
                return new CasinoContractETH({
                    ownerAddress  : metamaskAddress,
                    decimals : currency.decimals,
                    contractAddress : bank_address,
                    authorizedAddress : metamaskAddress,
                    croupierAddress 
                })
            };
            default : {
                return new CasinoContract({
                    tokenAddress : currency.address, 
                    ownerAddress  : metamaskAddress,
                    contractAddress : bank_address,
                    decimals : currency.decimals,
                    authorizedAddress : metamaskAddress,
                    croupierAddress 
                })
            }
        }
      

    }

    addCurrency = async ({currency}) => {
        try{
            // Deploy Contract 
            let contract = await this.getContract({currency});
            await contract.__init__();
            
            // Send info to server
            let res = await ConnectionSingleton.addCurrencyWallet({          
                params : {
                    app : this.getId(),
                    bank_address : contract.getAddress(),
                    currency_id : currency._id
                },
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });
            console.log(res);

            await setCurrencyView(currency)
            return res;
        }catch(err){
            console.log("err", err)
            throw err;
        }
    }

    getEcosystemVariables = async () => {
        try{
            return await ConnectionSingleton.getEcosystemVariables();
        }catch(err){
            throw err;
        }
    }

    editEdge = async ({game, edge}) => {
        try{
            return await ConnectionSingleton.editEdge({               
                app : this.getId(),
                game,
                edge,
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

        }catch(err){
            throw err;
        }
    }

    withdraw = async ({amount, currency}) => {
        try{
            let accounts = await window.web3.eth.getAccounts();
            let contract = await this.getContract({currency});

            return await contract.withdrawApp({
                receiverAddress : accounts[0],
                amount 
            })

        }catch(err){
            throw err;
        }
    }

    changeTokenAddress = async ({token}) => {
        try{
            /* Update Contract */
            await this.casinoContract.changeCasinoToken({
                address : token.address
            });

            /* Update API */
            let params = {
                decimals : token.decimals,
                currencyTicker : token.ticker,
                platformTokenAddress : token.address,
            }
            
        }catch(err){
            throw err;
        }
    } 

    getMaxDeposit = async () => {
        try{
            return await this.casinoContract.getMaxDeposit();
        }catch(err){
            throw err;
        }
    }

    getMaxWithdrawal = async () => {
        try{
            return await this.casinoContract.getMaxWithdrawal();
        }catch(err){
            throw err;
        }
    }

    isPaused = async () => {
        try{
            return await this.casinoContract.isPaused();
        }catch(err){
            throw err;
        }
    }

    getWithdrawalTimeLimit = async () => {
        try{
            if(!this.casinoContract){return null}
            return await this.casinoContract.getWithdrawalTimeLimit();
        }catch(err){
            throw err;
        }
    }

    pauseContract = async () => {
        try{
            return await this.casinoContract.pauseContract();
        }catch(err){
            throw err;
        }
    }

    unpauseContract = async () => {
        try{
            return await this.casinoContract.unpauseContract();
        }catch(err){
            throw err;
        }
    }

    changeMaxDeposit = async ({amount}) => {
        try{
            return await this.casinoContract.changeMaxDeposit({amount});
        }catch(err){
            throw err;
        }
    }


    changeMaxWithdrawal = async ({amount}) => {
        try{
            return await this.casinoContract.changeMaxWithdrawal({amount});
        }catch(err){
            throw err;
        }
    }

    changeWithdrawalTimeLimit = async ({amount}) => {
        try{
            return await this.casinoContract.changeWithdrawalTimeLimit({amount});
        }catch(err){
            throw err;
        }
    }
  
    getSummaryData(type){
        return {
            data :  this.data.summary[type],
            type : type
        }
    }

    getCurrencyTicker = () => {
        const state = store.getState();
        const { currency } = state;
        return currency.ticker ? currency.ticker : 'N/A';
    }

    async enableMetamask(currency='eth'){
        let ethereum = window.ethereum;
        // TO DO : When User Rejects Connect Question throw err
        switch(currency) {
            case 'eth' : {
                if(ethereum){
                    await ethereum.enable(); 
                }
                break;
            }
        }
    }

    getVersion = () => this.params.version;
    
    getManagerAddress = () => this.params.address;
    
    getOwnerAddress = () => {console.log(this.params); return this.params.ownerAddress;}

    getUnconfirmedBlockchainDeposits = async (address) => {
        try{            
            var platformAddress =  this.getInformation('platformAddress');
            var platformTokenAddress =  this.getInformation('platformTokenAddress');
            var allTxs = (await getPastTransactions(address)).result;         
            let unconfirmedDepositTxs = (await Promise.all(allTxs.map( async tx => {
                let res_transaction = await window.web3.eth.getTransaction(tx.hash);
                let transactionData = getTransactionDataERC20(res_transaction);
                if(!transactionData){return null}
                return {
                    amount: Numbers.fromDecimals(transactionData.tokenAmount, this.params.decimals),
                    to : tx.to,
                    tokensTransferedTo : transactionData.tokensTransferedTo,
                    creation_timestamp: tx.timestamp,
                    transactionHash: tx.hash
                }
            }))).filter(el => el != null).filter( tx => {
                return (
                    new String(tx.to).toLowerCase().trim() == new String(platformTokenAddress).toLowerCase().trim()
                    && new String(tx.tokensTransferedTo).toLowerCase().trim() == new String(platformAddress).toLowerCase().trim()
                    )
            })
            return unconfirmedDepositTxs;
            // TO DO : Finalize

        }catch(err){
            throw err;
        }
    }

    addGameToPlatform = async ({game}) => {
        try{
            return await ConnectionSingleton.addGameToPlatform({   
                params : {
                    app : this.getId(),
                    game
                },     
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

        }catch(err){
            throw err;
        }
    }

    getEcosystemGames = async () => {
        try{
            return (await ConnectionSingleton.getEcosystemGames()).data.message;
        }catch(err){
            throw err;
        }
    }

    getEcosystemCurrencies = async () => {
        try{
            return (await ConnectionSingleton.getEcosystemVariables()).data.message.currencies;
        }catch(err){
            throw err;
        }
    }

    getEcosystemCroupier = async () => {
        try{
            return (await ConnectionSingleton.getEcosystemVariables()).data.message.addresses[0].address
        }catch(err){
            throw err;
        }
    }

    authorizeAddress = async ({address}) => {
        /* Authorize Decentralized Way */
        return await this.casinoContract.authorizeAccountToManage({addr : address});
    }

    unauthorizeAddress = async ({address}) => {
        /* Authorize Decentralized Way */
        let res = await this.casinoContract.unauthorizeAccountToManage({addr : address});
        /* Send info to Server */
        let authorizedAddresses = this.getInformation('authorizedAddresses');
        authorizedAddresses = authorizedAddresses.filter(e => e !== address)
        return res;
    }
}


function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export default App;
