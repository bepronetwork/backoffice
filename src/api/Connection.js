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

    register = async ({username, password, name, email, bearerToken}) => {
    
        try{
            let data = {username, password, name, email};
            if(bearerToken != null){
                data['bearerToken'] = bearerToken;
            }
            let response = await fetch(URL + '/api/admins/register', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify(data)
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

    createApp = async ({name, description, virtual, metadataJSON, admin_id, marketType}) => {
        try{
            let response = await fetch(URL + '/api/app/create', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({name, description, virtual, metadataJSON, admin_id, marketType})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    deployApp = async ({params, headers}) => {
        try{
            let response = await fetch(URL + '/api/app/deploy', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }
    
    getSummary = async ({params, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/summary', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getApp =  async ({admin, app, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/get/auth', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({admin, app})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editTableLimit = async ({admin, app, game, tableLimit, wallet, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/games/editTableLimit', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({admin, app, game, tableLimit : parseFloat(tableLimit), wallet})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editEdge = async ({admin, app, game, edge, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/games/editEdge', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({admin, app, game, edge})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editRestrictedCountries = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/restrictedCountries/edit`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getTransactions =  async ({admin, app, filters, headers}) => {
        try{
            let response = await fetch(URL + '/api/app/transactions', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({admin, app, filters})
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

    addServices = async ({admin, app, services, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/services/add`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    app,
                    admin,
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

    updateWallet = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/updateWallet`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    changeMaxDeposit = async ({params, headers}) => {
        try{
            params.amount = parseFloat(params.amount)
            let response = await fetch( URL + `/api/deposit/max/set`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    changeMaxWithdraw = async ({params, headers}) => {
        try{
            params.amount = parseFloat(params.amount)
            let response = await fetch( API_URL_WITHDRAW + `/api/withdraw/max/set`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    changeMinWithdraw = async ({params, headers}) => {
        try{
            params.amount = parseFloat(params.amount)
            let response = await fetch( API_URL_WITHDRAW + `/api/withdraw/min/set`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    changeAffiliateMinWithdraw = async ({params, headers}) => {
        try{
            params.amount = parseFloat(params.amount)
            let response = await fetch( API_URL_WITHDRAW + `/api/affiliate/withdraw/min/set`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    requestWithdraw = async ({params, headers}) => {
        try{
            let response = await fetch( API_URL_WITHDRAW + `/api/app/requestWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    finalizeUserWithdraw = async ({params, headers}) => {
        try{
            let response = await fetch( API_URL_WITHDRAW + `/api/users/finalizeWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({params, headers}) => {
        try{
            let response = await fetch( API_URL_WITHDRAW + `/api/app/finalizeWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }
  
    getGames = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/games/getAll`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getUserBets = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/get/users/bets`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getAllBets = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/get/users/bets`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getLogs = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/logs/get`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
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

    addAddOn = async ({url, params, headers}) => {
        try{
            let response = await fetch( URL + `/api${url}`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editAutoWithdraw = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/autoWithdraw/editAutoWithdraw`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editJackpot = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/jackpot/edge/edit`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    
    editInitialBalance = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/balance/edit`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editVirtualCurrency = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/wallet/virtualCurrency/edit`, {
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

    editTypography = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/typography`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }  

    editIntegration = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/integrations/edit`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editEmailIntegration = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/integrations/mailSender/edit`, {
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

    editFaviconCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/topicon`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editLoadingGifCustomization = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/customization/loadinggif`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editGameImage = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/games/editImage`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editBackgroundImage = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/games/editBackgroundImage`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    addCurrencyWallet = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/wallet/currency/add`, {
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

    addAdmin = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/app/admins/add`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    editAdminType = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/admins/editType`, {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify(params)
            });            
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getAdminByApp = async ({params, headers}) => {
        try{
            let response = await fetch( URL + `/api/admin/app/get`, {
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

