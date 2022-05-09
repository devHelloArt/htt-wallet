export const TESTNET = true;
export const BASE_URL = TESTNET ?
    "https://app.dev.htt-wallet.io" :
    "https://app.htt-wallet.io";

export const LUNESNODE_URL = TESTNET ?
    "https://lunesnode-testnet.lunes.io" :
    "https://lunesnode.lunes.io";

export const TETHER_URL = "https://api.omniwallet.org";
export const HEADER_RESPONSE = "x-amzn-remapped-authorization";

export const HEADER_REQUEST = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*"
    }
};

export const HEADER_REQUEST_FORM = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*"
    }
};

export const API_HEADER = {
    headers: {
        key: "IIP0X6S4Ui7z0lTfTkeLO6te2ZmyxOJ1fNeuoIC9"
    }
};


export const chat = {
    ENV: 'PROD', //DEV || PROD
    CHAT_DEV: 'http://localhost:6005',
    CHAT_PROD: 'https://chat.luneswallet.app',
    getUrl: function(componentId, namespace, adId, adOwnerId, buyerId) {
        return `${this['CHAT_'+this.ENV]}/serve/chat?root=${componentId}&namespace=${namespace}&adId=${adId}&adOwnerId=${adOwnerId}&buyerId=${buyerId}`
    }
}
export const blockexplorer = {
    lunes: TESTNET ?
        "https://blockexplorer-testnet.lunes.io/tx/" : "https://blockexplorer.lunes.io/tx/",
};