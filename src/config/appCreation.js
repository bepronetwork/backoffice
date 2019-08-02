const eth = `${process.env.PUBLIC_URL}/img/tokens/eth.png`;
const usdt = `${process.env.PUBLIC_URL}/img/tokens/usdt.png`;
const dai = `${process.env.PUBLIC_URL}/img/tokens/dai.png`;

const appCreationConfig = {
    'blockchains' : {
        'eth' : {
            image : eth 
        }
    },
    'currencies' : {
        'usdt' : {
            image : usdt 
        }, 
        'dai' : {
            image : dai 
        }
    }
}


export default appCreationConfig;