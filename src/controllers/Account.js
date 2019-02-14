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
                this.setApp(data.apps[0]);
                /* GET APP Stats */
                await this.getData();
                // Set Timer
                this.setTimer();
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
        /* Add Everything to the Redux State */  
        await store.dispatch(setProfileInfo(this));

    }

    setProfileData = (data) => {
        this.User = data;
    }

    getProfileData = () => {
        return this.data;
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
        window.setInterval(
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