import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE, HEADER_REQUEST } from "../constants/apiBaseUrl";

// ERROR
import {
    unauthorized,
    internalServerError
} from "../containers/errors/statusCodeMessage";

// UTILS 
import { setAuthToken } from "../utils/localStorage";
import { encryptMd5 } from "../utils/cryptography";
import i18n from "../utils/i18n";
import { firebaseGetAuth, firebaseLogin } from "../utils/firebase";

class AuthService {
    async authenticate(email, password) {
        try {
            let userCredential = await firebaseLogin(firebaseGetAuth(), email, password)

            const user = userCredential.user;
            let token = await user.getIdToken();
            let response = await axios.post(
                BASE_URL + "/users/login", {
                    login: email,
                    password: encryptMd5(password),
                    token: token
                },
                HEADER_REQUEST
            );

            return response;

        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                let response = await axios.post(
                    BASE_URL + "/users/login", {
                        login: email,
                        password: encryptMd5(password),
                        token: ""
                    },
                    HEADER_REQUEST
                );

                if (response.data.status.code === 200) {
                    // Try to verification and reset  
                } else if (response.data.code === 401) {
                    let notification = i18n.t("NOTIFICATION_SERVICE_INVALID_LOGIN");
                    return unauthorized(notification);
                }

            } else if (error.response.data.code === 401) {
                let notification = i18n.t("NOTIFICATION_SERVICE_INVALID_LOGIN");

                return unauthorized(notification);
            }

            return internalServerError();
        }
    }

    async hasTwoFactorAuth(token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.get(BASE_URL + "/user/2fa", API_HEADER);
            setAuthToken(response.headers[HEADER_RESPONSE]);
            return response;
        } catch (error) {
            if (error.response.data.code === 401) {
                let notification = i18n.t("NOTIFICATION_SERVICE_NOT_2FA");

                return unauthorized(notification);
            }

            return internalServerError();
        }
    }

    async createTwoFactorAuth(token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.post(BASE_URL + "/user/2fa", {}, API_HEADER);
            setAuthToken(response.headers[HEADER_RESPONSE]);

            let data = response.data.data;
            if (data.qrcode) {
                return data;
            }

            return unauthorized(i18n.t("NOTIFICATION_SERVICE_ENABLE_2FA"));
        } catch (error) {
            if (error.response.data.code === 500) {
                return unauthorized(i18n.t("NOTIFICATION_SERVICE_ENABLE_2FA"));
            }

            return internalServerError();
        }
    }

    async verifyTwoFactoryAuth(token2fa, token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.post(
                BASE_URL + "/user/2fa/verify", {
                    token: token2fa
                },
                API_HEADER
            );
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            if (error.response.data.code === 401 || error.response.status === 400) {
                return unauthorized(i18n.t("NOTIFICATION_SERVICE_INVALID_2FA"));
            }
            internalServerError();
            return;
        }
    }
}

export default AuthService;