import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";
import {
    setAuthToken,
    getAuthToken,
    getUserSeedWords,
    getDefaultCrypto
} from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import CoinService from "../../../services/coinService";
import UserService from "../../../services/userService";
// import TransactionService from "../../../services/transactionService";

const coinService = new CoinService();
const userService = new UserService();
// const transactionService = new TransactionService();

export function* loadGeneralInfo(action) {
    try {
        let token = yield call(getAuthToken);
        let seed = yield call(getUserSeedWords);

        let responseCoins = yield call(
            coinService.getGeneralInfo,
            token,
            decryptAes(seed, action.password)
        );

        let responseUser = yield call(userService.getUser, token);

        setAuthToken(responseCoins.token);
        delete responseCoins.token;

        // let responseAlias = yield call(
        //     transactionService.getAliases,
        //     responseCoins.lunes.address
        // );

        // if (responseAlias.length > 0) {
        //     let firstAlias = responseAlias[0].split(":")[2];

        //     yield put({
        //         type: "SET_SKELETON_ALIAS_ADDRESS",
        //         alias: firstAlias
        //     });
        // }

        yield put({
            type: "SET_USER_INFO",
            user: {
                birthday: undefined,
                city: undefined,
                country: undefined,
                terms: undefined,
                phone: undefined,
                state: undefined,
                street: undefined,
                profilePicture: undefined,
                name: responseUser.data.name,
                phonenum: undefined,
                username: undefined,
                zipcode: undefined,
                email: undefined
            }
        });

        yield put({
            type: "GET_GENERAL_INFO",
            coins: responseCoins
        });

        yield put({
            type: "CHANGE_LOADING_GENERAL_STATE"
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* loadWalletInfo(action) {
    try {
        const token = yield call(getAuthToken);
        const seed = yield call(getUserSeedWords);
        const defaultCrypto = yield call(getDefaultCrypto);
        let responseCoins = yield call(
            coinService.getGeneralInfo,
            token,
            decryptAes(seed, action.password)
        );

        setAuthToken(responseCoins.token);
        delete responseCoins.token;

        let responseCoinHistory = yield call(
            coinService.getCoinHistory,
            defaultCrypto,
            responseCoins[defaultCrypto].address,
            token
        );

        yield put({
            type: "GET_GENERAL_INFO",
            coins: responseCoins
        });

        yield put({
            type: "SET_WALLET_HISTORY",
            history: responseCoinHistory
        });

        yield put({
            type: "CHANGE_LOADING_GENERAL_STATE"
        });

        yield put({
            type: "SET_WALLET_LOADING"
        });
        yield put({
            type: "SET_ASSET_LOADING"
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* availableCoins() {
    try {
        let token = yield call(getAuthToken);
        let response = yield call(coinService.getAvailableCoins, token);

        yield put({
            type: "GET_AVAILABLE_COINS",
            coins: response.data.data.coins
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* balanceCoins() {
    try {
        let response = yield call();
        yield put({
            type: "GET_BALANCE_COINS",
            coins: response
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* createCoinsAddress() {
    try {
        let response = yield call();
        yield put({
            type: "POST_CREATE_COINS_ADDRESS",
            coins: response.data.data.coins
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}