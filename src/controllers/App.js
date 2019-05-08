import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import CasinoContract from "./CasinoContract";

class App{    
    constructor(params){
        this.params = params;
        this.data = {};
        this.casinoContract = null;
    }

    getSummary = async () => {
        try{
            let res = await Promise.all([
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'USERS',
                    headers : authHeaders(this.params.bearerToken)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'GAMES',
                    headers : authHeaders(this.params.bearerToken)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'BETS',
                    headers : authHeaders(this.params.bearerToken)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'REVENUE',
                    headers : authHeaders(this.params.bearerToken)
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'WALLET',
                    headers : authHeaders(this.params.bearerToken)
                }),
                ConnectionSingleton.getApp({
                    app : this.params.id,
                    headers : authHeaders(this.params.bearerToken)
                }),
                ConnectionSingleton.getTransactions({
                    app : this.params.id,
                    filters : [],
                    headers : authHeaders(this.params.bearerToken)
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
                tokenAddress : this.getInformation('platformTokenAddress')
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
                    headers : authHeaders(this.params.bearerToken)
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
                    headers : authHeaders(this.params.bearerToken)
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
                    headers : authHeaders(this.params.bearerToken)
                });
        }catch(err){
            throw err;
        }
    }

    async addServices(services){
        try{
            let res = await ConnectionSingleton.addServices({
                app : this.getId(),
                headers : authHeaders(this.params.bearerToken),
                services
            });
            return res;
        }catch(err){
            throw err;
		}
    }

    async generateTokenTransfer(){
        try{
            // TO DO : Create Web3 Transfer to Address

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
        return this.params.isConnected;
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
                headers : authHeaders(this.params.bearerToken),
                paybearToken
            });

            let {
                message : data,
                status
            } = res.data;
            if(parseInt(status) == 200)
                //Add Connection Bearer Token to App Object
                this.params.paybearToken = paybearToken;
            return res;
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
}


function authHeaders(bearerToken){
    return {
        "authorization" : "Bearer " + bearerToken
    }
}

export default App;