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

class Account{    
    constructor(params=null){
        this.params = params;
        this.date = null;
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

            let cache = this.getFromCache('Authentication');

            if(!this.params && (cache && cache.password)){
                //Cache had data
                this.params = {
                    username :  cache.username,
                    password : cache.password
                }
            }else if(this.params){
                //
            }else{
                throw new Error('Login didn´t work')
            }

            let response = await ConnectionSingleton.login({
                username : this.params.username, 
                password : this.params.password
            });

            let {
                message : data,
                status
            } = response.data;

            if(status == 200){
                /* SET Profile Data */
                this.setProfileData(data);
                /* Save Data in Cache */
                this.saveToCache(this.params);
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
                throw new Error(response.data.message)
            }
        }catch(err){
            // TO DO
            throw err;
		}
    
    }

    saveToCache = (data) => {
        return Cache.setToCache("Authentication", data);

    }

    getFromCache = (type) => {
        return Cache.getFromCache(type);
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

    createBearerToken = async () => {
        try{
            let res = await this.getApp().createBearerToken();
            await this.update();
            return res;
        }catch(err){
            throw err;
        }
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
        }, 10000);
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

}

export default Account;