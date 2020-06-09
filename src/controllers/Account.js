import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import { setCurrencyView } from '../redux/actions/currencyReducer';
import App from "./App";
import { processResponse } from "../lib/errors";
import { setAuthToCookies, getAuthFromCookies } from "./services/services";
import _ from 'lodash';

class Account{    
    constructor(params=null){
        this.params = params;
        this.date = null;
        this.versionControl = 0;
    }

    getUserInfo = () => {
        return this.User;
    }

    getId = () => this.User.id;

    getBearerToken = () => {return this.User.security.bearerToken};

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
    
    register = async (token = null) => {
        try{
            let data = {
                username        : this.params.username, 
                name            : this.params.name,
                password        : this.params.password,
                email           : this.params.email,
            };
            if(token !== null) {
                data['bearerToken'] = token;
            }
            let response = await ConnectionSingleton.register(data);

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

    resetAdminPassword  = async () => {
        try{
            await ConnectionSingleton.resetAdminPassword({
                username_or_email: this.params.username_or_email
            });
        }catch(err){
            throw err;
		}
    }

    confirmResetAdminPassword  = async () => {
        try{
            const res = await ConnectionSingleton.confirmResetAdminPassword({
                token: this.params.token,
                password: this.params.password,
                admin_id: this.params.adminId
            });

            return res;
            
        }catch(err){
            throw err;
		}
    }

    setGameDataAsync = async () => {
        await this.getApp().setGamesAsync();
        await this.update();
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
        this.versionControl += 1;
        await store.dispatch(setProfileInfo(this));
    }

    addAdmin = async ({email}) => {
        try{
            let res = await ConnectionSingleton.addAdmin({
                params : {
                    email, app : this.getApp().getId(), admin: this.getUserInfo().id
                },
                headers : authHeaders(this.getUserInfo().security.bearerToken, this.getId())
            })

            return res;
        }catch(err){
            throw err;
        }
    }

    editAdminType = async ({adminToModify, permission}) => {
        try{
            let res = await ConnectionSingleton.editAdminType({
                params: {
                    adminToModify,
                    permission,
                    admin: this.getUserInfo().id
                },
                headers : authHeaders(this.getUserInfo().security.bearerToken, this.getId())
            })
            return res;
        }catch(err){
            throw err;
        }
    }

    getAdminByApp = async () => {
        try{
            let res = await ConnectionSingleton.getAdminByApp({
                params : {
                    app : this.getApp().getId(), admin: this.getUserInfo().id
                },
                headers : authHeaders(this.getUserInfo().security.bearerToken, this.getId())
            })
            return res.data.message;
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
            await this.login();
            res = await this.getApp().deployApp();
            
            const { virtual } = this.getApp().getParams();
            if(virtual === true) {
                let ecosystemCurrencies = await this.getApp().getEcosystemCurrencies();
                ecosystemCurrencies = ecosystemCurrencies.filter(el => el != null && el.virtual === virtual);

                if(ecosystemCurrencies) {
                    const currency = ecosystemCurrencies[0];
                    await this.getApp().addCurrencyWallet({currency : currency, passphrase : 'none'});
                }

            }

            await this.getApp().addServices([101, 201]);
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
                bearerToken : data.security.bearerToken
            });

            /* SET APP */
            // If App Already Exists for this User
            if(data.app.id){
                this.setApp(data.app);
                /* GET APP Stats */
                await this.getData();
            }

            /* SET CURRENCY */
            if(!_.isEmpty(data.app.wallet)) {

                const appUseVirtualCurrencies = data.app.virtual;
                const wallet = data.app.wallet;
                
                if (appUseVirtualCurrencies) {
                    const currency = wallet.find(currency => currency.price != null);
                    await store.dispatch(setCurrencyView(currency.currency));

                } else {
                    const currency = wallet[0];
                    await store.dispatch(setCurrencyView(currency.currency));
                }
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