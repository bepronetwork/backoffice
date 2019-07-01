import config from "./config";
import Numbers from "../services/numbers";

const URL = config.server.production;

class Connection {

    constructor(){}

    /**
     *  @param
     */

    register = async ({username, password, name, email}) => {
    
        try{
            let response = await fetch(URL + '/api/admins/register', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, password, name, email})
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    login = async ({username, password}) => {
        try{
            let response = await fetch(URL + '/api/admins/login', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, password})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    createApp = async ({name, description, metadataJSON, admin_id, marketType}) => {
        try{
            let response = await fetch(URL + '/api/app/create', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({name, description , metadataJSON, admin_id, marketType})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }
    
    getSummary = async ({app, type, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/summary', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app, type})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getApp =  async ({app, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/get', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getTransactions =  async ({app, filters, headers}) => {
        try{
            let response = await fetch(URL + '/api/app/transactions', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app, filters})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositReference = async ({currency, entity, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/deposit/generateReference', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    "entity" : entity,
                    "currency" : currency
                })
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositInfo = async ({id, headers}) => {
        try{
            let response = await fetch(URL+ `/api/deposit/${id}/info`, {
                method : 'POST',
                headers : addHeaders(config, headers),
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    createBearerToken = async (app) => {
        try{
            let response = await fetch(URL+ `/api/app/api/createToken`, {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify(app)
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    addPaybearToken = async ({app, paybearToken, headers}) => {
        try{
            let response = await fetch(URL+ `/api/app/paybearsecretkey/add`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app,
                    paybearApiSecretKey : paybearToken
                })
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    addServices = async ({app, services, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/services/add`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app,
                    services
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }


    updateWallet = async ({app, amount, transactionHash, headers}) => {
        console.log(app, amount);
        try{
            let response = await fetch( URL + `/api/app/updateWallet`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app,
                    transactionHash,
                    amount : Numbers.toFloat(amount)
                })
            });
            
            return response.json();
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    requestWithdraw = async ({app, address, signature, newBalance, tokenAmount, nonce, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/requestWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app, address, signature, newBalance, tokenAmount, nonce
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({app, address, signature, newBalance, tokenAmount, nonce, transactionHash, headers, withdraw_id}) => {
        try{
            let response = await fetch( URL + `/api/app/finalizeWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app, address, signature, newBalance, tokenAmount, nonce, transactionHash, withdraw_id
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }


    cancelWithdraw = async ({app, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/cancelWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app, 
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

}

function addHeaders(config, newHeaders){
    return {
        ...config.headers,
        ...newHeaders   
    }
}

let ConnectionSingleton = new Connection();


export default ConnectionSingleton;

