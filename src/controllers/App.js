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

class App{    
    constructor(params){
        this.params = params;
        this.data = {};
        this.casinoContract = null;
    }

    getSummary = async () => {
                // grab current state
        const state = store.getState();
        const { periodicity } = state;

        try{
            let res = await Promise.all([
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'USERS',
                    periodicity,
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'GAMES',
                    periodicity,
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'BETS',
                    periodicity,
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'REVENUE',
                    periodicity,
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'WALLET',
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
            ]);

            let serverApiInfo = {
                users : res[0].data.message ? res[0].data.message : null,
                games : res[1].data.message ? res[1].data.message : null,
                bets : res[2].data.message ? res[2].data.message : null,
                revenue : res[3].data.message ? res[3].data.message : null,
                wallet : res[4].data.message ? res[4].data.message : null,        
                app : res[5].data.message ? res[5].data.message : null,
                transactions :  res[6].data.message ? res[6].data.message[0] : null
            } 

            this.params = serverApiInfo.app;

            this.casinoContract = new CasinoContract({
                contractAddress : this.getInformation('platformAddress'),
                tokenAddress : this.getInformation('platformTokenAddress'),
                decimals : this.params.decimals
            })

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
    getDepositInfo = async ({id}) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.getDepositInfo(
                {   
                    id, 
                    headers : authHeaders(this.params.bearerToken, this.params.id)
                });
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


    getName(){
        return this.params.name;
    }

    getDescription(){
        return this.params.description;
    }

    getServices(){
        return this.params.services;
    }

    getId(){
        return this.params.id;
    }

    getInformation(key){
        return this.params[key];
    }

    getBearerToken(){
        return this.params.bearerToken;
    }

    isConnected(){
        return this.params.isValid;
    }

    isDeployed(){
        return this.params.platformAddress;
    }

    hasPaybearToken(){
        return this.params.paybearToken;
    }

    async createBearerToken(){
        try{
            let res = await ConnectionSingleton.createBearerToken({
                app : this.getId()
            });

            let {
                message : data
            } = res.data;

            //Add Connection Bearer Token to App Object
            this.params.bearerToken = data.bearerToken;
            return res;
        }catch(err){
            throw err;
		}
    }

    async addPaybearToken(paybearToken){
        try{
            let res = await ConnectionSingleton.addPaybearToken({
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken, this.params.id),
                paybearToken
            });

            let {
                message : data,
                status
            } = res.data;
            if(parseInt(status) == 200){
                //Add Connection Bearer Token to App Object
                this.params.paybearToken = paybearToken;
            }
            return res;
        }catch(err){
            throw err;
		}
    }


    async updateWallet({amount, transactionHash}){
        try{
            let res = await ConnectionSingleton.updateWallet({
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken, this.params.id),
                amount,
                transactionHash
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

    getWithdraws = () => this.params.withdraws || [];

    requestWithdraw = async ({tokenAmount}) => {

        try{
            let metamaskAddress = await getMetamaskAddress();
            let params = {
                address : metamaskAddress, 
                newBalance :  Numbers.toFloat(this.getSummaryData('wallet').data.playBalance), 
                winBalance :  Numbers.toFloat(this.getSummaryData('wallet').data.playBalance), 
                nonce : getNonce(), 
                decimals : this.params.decimals,
                category : codes.Withdraw
            }

            // Get Signature
            let { signature } = await CryptographySingleton.getUserSignature(params);

            /* Get Request Withdraw Response */
            var res_with = await ConnectionSingleton.requestWithdraw({
                ...params,
                tokenAmount,
                signature,
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken, this.params.id),
            });
    
            return res_with;

        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({ amount, nonce, withdraw_id }) => {
        try {
            let metamaskAddress = await getMetamaskAddress();
            let params = {
                address : metamaskAddress, 
                newBalance :  Numbers.toFloat(this.getSummaryData('wallet').data.playBalance), 
                winBalance :  Numbers.toFloat(this.getSummaryData('wallet').data.playBalance), 
                nonce : getNonce(), 
                decimals : this.params.decimals,
                category : codes.Withdraw,
            }

            // Get Signature
            let { signature } = await CryptographySingleton.getUserSignature(params);

            /* Run Withdraw Function */
            const resEthereum = await this.casinoContract.withdrawApp({
                address : params.address,
                amount,
                nonce
            });

            /* Get Finalize Withdraw Response */
            let res_fin = await ConnectionSingleton.finalizeWithdraw({
                ...params,
                tokenAmount : amount,
                signature,
                withdraw_id,
                app : this.getId(),
                transactionHash : resEthereum.transactionHash,
                app : this.getId(),
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

    getGames = async () => {
        try{
            /* Cancel Withdraw Response */
            return await ConnectionSingleton.getGames({               
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

        }catch(err){
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

    withdraw = async ({amount}) => {
        try{
            let accounts = await window.web3.eth.getAccounts();
            return await this.casinoContract.withdrawApp({
                receiverAddress : accounts[0],
                amount 
            })

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

    getCurrencyTicker = () => this.getSummaryData('wallet').data.blockchain.ticker;

    async enableMetamask(currency){
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

    getManagerAddress = () => this.params.address;

    addBlockchainInformation = async (params) => {
        try{
            return await ConnectionSingleton.addBlockchainInformation({               
                app : this.getId(),
                params,
                headers : authHeaders(this.params.bearerToken, this.params.id)
            });

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
}


function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export default App;