import store from "../containers/App/store";
import { setMessageNotification } from "../redux/actions/messageContainer";

export const ETHEREUM_NET_DEFAULT = process.env.REACT_APP_ETHEREUM_NET;

export const API_URL = process.env.REACT_APP_API_MASTER;

export const API_URL_WITHDRAW = process.env.REACT_APP_API_WITHDRAW;

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