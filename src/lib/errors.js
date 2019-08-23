import { setMessageNotification } from "../redux/actions/messageContainer";
import store from "../containers/App/store";

async function processResponse(response){
    try{
        if(parseInt(response.data.status) != 200){
            throw new Error(response.data.message)
        }
        return response.data.message
    }catch(err){
        throwUIError(err.message);
    }
}


async function throwUIError(err){
    console.log(err);
    await store.dispatch(setMessageNotification({isActive : true, message : new String(err).toString()}));
}

export { processResponse, throwUIError }