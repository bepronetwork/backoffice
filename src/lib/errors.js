import { setMessageNotification } from "../redux/actions/messageContainer";
import store from "../containers/App/store";

async function processResponse(response){
    try{
        if(parseInt(response.data.status) != 200){
            throw new Error(response.data.message)
        }
        return response.data.message
    }catch(err){
        console.log(err)
        await store.dispatch(setMessageNotification(new String(err.message).toString()));
        throw err;
    }
}


export { processResponse }