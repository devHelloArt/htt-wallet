import axios from "axios";
import WAValidator from "lunes-address-validator";

// CONSTANTS
import {
    BASE_URL,
    LUNESNODE_URL,
    API_HEADER,
    HEADER_RESPONSE,
    TESTNET
} from "../constants/apiBaseUrl";

// ERROR
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import {
    getUsername,
    getDefaultCrypto,
    setDefaultCrypto,
    setAuthToken,
} from "../utils/localStorage";
import {
    convertBiggestCoinUnit,
    convertSmallerCoinUnit
} from "../utils/numbers";
// import i18n from "../utils/i18n.js";

// let getPriceHistory = async(coiName, token) => {
//     try {
//         let coinService = new CoinService();
//         let prices = {
//             initial: 0.01,
//             last: 0.01
//         };
//         let priceHistories = await coinService.getCoinPriceHistory(
//             coiName,
//             "usd",
//             "1_D",
//             null,
//             token
//         );

//         if (!priceHistories.data.data) return prices;

//         setAuthToken(priceHistories.headers[HEADER_RESPONSE]);

//         let maxHistories = priceHistories.data.data.history.length - 1;
//         prices.initial = priceHistories.data.data.history[0].price;
//         prices.last = priceHistories.data.data.history[maxHistories].price;

//         return prices;
//     } catch (error) {
//         internalServerError();
//         return;
//     }
// };

class CoinService {
    async getGeneralInfo(token, seed) {
        try {
            API_HEADER.headers.Authorization = token;
            let coins = [];
            let defaultCrypto = await getDefaultCrypto();

            let availableCoins = [{
                abbreviation: "HTT",
                blockExplorerUrl: "",
                decimalPoint: 18,
                family: "HTT",
                id: 1,
                name: "HTT",
                numberConfirmations: 1,
                smallerUnit: "HTT",
                status: "active",
            }];


            const promises = availableCoins.map(async(coin, index) => {
                // CHECK ACTIVE DEFAULT COIN
                if (defaultCrypto === coin.abbreviation && coin.status !== "active") {
                    let coin = availableCoins[index + 1] ?
                        availableCoins[index + 1].abbreviation :
                        availableCoins[index - 1].abbreviation;
                    setDefaultCrypto(coin);
                }

                availableCoins[index].coinHistory = undefined;
                let localSeed = seed;

                if (coin.status === "active") {

                    // GET BALANCE
                    let responseBalance = await axios.get(
                        BASE_URL + "/users/getUserInfo", { params: { id: getUsername() }, headers: { "Authorization": token } }
                    );

                    if (responseBalance.data.balance) {
                        availableCoins.token = responseBalance.data.token;
                        availableCoins[index].balance = {
                            available: parseInt(responseBalance.data.balance),
                            total: parseInt(responseBalance.data.balance),
                        };

                        availableCoins[index].address = responseBalance.data.addr;
                    } else {
                        availableCoins[index].status = "inactive";
                        availableCoins[index].balance = undefined;
                    }
                } else {
                    availableCoins[index].address = localSeed;
                    availableCoins[index].balance = undefined;
                }
            });

            /* eslint-disable */
            await Promise.all(promises);
            /* eslint-enable */

            availableCoins.map(async(coin, index) => {
                coins[coin.abbreviation] = availableCoins[index];
            });
            setAuthToken(token);
            coins.token = availableCoins.token;
            return coins;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async getAvailableCoins(token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.get(BASE_URL + "/coin", API_HEADER);
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async getCoinBalance(email, token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.get(
                BASE_URL + "/users/getbalance", { params: { id: email } },
                API_HEADER
            );
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async getCoinPrice(coinType, fiat, token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.get(
                BASE_URL + "/coin/" + coinType + "/price/" + fiat,
                API_HEADER
            );
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async getCoinPriceHistory(coinType, fiat, range, interval, token) {
        try {
            range = range.split("_");
            let fromDateIso = "";
            let date = new Date();
            let toDateIso = new Date().toISOString();
            let value = range[0];
            let typeValue = range[1];
            const day = 1440;
            const week = 10080;
            const mounth = 43200;
            const year = 525600;

            switch (typeValue.toLowerCase()) {
                case "d":
                    fromDateIso = new Date(
                        date.getTime() - value * day * 60000
                    ).toISOString();

                    break;

                case "w":
                    fromDateIso = new Date(
                        date.getTime() - value * week * 60000
                    ).toISOString();

                    break;

                case "m":
                    fromDateIso = new Date(
                        date.getTime() - value * mounth * 60000
                    ).toISOString();

                    break;

                case "y":
                    fromDateIso = new Date(
                        date.getTime() - value * year * 60000
                    ).toISOString();
                    break;
            }

            API_HEADER.headers.Authorization = token;
            interval = !interval ? 60 : interval;
            let response = await axios.get(
                `${BASE_URL}/coin/${coinType}/history/${fiat}?from=${fromDateIso}&to=${toDateIso}&interval=${interval}`,
                API_HEADER
            );
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async createWalletCoin(coinType, seed, token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.post(
                BASE_URL + "/coin/" + coinType + "/address", {
                    seed
                },
                API_HEADER
            );

            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async getCoinHistory(coin, address, token) {
        try {
            API_HEADER.headers.Authorization = token;
            setAuthToken(token);
            return {};
        } catch (error) {
            internalServerError();
            return;
        }
    }
    getAddress() {}
    async validateAddress(coin, address) {
        try {
            let valid = false;

            if (!coin || !address || address.length < 10) {
                return "error";
            }

            if (coin === "HTT" || coin === "LUNES") {
                let response = await axios.get(
                    LUNESNODE_URL + "/addresses/validate/" + address
                );

                if (!response.data.valid) {
                    return "error";
                }

                return response.data.valid;
            }

            if (TESTNET) {
                valid = await WAValidator.validate(
                    address,
                    coin.toUpperCase(),
                    "testnet"
                );
            } else {
                valid = await WAValidator.validate(address, coin.toUpperCase());
            }

            if (!valid) {
                return "error";
            }

            return valid;
        } catch (er) {
            let error = {
                error: internalServerError(),
                er: er
            };
            return error;
        }
    }

    async shareCoinAddress(coinName, coinAddress) {
        try {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: coinName + ":" + coinAddress,
                    url: window.location.href
                });
            }
        } catch (error) {
            internalServerError();
        }
    }

    async getFee(coinName, fromAddress, toAddress, amount, decimalPoint = 8) {
        try {
            let fee = {};
            let feePerByte = {};
            let feeLunes = {};

            //API_HEADER.headers.Authorization = token;

            amount = convertSmallerCoinUnit(amount, decimalPoint);

            let response = await axios.post(
                BASE_URL + "/coin/" + coinName + "/transaction/fee", {
                    fromAddress,
                    toAddress,
                    amount
                },
                API_HEADER
            );

            setAuthToken(response.headers[HEADER_RESPONSE]);

            let dataFee = response.data.data.fee;
            let dataFeePerByte = response.data.data.feePerByte;
            let dataFeeLunes = response.data.data.feeLunes;

            if (response.data.code === 200) {
                let extraFee = coinName === "HTT" || coinName === "eth" ? 0 : 1000;

                Object.keys(dataFee).map(value => {
                    fee[value] = convertBiggestCoinUnit(
                        dataFee[value] + extraFee,
                        decimalPoint
                    );
                });

                Object.keys(dataFeePerByte).map(value => {
                    feePerByte[value] = dataFeePerByte[value];
                });

                Object.keys(dataFeeLunes).map(value => {
                    feeLunes[value] = dataFeeLunes[value];
                });
            }

            fee = {
                fee,
                feePerByte,
                feeLunes
            };
            return fee;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async saveTransaction(
        serviceId,
        feeLunes,
        transaction,
        coin,
        price,
        lunesUserAddress,
        describe,
        token
    ) {
        try {
            API_HEADER.headers.Authorization = token;
            let transactionData = {
                serviceId: serviceId,
                feeLunes: feeLunes,
                txID: transaction.id,
                from: transaction.sender,
                to: transaction.recipient,
                amount: transaction.amount,
                fee: transaction.fee,
                describe: describe ? describe : null,
                cashback: { address: lunesUserAddress },
                price: {
                    USD: price ? price.USD.price : undefined,
                    EUR: price ? price.EUR.price : undefined,
                    BRL: price ? price.BRL.price : undefined
                }
            };

            let response = await axios.post(
                BASE_URL +
                "/coin/" +
                coin +
                "/transaction/history/" +
                transaction.sender,
                transactionData,
                API_HEADER
            );
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            console.warn(error, error.response);
            internalServerError();
        }
    }
}

export default CoinService;