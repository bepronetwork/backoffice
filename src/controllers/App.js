import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";

class App{    
    constructor(params){
        this.params = params;
        this.data = {
            
        };

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
                })
            ]);
            let params = {
                user : res[0].data.message ? res[0].data.message : null,
                games : res[1].data.message ? res[1].data.message : null,
                bets : res[2].data.message ? res[2].data.message : null,
                revenue : res[3].data.message ? res[3].data.message : null,
                wallet :res[4].data.message ? res[4].data.message : null,
            } 

            this.data = {
                ...this.data,
                summary : {
                    ...params
                }
            };

            return res;
        }catch(err){
            throw err;
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


    getName(){
        return this.params.name;
    }

    getDescription(){
        return this.params.description;
    }

    getId(){
        return this.params.id;
    }

    getBearerToken(){
        return this.params.bearerToken;
    }

    isConnected(){
        return this.params.isConnected;
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