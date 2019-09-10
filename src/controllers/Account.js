import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import App from "./App";
import Cache from "../services/cache";
import Security from "./Security";
import { enableMetamask, getERC20Contract } from "../lib/metamask";
import { getNonce } from "../lib/number";
import { processResponse } from "../lib/errors";
import CasinoContract from "./CasinoContract";
import { setAuthToCookies, getAuthFromCookies } from "./services/services";
import Numbers from "../services/numbers";

class Account{    
    constructor(params=null){
        this.params = params;
        this.date = null;
    }

    getUserInfo = () => {
        return this.User;
    }

    getId = () => this.User.id;

    getBearerToken = () => {return (this.User.bearerToken || this.User.security.bearerToken)};

    auth = async () => {
        try{
            let auth = getAuthFromCookies();
            if(!auth){throw null /* No Login Info */}
            const { admin, bearerToken } = auth;
            let response = await ConnectionSingleton.auth({
                admin,
                headers : authHeaders(bearerToken, admin)
            });
            return await this.handleLoginResponse(response);
        }catch(err){
            console.log(err);
            throw err
        }
    }
    
    register = async () => {
        try{
            let response = await ConnectionSingleton.register({
                username        : this.params.username, 
                name            : this.params.name,
                password        : this.params.password,
                email           : this.params.email
            });

            let {
                message,
                status
            } = response.data;

            if(status == 200){
                return await this.login();
            }else{
                throw new Error(message)
            }
        }catch(err){
            throw err
        }
    }

    login = async () => {
        try{
            let response = await ConnectionSingleton.login({
                username : this.params.username, 
                password : this.params.password
            });
            console.log(response)
            return await this.handleLoginResponse(response);
        }catch(err){
            // TO DO
            throw err;
		}
    }

    login2FA  = async () => {
        try{
            let response = await ConnectionSingleton.login2FA({
                username : this.params.username, 
                password : this.params.password,
                token : this.params.token
            });
            return await this.handleLoginResponse(response);
        }catch(err){
            // TO DO
            throw err;
		}
    }

    getData = async () => {
        await this.getAppStatistics();
        await this.update();
    }

    hasApp = () => {
        return (typeof this.App != 'undefined')
    }

    update = async () => {
        /* Add Everything to the Redux State */  
        await store.dispatch(setProfileInfo(this));
    }

    addPaybearToken = async (paybearToken) => {
        try{
            let res = await this.getApp().addPaybearToken(paybearToken);
            await this.update();
            return res;
        }catch(err){
            throw err;
        }
    }
    
    addServices = async (services) => {
        try{
            let res = await this.getApp().addServices(services);
            await this.update();
            return res;
        }catch(err){
            throw err; 
        }
    }

    getTransactions = async (filters) => {
        try{
            let res = await this.getApp().getTransactions(filters);
            await this.update();
            return res;
        }catch(err){
            throw err;
        }
    }

    getMetamaskAddress = async () => {
        /* Enable Metamask Auth */
        await enableMetamask("eth");
        let accounts = await window.web3.eth.getAccounts();
        return accounts[0];
    }

    getAddress = () => {
        return this.App.getManagerAddress();
    }

    getOwnerAddress = () => {
        return this.App.getOwnerAddress();
    }

    hasAppStats = (type) => {
        try{
            if(!this.hasApp()){throw new Error('There is no App Attributed')}
            let res = this.getApp().getSummaryData(type);
            return res;
        }   
        catch(err){
            return false
        }
    }

    setProfileData = (data) => {
        this.User = data;
    }

    getProfileData = () => {
        return this.User;
    }

    createApp = async (params) => {
        
        try{
            let res = await ConnectionSingleton.createApp({
                ...params,
                admin_id : this.getProfileData().id
            });
            console.log(res);
            await this.login();
            return res; 
        }catch(err){
            throw err;
        }
    }

    setApp = (app) => {
        this.App = new App(app);
    }

    getApp = () => {
        return this.App;
    }

    getAppStatistics = async () => {
       return await this.App.getSummary();
    }

    getUsername = () => {
        return this.User.name;
    }

    setTimer = () => {
        clearTimeout(this.timer);
        this.timer = setInterval(
            () => {
            this.getData();
            }, 30*1000);
    }

    getWithdrawAmountAvailableDecentralized = async () => {
        try{
            return await this.getApp().getCasinoContract().getWithdrawAmountAvailableDecentralized()
        }catch(err){
            throw err;
        }
    }

    getDepositReference = async (params) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            let response = await this.getApp().getDepositReference(params);
            return processResponse(response);
        }catch(err){
            throw err;
        }
    }

    getDepositInfo = async (params) => {
        try{
            let response = await this.getApp().getDepositInfo(params); 
            return processResponse(response);
        }catch(err){
            throw err;
        }
    }

    
    requestWithdraw = async (params) => {
        try{
            let response = await this.getApp().requestWithdraw(params);
            return processResponse(response);
        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async (params) => {
        try{
            let response = await this.getApp().finalizeWithdraw(params);
            return processResponse(response);
        }catch(err){
            throw err;
        }
    }

    getWithdraws = () => {
        return this.getApp().getWithdraws() || [];
    }

    cancelWithdraw = async (params) => {
        try{
            let response = await this.getApp().cancelWithdraw(params);
            return processResponse(response);
        }catch(err){
            throw err;
        }
    }

    set2FA = async ({secret, token}) => {
        try{
            let res = await ConnectionSingleton.set2FA(
                {   
                    secret,
                    token,
                    admin : this.getId(),
                    headers : authHeaders(this.getBearerToken(), this.getId())
                });
            return processResponse(res);
        }catch(err){
            throw err;
        }
    }

    withdraw = async (params) => {
        try{
            return await this.getApp().withdraw(params);
        }catch(err){
            throw err;
        }
    }

    authorizeAddressForCroupier = async ({authorizedAddress, platformParams}) => {
        try{    
            var platform;
            if(!this.platform){
                platform = this.platform;
            }else{
                platform = new CasinoContract(platformParams)
            }

            platform.__assert();

            return await platform.authorize(authorizedAddress);

        }catch(err){
            throw err;
        }
    }

    deployPlatformContract = async ({decimals, tokenAddress, currencyTicker, blockchainTicker, authorizedAddress, ownerAddress}) => {
        try{
            let platform = new CasinoContract({
                tokenAddress, 
                ownerAddress,
                decimals : decimals,
                authorizedAddress
            })

            await platform.__init__();
            
            let params = {
                platformAddress : platform.getAddress(),
                decimals : decimals,
                authorizedAddress,
                address  : ownerAddress,
                currencyTicker : currencyTicker,
                platformTokenAddress : tokenAddress,
                platformBlockchain : blockchainTicker
            }
            
            this.platform = platform;
            await this.getApp().addBlockchainInformation(params);

            return platform;
        }catch(err){
            throw err;
        }
    }


    handleLoginResponse = async (response) => {
        let {
            message : data,
            status
        } = response.data;

        if(status == 200){
            /* SET Profile Data */
            this.setProfileData(data);

            setAuthToCookies({
                admin : data.id,
                bearerToken : data.bearerToken || data.security.bearerToken
            });

            /* SET APP */
            // If App Already Exists for this User
            if(data.app.id){
                this.setApp(data.app);
                /* GET APP Stats */
                await this.getData();
                // Set Timer
                this.setTimer();
            }
            this.update()
            // TO DO : Create an Initial Screen to choose between Apps or a top Dropdown for it
            return response;
        }else{
            throw response.data;
        }
    }
}



function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export default Account;