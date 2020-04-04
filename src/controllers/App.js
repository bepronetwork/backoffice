import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import Numbers from "../services/numbers";
import { getNonce } from "../lib/number";
import { getPastTransactions, getTransactionDataERC20 } from "../lib/etherscan";
import { setCurrencyView } from "../redux/actions/currencyReducer";
import { getAuthFromCookies } from "./services/services";
import _ from 'lodash';

class App{    
    constructor(params){
        this.params = params;
        this.data = {
            summary : {}
        };
        this.admin = getAuthFromCookies();
    }

    getSummary = async () => {
        // grab current state
        const state = store.getState();
        const { periodicity, currency } = state;

        try{
            let res = await Promise.all([
                !_.isEmpty(currency) ? ConnectionSingleton.getSummary({
                    params : {
                        admin : this.getAdminId(),
                        app : this.getId(),
                        type : 'USERS',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }) : currency,
                !_.isEmpty(currency) ? ConnectionSingleton.getSummary({
                    params : {
                        admin : this.getAdminId(),
                        app : this.getId(),
                        type : 'GAMES',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }) : currency,
                !_.isEmpty(currency) ? ConnectionSingleton.getSummary({
                    params : {
                        admin : this.getAdminId(),
                        app : this.getId(),
                        type : 'BETS',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }) : currency,
                !_.isEmpty(currency) ? ConnectionSingleton.getSummary({
                    params : {
                        admin : this.getAdminId(),
                        app : this.getId(),
                        type : 'REVENUE',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }) : currency,
                !_.isEmpty(currency) ? ConnectionSingleton.getSummary({
                    params : {
                        admin : this.getAdminId(),
                        app : this.getId(),
                        type : 'WALLET',
                        periodicity : periodicity,
                        currency : currency._id,
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }) : currency,
                ConnectionSingleton.getApp({
                    admin : this.getAdminId(),
                    app : this.getId(),
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }),
                ConnectionSingleton.getTransactions({
                    admin : this.getAdminId(),
                    app : this.getId(),
                    filters : [],
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }),
                this.getGamesAsync({currency : currency._id}),
                this.getUsersAsync({size : 1000, currency : currency._id}),
                this.getWithdrawsAsync({size : 1000, currency : currency._id})
            ]);

            let serverApiInfo = {
                users : res[0].data ? res[0].data.message : [],
                games : res[1].data ? res[1].data.message : [],
                bets : res[2].data ? res[2].data.message : [],
                revenue : res[3].data ? res[3].data.message : [],
                wallet : res[4].data ? res[4].data.message[0] : [],        
                affiliates : res[5].data.message ? res[5].data.message.affiliateSetup : null,
                app : res[5].data.message ? res[5].data.message : null,
                walletSimple : res[5].data.message ? res[5].data.message.wallet : null,
                transactions :  res[6].data ? res[6].data.message[0] : null,
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

    updateAppInfoAsync = async () => {
        this.params = (await ConnectionSingleton.getApp({
            admin : this.getAdminId(),
            app : this.getId(),
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })).data.message;
    }

    getDepositReference = async ({currency}) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.getDepositReference(
                {   
                    currency, 
                    entity : this.getId(), 
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    filters,
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                        admin : this.getAdminId(),
                        app : this.getId()
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                admin : this.getAdminId(),
                app : this.getId(),
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
                services
            });
            return res;
        }catch(err){
            throw err;
		}
    }

    async editAffiliateStructure({structures}){
        try{           
            return await ConnectionSingleton.editAffiliateStructure({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    structures, 
                    affiliateTotalCut : structures.reduce( (acc, s) => acc+parseFloat(s.percentageOnLoss), 0)
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            })
        }catch(err){
            throw err;
        }
    }

    async setCustomAffiliateStructureToUser({user, affiliatePercentage}){
        try{           
            return await ConnectionSingleton.setCustomAffiliateStructureToUser({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    user,
                    affiliatePercentage
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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

    getTypography(){
        return this.params.typography;
    }

    getChatIntegration(){
        return this.params.integrations.chat;
    }

    getEmailIntegration(){
        return this.params.integrations.mailSender;
    }

    getInformation(key){
        return this.params[key];
    }

    getBearerToken(){
        return this.admin.bearerToken;
    }

    getAdminId(){
        return this.admin.admin;
    }

    getWallet = ({currency_id}) => {
        return this.params.wallet.find( w => new String(w.currency._id).toString() == new String(currency_id).toString());
    }

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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    transactionHash,
                    currency : currency_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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

    requestWithdraw = async ({tokenAmount, currency, toAddress}) => {
        try{         
            /* Get Request Withdraw Response */
            var res_with = await ConnectionSingleton.requestWithdraw({
                params : {
                    address : toAddress, 
                    nonce : getNonce(), 
                    currency : currency._id,
                    tokenAmount,
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
            });
    
            return res_with;

        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({withdraw_id, currency}) => {
        try{         
            /* Get Request Withdraw Response */
            var res_with = await ConnectionSingleton.finalizeWithdraw({
                params : {
                    withdraw_id, 
                    nonce : getNonce(), 
                    currency : currency._id,
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
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
                app : this.getId(),
                admin : this.getAdminId()
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId()),
        })).data.message;
    }

    getUsersAsync = async ({size=1000, offset=0}) => {
        try{
            /* Get App Users  */
            this.data.summary.usersInfoSummary = (await ConnectionSingleton.getAppUsers({
                params : {
                    size,
                    offset,
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
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
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
            })).data.message;
            return this.data.summary.withdraws;
        }catch(err){
            throw err;   
        }
    }

    approveWithdraw = async ({user, _id, currency}) => {
        try{

            let res = await ConnectionSingleton.finalizeUserWithdraw({
                params : {
                    admin : this.getAdminId(), user, app : this.getId(), transactionHash : null, withdraw_id : _id, currency : currency._id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            })

            return res;
        }catch(err){
            throw err;
        }
    }

    approveWithdrawsBatch = async (items) => {
        try{

            let users_array = [];

            for(var i = 0; i < items.length; i++){
                if(users_array.findIndex(u => items[i].user == u));
                /* TO DO */
                let item = items[i];
                let res = await ConnectionSingleton.finalizeUserWithdraw({
                    admin : this.getAdminId(), user : item.user, app : this.getId(), transactionHash : null, withdraw_id : item._id,
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });
                console.log(res);
            }
            return true;
        }catch(err){
            throw err;
        }
    }

    editTableLimit = async ({game, tableLimit, wallet}) => {
        try{
            /* Cancel Withdraw Response */ 
            return await ConnectionSingleton.editTableLimit({    
                admin : this.getAdminId(),           
                app : this.getId(),
                game, tableLimit, wallet,
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    textColor,
                    backgroundColor,
                    text,
                    isActive
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editTypography = async (typography) => {
        try{
            let res = await ConnectionSingleton.editTypography({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    typography
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    isActive,
                    integration_id,
                    publicKey,
                    privateKey,
                    integration_type
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editEmailIntegration = async ({apiKey, templateIds}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editEmailIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    apiKey,
                    templateIds
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
            let res = await ConnectionSingleton.editBannersCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    banners,
                    autoDisplay
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
            let res = await ConnectionSingleton.editLogoCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    logo
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editFaviconCustomization = async ({topIcon}) => {
        try{
            let res = await ConnectionSingleton.editFaviconCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    topIcon
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editLoadingGifCustomization = async ({loadingGif}) => {
        try{
            let res = await ConnectionSingleton.editLoadingGifCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    loadingGif
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    colors
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    communityLinks,
                    supportLinks
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editGameImage = async ({image_url, game}) => {
        try{
            let res = await ConnectionSingleton.editGameImage({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    image_url,
                    game
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editBackgroundImage = async ({background_url, game}) => {
        try{
            let res = await ConnectionSingleton.editBackgroundImage({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    background_url,
                    game
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                admin : this.getAdminId(),         
                app : this.getId(),
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    currency
                }, 
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    addCurrencyWallet = async ({currency, passphrase}) => {
        try{    

            // Send info to server
            let res = await ConnectionSingleton.addCurrencyWallet({          
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    passphrase : passphrase,
                    currency_id : currency._id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                admin : this.getAdminId(),            
                app : this.getId(),
                game,
                edge,
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    changeMaxDeposit = async ({amount, wallet_id}) => {
        try{
            let res = await ConnectionSingleton.changeMaxDeposit({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    wallet_id : wallet_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            let {
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

    changeMaxWithdraw = async ({amount, wallet_id}) => {
        try{
            let res = await ConnectionSingleton.changeMaxWithdraw({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    wallet_id : wallet_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            let {
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

    getCurrency = () => {
        const state = store.getState();
        const { currency } = state;
        return currency;
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    game
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
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

}


function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export default App;