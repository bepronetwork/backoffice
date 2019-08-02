import store from "../containers/App/store";
import { setMessageNotification } from "../redux/actions/messageContainer";

export const ETHEREUM_NET_DEFAULT = process.env.REACT_APP_ETHEREUM_NET;

export const IS_PRODUCTION = process.env.REACT_APP_PRODUCTION;

export const API_URL_GLOBAL = process.env.REACT_APP_API_GLOBAL;

export const API_URL_LOCAL = process.env.REACT_APP_API_LOCAL;

export const API_URL = (IS_PRODUCTION == true) ? API_URL_GLOBAL : API_URL_LOCAL;

export async function processResponse(response){
    try{
        if(parseInt(response.data.status) != 200){
            let { message } = response.data;
            if(!message){message = 'Technical Issues'}
            throw new Error(message)
        }
        return response.data.message
    }catch(err){
        console.log(err);
        await store.dispatch(setMessageNotification(new String(err.message).toString()));
        throw err;
    }
}