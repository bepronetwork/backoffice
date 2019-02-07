import config from "./config";

const URL = config.server.production;

class Connection {

    constructor(){}

    /**
     *  @param
     */

    login = async ({username, password}) => {
        try{
            let response = await fetch(URL + '/api/users/login', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, password})
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }
    
    getSummary = async ({app, type}) => {
        try{
            let response = await fetch(URL+ '/api/app/summary', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({app, type})
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositReference = async (currency, entity, entityType) => {
        try{
            let response = await fetch(URL+ '/api/deposit/generateReference', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({
                    "entity" : entity,
                    "entityType" : entityType,
                    "currency" : currency
                })
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositInfo = async (deposit_id) => {
        try{
            let response = await fetch(URL+ `/api/deposit/${deposit_id}/info`, {
                method : 'POST',
                headers : config.headers
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

}


let ConnectionSingleton = new Connection();


export default ConnectionSingleton;