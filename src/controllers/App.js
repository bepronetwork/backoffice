import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import Numbers from "../services/numbers";
import { getNonce } from "../lib/number";
import { getPastTransactions, getTransactionDataERC20 } from "../lib/etherscan";
import { setCurrencyView } from "../redux/actions/currencyReducer";
import { setGamesData, setUsersData, setBetsData, setRevenueData, setWalletData, setWithdrawalsData } from "../redux/actions/summaryActions";
import { getAuthFromCookies } from "./services/services";
import _, { identity } from 'lodash';
import { getVideoGamesAll, getAllVideogames, getMatchesAll, getSeriesMatches, getSpecificMatch, setBookedMatch, removeBookedMatch, getTeamStats, getPlayerStats, getBookedMatches, getBookedSeriesMatches } from "../esports/services";

class App{    
    constructor(params){
        this.params = params;
        this.data = {
            summary : {}
        };
        this.admin = getAuthFromCookies();
    }

    hasPermission(res){
        return res.data.status === 200;
    }

    getSummary = async () => {
        const state = store.getState();
        const { currency } = state;

        try{
            let res = await Promise.all([
                ConnectionSingleton.getApp({
                    admin : this.getAdminId(),
                    app : this.getId(),
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }),
                ConnectionSingleton.getTransactions({
                    admin : this.getAdminId(),
                    app : this.getId(),
                    filters : [],
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                }),
                this.getGamesAsync({ currency: currency._id }),
                this.getUsersAsync({size: 100, offset: 0 }),
                this.getUsersWithdrawals({ size: 100, offset: 0 })
            ]);

            let serverApiInfo = {   
                affiliates : res[0].data.message ? res[0].data.message.affiliateSetup : null,
                app : res[0].data.message ? res[0].data.message : null,
                walletSimple : res[0].data.message ? res[0].data.message.wallet : null,
                transactions :  res[1].data && this.hasPermission(res[1]) ? res[1].data.message[0] : null,
                gamesInfo : res[2],
                usersInfoSummary : res[3],
                withdraws : res[4]
            } 
            this.params = serverApiInfo.app;
            this.params.users = serverApiInfo.usersInfoSummary;

            this.data = {
                ...this.data,
                summary : {
                    ...serverApiInfo
                }
            };

            if (!_.isEmpty(currency)) {
                await this.getSummaryAsync(currency);
            }

            return res;
        }catch(err){
            throw err;
		}
    }

    getSummaryAsync = async (currency) => {
        await this.getUsersSummary(currency);
        await this.getGamesSummary(currency);
        await this.getBetsSummary(currency);
        await this.getRevenueSummary(currency);
        await this.getWalletSummary(currency);
    }

    getUsersSummary = async (currency) => {
        const state = store.getState();
        const { periodicity } = state;

        const response = await ConnectionSingleton.getSummary({
            params : {
                admin : this.getAdminId(),
                app : this.getId(),
                type : 'USERS',
                periodicity : periodicity,
                currency : currency._id,
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })

        response.data && typeof response.data.message !== 'string' ? store.dispatch(setUsersData(response.data.message)) : store.dispatch(setUsersData([]))
    }

    getGamesSummary = async (currency) => {
        const state = store.getState();
        const { periodicity } = state;

        const response = await ConnectionSingleton.getSummary({
            params : {
                admin : this.getAdminId(),
                app : this.getId(),
                type : 'GAMES',
                periodicity : periodicity,
                currency : currency._id,
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })

        response.data && typeof response.data.message !== 'string' ? store.dispatch(setGamesData(response.data.message)) : store.dispatch(setGamesData([]))
    }

    getBetsSummary = async (currency) => {
        const state = store.getState();
        const { periodicity } = state;

        const response = await ConnectionSingleton.getSummary({
            params : {
                admin : this.getAdminId(),
                app : this.getId(),
                type : 'BETS',
                periodicity : periodicity,
                currency : currency._id,
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })

        response.data && typeof response.data.message !== 'string' ? store.dispatch(setBetsData(response.data.message)) : store.dispatch(setBetsData([]))
    }

    getRevenueSummary = async (currency) => {
        const state = store.getState();
        const { periodicity } = state;

        const response = await ConnectionSingleton.getSummary({
            params : {
                admin : this.getAdminId(),
                app : this.getId(),
                type : 'REVENUE',
                periodicity : periodicity,
                currency : currency._id,
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })

        response.data && typeof response.data.message !== 'string' ? store.dispatch(setRevenueData(response.data.message)) : store.dispatch(setRevenueData([]))
    }

    getWalletSummary = async (currency) => {
        const state = store.getState();
        const { periodicity } = state;

        const response = await ConnectionSingleton.getSummary({
            params : {
                admin : this.getAdminId(),
                app : this.getId(),
                type : 'WALLET',
                periodicity : periodicity,
                currency : currency._id,
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })

        response.data && typeof response.data.message !== 'string' && this.hasPermission(response) ? store.dispatch(setWalletData(response.data.message[0])) : store.dispatch(setWalletData([]))
    }

    updateAppInfoAsync = async () => {
        this.params = (await ConnectionSingleton.getApp({
            admin : this.getAdminId(),
            app : this.getId(),
            headers : authHeaders(this.getBearerToken(), this.getAdminId())
        })).data.message;
    }

    getDepositReference = async ({currency}) => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.getDepositReference(
                {   
                    currency, 
                    entity : this.getId(), 
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
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
                    admin : this.getAdminId(),
                    app : this.getId(),
                    filters,
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });
        }catch(err){
            throw err;
        }
    }

    getUsersDeposits = async ({ size, offset, filters={} }) => {
        try{
            return await ConnectionSingleton.getUsersTransactions(
                {   
                    params: {
                        size,
                        offset,
                        type: "deposit",
                        ..._.pickBy(filters, identity)
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });

        }catch(err){
            throw err;
        }
    }

    getUsersWithdrawals = async ({ size, offset, filters={} }) => {
        try{
            const response = await ConnectionSingleton.getUsersTransactions(
                {   
                    params: {
                        size,
                        offset,
                        type: "withdraw",
                        ..._.pickBy(filters, identity)
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });

                const data = response.data.message;
                data ? store.dispatch(setWithdrawalsData(data)) : store.dispatch(setWithdrawalsData([]))

                return data;
        }catch(err){
            throw err;
        }
    }

    deployApp = async () => {
        // TO DO : Change App to the Entity Type coming from Login
        try{
            return await ConnectionSingleton.deployApp(
                {   
                    params : {
                        admin : this.getAdminId(),
                        app : this.getId()
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });
        }catch(err){
            throw err;
        }
    }

    editApp = async ({ editParams }) => {
        try{
            let res = await ConnectionSingleton.editApp({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    editParams,
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    updateAppBalance = async ({ increase_amount, currency }) => {
        try{
            let res = await ConnectionSingleton.updateAppBalance({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    increase_amount,
                    currency
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            
            return res;
        }catch(err){
            throw err;
        }
    }

    setGamesAsync = async () => {
        try{
            const { currency } = store.getState();
            this.data.summary.gamesInfo = await this.getGamesAsync({currency : currency._id});
        }catch(err){
            throw err;
        }
    }

    async addServices(services){
        try{
            let res = await ConnectionSingleton.addServices({
                admin : this.getAdminId(),
                app : this.getId(),
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
                services
            });
            return res;
        }catch(err){
            throw err;
		}
    }

    async editAffiliateStructure({structures}){
        try{           
            return await ConnectionSingleton.editAffiliateStructure({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    structures, 
                    affiliateTotalCut : structures.reduce( (acc, s) => acc+parseFloat(s.percentageOnLoss), 0)
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            })
        }catch(err){
            throw err;
        }
    }

    async setCustomAffiliateStructureToUser({user, affiliatePercentage}){
        try{           
            return await ConnectionSingleton.setCustomAffiliateStructureToUser({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    user,
                    affiliatePercentage
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            })
        }catch(err){
            throw err;
        }
    }


    getName(){
        return this.params.name;
    }

    getCroupier(){
        return this.params.croupier;
    }

    getDescription(){
        return this.params.description;
    }

    getServices(){
        return this.params.services;
    }

    getAppLink(){
        return this.params.web_url;
    }

    getId(){
        return this.params.id;
    }

    getCustomization(){
        return this.params.customization;
    }

    getTypography(){
        return this.params.typography;
    }

    getChatIntegration(){
        return this.params.integrations.chat;
    }

    getEmailIntegration(){
        return this.params.integrations.mailSender;
    }

    getInformation(key){
        return this.params[key];
    }

    getBearerToken(){
        return this.admin.bearerToken;
    }

    getAdminId(){
        return this.admin.admin;
    }

    getWallet = ({currency_id}) => {
        return this.params.wallet.find( w => new String(w.currency._id).toString() == new String(currency_id).toString());
    }

    isConnected(){
        return this.params.isValid;
    }

    isDeployed(){
        return this.params.web_url;
    }

    hasPaybearToken(){
        return this.params.paybearToken;
    }

    async updateWallet({amount, transactionHash, currency_id}){
        try{
            let res = await ConnectionSingleton.updateWallet({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    transactionHash,
                    currency : currency_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            let {
                message,
                status
            } = res.data;

            if(parseInt(status) == 200){
                return true;
            }else{
                throw new Error(res.data.message);
            }
        }catch(err){
            console.log(err);
            throw err;
		}
    }

    getParams = () => this.params;

    getWithdraws = ({currency}) => this.params.withdraws.filter( w => new String(w.currency).toString() == new String(currency._id).toString()) || [];

    getDeposits = ({currency}) => this.params.deposits.filter( d => new String(d.currency).toString() == new String(currency._id).toString()) || [];


    getDexDepositsAsync = async (address) => {
        let depositsApp = this.params.deposits || [];
        let allTxsDeposits = await this.getUnconfirmedBlockchainDeposits(address);
        return (await Promise.all(allTxsDeposits.map( async tx => {
            var isConfirmed = false, deposit = null;
            for(var i = 0; i < depositsApp.length; i++){
                if(new String(depositsApp[i].transactionHash).toLowerCase().trim() == new String(tx.transactionHash).toLowerCase().trim()){
                    isConfirmed = true;
                    deposit = depositsApp[i];
                }
            }
            if(isConfirmed){
                return {...deposit, isConfirmed}
            }else{
                return {...tx, isConfirmed}
            }
        }))).filter(el => el != null)
    }

    requestWithdraw = async ({tokenAmount, currency, toAddress}) => {
        try{         
            /* Get Request Withdraw Response */
            var res_with = await ConnectionSingleton.requestWithdraw({
                params : {
                    address : toAddress, 
                    nonce : getNonce(), 
                    currency : currency._id,
                    tokenAmount,
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
            });
    
            return res_with;

        }catch(err){
            throw err;
        }
    }

    finalizeWithdraw = async ({withdraw_id, currency}) => {
        try{         
            /* Get Request Withdraw Response */
            var res_with = await ConnectionSingleton.finalizeWithdraw({
                params : {
                    withdraw_id, 
                    nonce : getNonce(), 
                    currency : currency._id,
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
            });
    
            return res_with;

        }catch(err){
            throw err;
        }
    }

    getUserAsync = async ({user, currency}) => {
        return (await ConnectionSingleton.getUser({
            params : {
                user,
                app : this.getId(),
                admin : this.getAdminId(),
                currency: currency._id
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId()),
        })).data.message;
    }

    getGameStats = async ({game, currency}) => {
        return (await ConnectionSingleton.getGameStats({
            params : {
                game,
                app : this.getId(),
                admin : this.getAdminId(),
                currency: currency._id
            },
            headers : authHeaders(this.getBearerToken(), this.getAdminId()),
        })).data.message;
    }

    getUsersAsync = async ({ size, offset, filters={} }) => {
        try{
            /* Get App Users  */
            this.data.summary.usersInfoSummary = (await ConnectionSingleton.getAppUsers({
                params : {
                    size,
                    offset,
                    ..._.pickBy(filters, _.identity),
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
            })).data.message;
            return this.data.summary.usersInfoSummary;
        }catch(err){
            throw err;   
        }
    }

    getWithdrawsAsync = async ({ size, offset }) => {
        try{
            const data = (await ConnectionSingleton.getWithdraws({
                params : {
                    size,
                    offset,
                    app : this.getId(),
                    admin : this.getAdminId()
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId()),
            })).data.message;
            data ? store.dispatch(setWithdrawalsData(data)) : store.dispatch(setWithdrawalsData([]))
            return data;
        }catch(err){
            throw err;   
        }
    }

    externalApproveWithdraw = async ({ withdraw }) => {
        const { _id } = withdraw;

        try{
            let res = await ConnectionSingleton.externalApproveWithdraw({
                params : {
                    admin: this.getAdminId(), 
                    withdraw_id : _id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            })

            return res;
        }catch(err){
            throw err;
        }
    }

    externalCancelWithdraw = async ({ withdraw }) => {
        const { _id } = withdraw;

        try{
            let res = await ConnectionSingleton.externalCancelWithdraw({
                params : {
                    admin: this.getAdminId(), 
                    withdraw_id : _id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            })

            return res;
        }catch(err){
            throw err;
        }
    }


    approveWithdrawsBatch = async (items) => {
        try{

            let users_array = [];

            for(var i = 0; i < items.length; i++){
                if(users_array.findIndex(u => items[i].user == u));
                /* TO DO */
                let item = items[i];
                let res = await ConnectionSingleton.finalizeUserWithdraw({
                    admin : this.getAdminId(), user : item.user, app : this.getId(), transactionHash : null, withdraw_id : item._id,
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });
                console.log(res);
            }
            return true;
        }catch(err){
            throw err;
        }
    }

    editTableLimit = async ({game, tableLimit, wallet}) => {
        try{
            /* Cancel Withdraw Response */ 
            return await ConnectionSingleton.editTableLimit({    
                admin : this.getAdminId(),           
                app : this.getId(),
                game, tableLimit, wallet,
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editLanguage = async ({ language_id, logo, isActivated }) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editLanguage({   
                params: {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    language_id, 
                    logo, 
                    isActivated
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editTopBarCustomization = async ({ textColor, backgroundColor, text, isActive, language, useStandardLanguage }) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editTopBarCustomization({   
                params: {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    textColor,
                    backgroundColor,
                    text,
                    isActive,
                    language,
                    useStandardLanguage
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editSkinTypeCustomization = async ({ skinParams }) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editSkinTypeCustomization({   
                params: {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    skinParams
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editTypography = async (typography) => {
        try{
            let res = await ConnectionSingleton.editTypography({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    typography
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editIntegration = async ({isActive, integration_id, publicKey, privateKey, integration_type}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    isActive,
                    integration_id,
                    publicKey,
                    privateKey,
                    integration_type
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    
    editCrispIntegration = async ({ isActive, key, cripsr_id }) => {
        try{
            let res = await ConnectionSingleton.editCrispIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    isActive,
                    key,
                    cripsr_id
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editKYCIntegration = async ({ kyc_id, isActive, clientId, flowId, client_secret }) => {
        try{
            let res = await ConnectionSingleton.editKYCIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    kyc_id,
                    isActive,
                    clientId, 
                    flowId,
                    client_secret
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editAnalyticsIntegration = async ({ analytics_id, google_tracking_id, isActive }) => {
        try{
            let res = await ConnectionSingleton.editAnalyticsIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    analytics_id,
                    google_tracking_id,
                    isActive: isActive
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editMoonPayIntegration = async ({ moonpay_id, isActive, key }) => {
        try{
            let res = await ConnectionSingleton.editMoonPayIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    moonpay_id,
                    isActive,
                    key
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    
    editUserKYC = async ({ user, kyc_needed }) => {
        try{
            let res = await ConnectionSingleton.editUserKYC({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    user: user,
                    kyc_needed: kyc_needed
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editEmailIntegration = async ({apiKey, templateIds}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editEmailIntegration({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    apiKey,
                    templateIds
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editBannersCustomization = async ({ banners, autoDisplay, fullWidth, language, useStandardLanguage }) => {
        try{
            let res = await ConnectionSingleton.editBannersCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    banners,
                    autoDisplay,
                    fullWidth,
                    language,
                    useStandardLanguage
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editEsportsPageCustomization = async ({ link_url, button_text, title, subtitle }) => {
        try{
            let res = await ConnectionSingleton.editEsportsPageCustomization({   
                params: {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    link_url,
                    button_text,
                    title,
                    subtitle
                },         
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            });
            return res;
        }catch(err){
            throw err;
        }
    }

    editLogoCustomization = async ({logo}) => {
        try{
            let res = await ConnectionSingleton.editLogoCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    logo
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editBackgroundCustomization = async ({background}) => {
        try{
            let res = await ConnectionSingleton.editBackgroundCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    background
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editVirtualCurrency = async ({params}) => {
        try{
            let res = await ConnectionSingleton.editVirtualCurrency({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    ...params
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editFaviconCustomization = async ({topIcon}) => {
        try{
            let res = await ConnectionSingleton.editFaviconCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    topIcon
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editLoadingGifCustomization = async ({loadingGif}) => {
        try{
            let res = await ConnectionSingleton.editLoadingGifCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    loadingGif
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editThemeCustomization = async ({theme}) => {
        try{
            let res = await ConnectionSingleton.editThemeCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    theme
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editColorsCustomization = async ({colors}) => {
        try{
            /* Cancel Withdraw Response */ 
            let res = await ConnectionSingleton.editColorsCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    colors
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editFooterCustomization = async ({communityLinks, supportLinks, language, useStandardLanguage }) => {
        try{
            let res = await ConnectionSingleton.editFooterCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    communityLinks,
                    supportLinks,
                    language,
                    useStandardLanguage
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editSocialLinksCustomization = async ({ social_link_id, links }) => {
        try{
            let res = await ConnectionSingleton.editSocialLinksCustomization({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    social_link_id,
                    links
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editTopTabCustomization = async ({ topTabParams, isTransparent, language, useStandardLanguage }) => {
        try{
            let res = await ConnectionSingleton.editTopTabCustomization({   
                params : {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    topTabParams,
                    isTransparent,
                    language,
                    useStandardLanguage
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editIconsCustomization = async ({ icon_id, icons, useDefaultIcons }) => {
        try{
            let res = await ConnectionSingleton.editIconsCustomization({   
                params : {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    icon_id,
                    icons,
                    useDefaultIcons: useDefaultIcons
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editSubsectionsCustomization = async ({ subSections, language, useStandardLanguage }) => {
        try{
            let res = await ConnectionSingleton.editSubsectionsCustomization({   
                params : {
                    admin: this.getAdminId(),
                    app: this.getId(),
                    subSections,
                    language,
                    useStandardLanguage
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            return res;
        }catch(err){
            throw err;
        }
    }

    editGameImage = async ({image_url, game}) => {
        try{
            let res = await ConnectionSingleton.editGameImage({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    image_url,
                    game
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editBackgroundImage = async ({background_url, game}) => {
        try{
            let res = await ConnectionSingleton.editBackgroundImage({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    background_url,
                    game
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    createProvider = async ({ provider_id }) => {
        try{
            let res = await ConnectionSingleton.createProvider({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    provider_id,
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    editProvider = async ({ providerParams }) => {
        try{
            let res = await ConnectionSingleton.editProvider({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    providerParams,
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            /* Update App Info Async */
            await this.updateAppInfoAsync();

            return res;
        }catch(err){
            throw err;
        }
    }

    confirmUserAction = async ({ id }) => {
        try{
            return await ConnectionSingleton.confirmUserAction(
                {   
                    params: {
                        user: id,
                        admin: this.getAdminId(),
                    },
                    headers : authHeaders(this.getBearerToken(), this.getAdminId())
                });
        }catch(err){
            throw err;
        }
    }

    cancelWithdraw = async () => {
        try{
            /* Cancel Withdraw Response */
            return await ConnectionSingleton.cancelWithdraw({      
                admin : this.getAdminId(),         
                app : this.getId(),
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    getAllGameProviders = async () => {
        try {
            return await ConnectionSingleton.getAllGameProviders();
        } catch(err) {
            throw err;
        }
    }

    getGamesAsync = async ({currency}) => {
        try{
            return await ConnectionSingleton.getGames({       
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    currency
                }, 
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    getUserBets = async ({user, filters}) => {
        try{
            return await ConnectionSingleton.getUserBets({   
                params : {
                    user,
                    ..._.pickBy(filters, identity),
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    getAllBets = async ({ filters }) => {
        try{
            return await ConnectionSingleton.getAllBets({   
                params : {
                    ..._.pickBy(filters, identity),
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    getLogs = async ({ filters }) => {
        try{
            return await ConnectionSingleton.getLogs({   
                params : {
                    ...filters,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    addCurrencyWallet = async ({ currency }) => {
        try{    
            let res = await ConnectionSingleton.addCurrencyWallet({          
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    currency_id : currency._id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            await setCurrencyView(currency)
            return res;
        }catch(err){
            throw err;
        }
    }

    getEcosystemVariables = async () => {
        try{
            return await ConnectionSingleton.getEcosystemVariables();
        }catch(err){
            throw err;
        }
    }

    getEcosystemLanguages = async () => {
        try{
            return await ConnectionSingleton.getEcosystemLanguages();
        }catch(err){
            throw err;
        }
    }

    getEcosystemSkins = async () => {
        try{
            return await ConnectionSingleton.getEcosystemSkins();
        }catch(err){
            throw err;
        }
    }

    editEdge = async ({game, edge}) => {
        try{
            return await ConnectionSingleton.editEdge({
                admin : this.getAdminId(),            
                app : this.getId(),
                game,
                edge,
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editVideogamesEdge = async ({ esports_edge }) => {
        try{
            return await ConnectionSingleton.editVideogamesEdge({
                admin : this.getAdminId(),            
                app : this.getId(),
                esports_edge: parseFloat(esports_edge),
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    changeMaxDeposit = async ({amount, wallet_id}) => {
        try{
            let res = await ConnectionSingleton.changeMaxDeposit({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    wallet_id : wallet_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

            let {
                status
            } = res.data;

            if(parseInt(status) == 200){
                return true;
            }else{
                throw new Error(res.data.message);
            }
        }catch(err){
            console.log(err);
            throw err;
		}
    }

    changeMaxWithdraw = async ({amount, wallet_id}) => {
        try{
            let res = await ConnectionSingleton.changeMaxWithdraw({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    wallet_id : wallet_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            let {
                status
            } = res.data;

            if(parseInt(status) == 200){
                return true;
            }else{
                throw new Error(res.data.message);
            }
        }catch(err){
            console.log(err);
            throw err;
		}
    }

    changeMinWithdraw = async ({amount, wallet_id}) => {
        try{
            let res = await ConnectionSingleton.changeMinWithdraw({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    wallet_id : wallet_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            let {
                status
            } = res.data;

            if(parseInt(status) == 200){
                return true;
            }else{
                throw new Error(res.data.message);
            }
        }catch(err){
            console.log(err);
            throw err;
		}
    }

    changeAffiliateMinWithdraw = async ({amount, wallet_id}) => {
        try{
            let res = await ConnectionSingleton.changeAffiliateMinWithdraw({
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    amount,
                    wallet_id : wallet_id
                },
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            let {
                status
            } = res.data;

            if(parseInt(status) == 200){
                return true;
            }else{
                throw new Error(res.data.message);
            }
        }catch(err){
            console.log(err);
            throw err;
		}
    }
  
    getSummaryData(type){
        const state = store.getState();
        const { summary } = state;

        switch (type) {
            case 'users':
                return { data: summary.users, type: type }
            case 'games':
                return { data: summary.games, type: type }
            case 'bets':
                return { data: summary.bets, type: type }
            case 'revenue':
                return { data: summary.revenue, type: type }
            case 'wallet':
                return { data: summary.wallet, type: type }
            default:
                return { data: this.data.summary[type], type: type };
        }
    }

    getCurrencyTicker = () => {
        const state = store.getState();
        const { currency } = state;
        return currency.ticker ? currency.ticker : 'N/A';
    }

    getCurrency = () => {
        const state = store.getState();
        const { currency } = state;
        return currency;
    }

    getVersion = () => this.params.version;
    
    getManagerAddress = () => this.params.address;
    
    getOwnerAddress = () => {console.log(this.params); return this.params.ownerAddress;}

    getUnconfirmedBlockchainDeposits = async (address) => {
        try{            
            var platformAddress =  this.getInformation('platformAddress');
            var platformTokenAddress =  this.getInformation('platformTokenAddress');
            var allTxs = (await getPastTransactions(address)).result;         
            let unconfirmedDepositTxs = (await Promise.all(allTxs.map( async tx => {
                let res_transaction = await window.web3.eth.getTransaction(tx.hash);
                let transactionData = getTransactionDataERC20(res_transaction);
                if(!transactionData){return null}
                return {
                    amount: Numbers.fromDecimals(transactionData.tokenAmount, this.params.decimals),
                    to : tx.to,
                    tokensTransferedTo : transactionData.tokensTransferedTo,
                    creation_timestamp: tx.timestamp,
                    transactionHash: tx.hash
                }
            }))).filter(el => el != null).filter( tx => {
                return (
                    new String(tx.to).toLowerCase().trim() == new String(platformTokenAddress).toLowerCase().trim()
                    && new String(tx.tokensTransferedTo).toLowerCase().trim() == new String(platformAddress).toLowerCase().trim()
                    )
            })
            return unconfirmedDepositTxs;
            // TO DO : Finalize

        }catch(err){
            throw err;
        }
    }

    addGameToPlatform = async ({game}) => {
        try{
            return await ConnectionSingleton.addGameToPlatform({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    game
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    addLanguage = async ({ prefix }) => {
        try{
            return await ConnectionSingleton.addLanguage({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    prefix
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    addAddOn = async ({url}) => {
        try{
            return await ConnectionSingleton.addAddOn({   
                url: url,
                params : {
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editAutoWithdraw = async ({currency, autoWithdrawParams}) => {
        try{
            return await ConnectionSingleton.editAutoWithdraw({   
                params : {
                    currency,
                    autoWithdrawParams,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    
    editTxFee = async ({currency, txFeeParams}) => {
        try{
            return await ConnectionSingleton.editTxFee({   
                params : {
                    currency,
                    txFeeParams,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editDepositBonus = async ({currency, depositBonusParams}) => {
        try{
            return await ConnectionSingleton.editDepositBonus({   
                params : {
                    currency,
                    depositBonusParams,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editPointSystem = async ({ currency, pointSystemParams }) => {
        try{
            return await ConnectionSingleton.editPointSystem({   
                params : {
                    currency,
                    pointSystemParams,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editFreeCurrency = async ({ activated, currency, time, value, multiplier }) => {
        try{
            return await ConnectionSingleton.editFreeCurrency({   
                params : {
                    activated,
                    currency,
                    time,
                    value,
                    multiplier,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    convertPoints = async ({ currency, user, isAbsolut }) => {
        try{
            return await ConnectionSingleton.convertPoints({   
                params : {
                    currency,
                    user,
                    isAbsolut,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editJackpot = async ({edge}) => {
        try{
            return await ConnectionSingleton.editJackpot({   
                params : {
                    edge,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editInitialBalance = async ({ balance, currency, multiplier }) => {
        try{
            return await ConnectionSingleton.editInitialBalance({   
                params : {
                    balance,
                    multiplier,
                    currency,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    modifyUserBalance = async ({ user, wallet, currency, newBalance, reason }) => {
        try{
            return await ConnectionSingleton.modifyUserBalance({   
                params : {
                    user,
                    wallet,
                    currency,
                    newBalance,
                    reason,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    editRestrictedCountries = async ({countries}) => {
        try{
            return await ConnectionSingleton.editRestrictedCountries({   
                params : {
                    countries,
                    admin : this.getAdminId(),
                    app : this.getId()
                },     
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });

        }catch(err){
            throw err;
        }
    }

    getComplianceFile = async ({ size=200, offset=0, begin_at, end_at }) => {
        try{
            let res = await ConnectionSingleton.getComplianceFile({   
                params : {
                    admin : this.getAdminId(),
                    app : this.getId(),
                    size,
                    offset,
                    begin_at,
                    end_at
                },         
                headers : authHeaders(this.getBearerToken(), this.getAdminId())
            });
            return res;
        }catch(err){
            throw err;
        }
    }

    getEcosystemGames = async () => {
        try{
            return (await ConnectionSingleton.getEcosystemGames()).data.message;
        }catch(err){
            throw err;
        }
    }

    getEcosystemCurrencies = async () => {
        try{
            return (await ConnectionSingleton.getEcosystemVariables()).data.message.currencies;
        }catch(err){
            throw err;
        }
    }

    getEcosystemCroupier = async () => {
        try{
            return (await ConnectionSingleton.getEcosystemVariables()).data.message.addresses[0].address
        }catch(err){
            throw err;
        }
    }

    // Esports services

    hasEsportsPermission = () => {
        const ESPORTS_API_URL = process.env.REACT_APP_API_ESPORTS;
        const WEBSOCKET_ESPORTS_URL = process.env.REACT_APP_WEBSOCKET_ESPORTS;

        return (!_.isEmpty(ESPORTS_API_URL) && !_.isEmpty(WEBSOCKET_ESPORTS_URL))
    }

    getVideoGamesAll = async () => {
        try {
            await getVideoGamesAll({
                params:{
                    admin: this.getAdminId()
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })
        } catch (err) {
            throw err;
        }
    }

    getAllVideogames = async () => {
        try {
            const res = await getAllVideogames({
                params:{
                    admin: this.getAdminId()
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })

            return res;
        } catch (err) {
            throw err;
        }
    }

    getMatchesAll = async ({ filters, isPagination=false }) => {
        try {
            await getMatchesAll({
                params: {
                    admin: this.getAdminId(),
                    ..._.pickBy(filters, _.identity)
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId()),
                isPagination
            })
        } catch (err) {
            throw err;
        }
    }

    getMatchesAll = async ({ filters, isPagination=false }) => {
        try {
            await getMatchesAll({
                params: {
                    admin: this.getAdminId(),
                    ..._.pickBy(filters, _.identity)
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId()),
                isPagination
            })
        } catch (err) {
            throw err;
        }
    }

    getBookedMatches = async ({ filters, isPagination=false }) => {
        try {
            await getBookedMatches({
                params: {
                    admin: this.getAdminId(),
                    ..._.pickBy(filters, _.identity)
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId()),
                isPagination
            })
        } catch (err) {
            throw err;
        }
    }

    getSpecificMatch = async ({ match_id }) => {
        try {
            return await getSpecificMatch({
                params:{
                    admin: this.getAdminId(),
                    match_id
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })
        } catch (err) {
            throw err;
        }
    }

    getSeriesMatches = async ({ filters, isPagination=false }) => {
        try {
            await getSeriesMatches({
                params: {
                    admin: this.getAdminId(),
                    ..._.pickBy(filters, _.identity)
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId()),
                isPagination
            })
        } catch (err) {
            throw err;
        }
    }

    getBookedSeriesMatches = async ({ filters, isPagination=false }) => {
        try {
            await getBookedSeriesMatches({
                params: {
                    admin: this.getAdminId(),
                    ..._.pickBy(filters, _.identity)
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId()),
                isPagination
            })
        } catch (err) {
            throw err;
        }
    }

    setBookedMatch = async ({ match_external_id }) => {
        try {
            return await setBookedMatch({
                params:{
                    admin: this.getAdminId(),
                    app: this.getId(),
                    match_external_id
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })
        } catch (err) {
            throw err;
        }
    }

    removeBookedMatch = async ({ match_external_id }) => {
        try {
            return await removeBookedMatch({
                params:{
                    admin: this.getAdminId(),
                    app: this.getId(),
                    match_external_id
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })
        } catch (err) {
            throw err;
        }
    }

    getTeamStats = async ({ slug, team_id }) => {
        try {
            return await getTeamStats({
                params: {
                    admin: this.getAdminId(),
                    slug,
                    team_id
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })
        } catch (err) {
            throw err;
        }
    }

    getPlayerStats = async ({ slug, player_id }) => {
        try {
            return await getPlayerStats({
                params: {
                    admin: this.getAdminId(),
                    slug,
                    player_id
                },
                headers: authHeaders(this.getBearerToken(), this.getAdminId())
            })
        } catch (err) {
            throw err;
        }
    }

}


function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export default App;
