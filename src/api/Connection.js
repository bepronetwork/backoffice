import config from "./config";
import Numbers from "../services/numbers";
import { API_URL, API_URL_WITHDRAW, processResponse } from "../config/apiConfig";

const URL = API_URL;

class Connection {

    constructor(){}

    /**
     *  @param
     */

    auth = async ({admin, headers}) => {
        try{
            let response = await fetch(URL + '/api/admins/auth', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({admin})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

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

    login2FA = async ({username, password, token}) => {
        try{
            let response = await fetch(URL + '/api/admins/login/2fa', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, password, '2fa_token' : token})
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
            let response = await fetch(URL+ '/api/app/get/auth', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editTableLimit = async ({app, game, tableLimit, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/games/editTableLimit', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app, game, tableLimit : parseInt(tableLimit)})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editEdge = async ({app, game, edge, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/games/editEdge', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app, game, edge})
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

    getEcosystemVariables = async () => {
        try{
            let response = await fetch(URL+ `/api/ecosystem/all`, {
                method : 'GET',
                headers : addHeaders(config),
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

    set2FA = async ({secret, token, admin, headers}) => { 
        try{
            let response = await fetch( URL + `/api/admins/2fa/set`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    admin,
                    '2fa_secret' : secret,
                    '2fa_token' : token
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    updateWallet = async ({app, amount, transactionHash, headers}) => {
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
            let response = await fetch( API_URL_WITHDRAW + `/api/app/requestWithdraw`, {
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

    finalizeUserWithdraw = async ({app, user, transactionHash, withdraw_id, headers}) => {
        try{
            let response = await fetch( API_URL_WITHDRAW + `/api/users/finalizeWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app, user, transactionHash, withdraw_id
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({app, withdraw_id, transactionHash, headers}) => {
        try{
            let response = await fetch( API_URL_WITHDRAW + `/api/app/finalizeWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app, transactionHash, withdraw_id
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }
  
    getGames = async ({app, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/games/getAll`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app
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

    addBlockchainInformation = async ({app, params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/addBlockchainInformation`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app, 
                    ...params
                })
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getEcosystemGames = async () => {
        try{
            let response = await fetch( URL + `/api/ecosystem/games/casino`, {
                method : 'GET',
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }


    addGameToPlatform = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/games/add`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editAffiliateStructure = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/affiliate/edit`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    setCustomAffiliateStructureToUser = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/affiliate/custom/add`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    
    editTopBarCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/topBar`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editBannersCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/banners`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editLogoCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/logo`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    deployAndHostApplication = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/deploy`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editColorsCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/colors`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editFooterCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/footer`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getAppUsers = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/users`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getUser = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/user/get`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getWithdraws = async ({params, headers}) => {
        try{
            let response = await fetch( API_URL_WITHDRAW + `/api/app/users/withdraws`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
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

