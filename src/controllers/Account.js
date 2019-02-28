import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import App from "./App";
import Timer from 'tiny-timer';
import Cache from "../services/cache";

let timer = new Timer()

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
                /* Add Everything to the Redux State */  
                await store.dispatch(setProfileInfo(this));
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
        await store.dispatch(setProfileInfo(this));
    }

    hasApp = () => {
        return (typeof this.App != 'undefined')
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
        clearTimeout(this.timer);
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
        this.timer = window.setInterval(
            () => {
            this.getData();
        }, 2000);
    }

    getDepositReference = async (currency) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            let response = await ConnectionSingleton.getDepositReference(
                currency,
                this.getApp().getId(),
                'app');
            return processServerResponse(response);
        }catch(err){
            throw err;
        }
    }

    getDepositInfo = async (_id) => {
        try{
            let response = await ConnectionSingleton.getDepositInfo(_id);
            return processServerResponse(response);
        }catch(err){
            throw err;
        }
    }
}

/**
 * 
 * @param {*} response 
 */

const processServerResponse = (response) => {
    let {
        message,
        status
    } = response.data;

    if(status == 200){
        return message
    }else{
        throw new Error('Bad Request on Deposit Reference')
    }
}

export default Account;