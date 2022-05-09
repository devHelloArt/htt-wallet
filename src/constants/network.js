export const networks = {
    LUNES: {
        coinSymbol: "LUNES",
        coinName: "Lunes",
        apiUrl: "https://lunesnode.lunes.io",
        APICONFIG: {
            minimumSeedLength: 25,
            requestOffset: 0,
            requestLimit: 100,
            logLevel: "warning",
            timeDiff: 0,
            networkByte: "1".charCodeAt(0),
            nodeAddress: "https://lunesnode.lunes.io/",
            matcherAddress: "https://lunesnode.lunes.io/matcher"
        }
    },
    LUNESTESTNET: {
        coinSymbol: "LUNES",
        coinName: "Lunes",
        apiUrl: "https://lunesnode-testnet.lunes.io",
        APICONFIG: {
            minimumSeedLength: 25,
            requestOffset: 0,
            requestLimit: 100,
            logLevel: "warning",
            timeDiff: 0,
            networkByte: "0".charCodeAt(0),
            nodeAddress: "https://lunesnode-testnet.lunes.io",
            matcherAddress: "https://lunesnode-testnet.lunes.io/matcher"
        }
    }
};
