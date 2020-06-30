export const API_URL = "https://ms-esports-dev.herokuapp.com";

export const config = {
    headers: {
        'Content-Type' : 'application/json'
    },
    server: {
        development : 'http://localhost:80',
        production : 'https://api.betprotocol.com'
    }
}

export function addHeaders(config, newHeaders){
    return {
        ...config.headers,
        ...newHeaders   
    }
}
