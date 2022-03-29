import axios from "axios";
import {
    BASE_URL,
    API_HEADER,
    HEADER_REQUEST,
    HEADER_RESPONSE,
} from "../constants/apiBaseUrl";
import {
    badRequest,
    internalServerError,
} from "../containers/errors/statusCodeMessage";
import { setAuthToken } from "../utils/localStorage";
import { encryptMd5 } from "../utils/cryptography";
import i18n from "../utils/i18n";
import { firebaseGetAuth, firebaseSendEmailVerification, firebaseCreateUser, firebaseSendPasswordResetEmail } from "../utils/firebase";

class UserService {
    async createUser(userInfo) {
        try {
            const auth = firebaseGetAuth();
            return await firebaseCreateUser(auth, userInfo.email, userInfo.password)
                .then(async function(userCredential) {
                    // Signed in
                    const user = userCredential.user;
                    await firebaseSendEmailVerification(auth.currentUser);
                    return user.uid;
                })
                .then(async function(uid) {
                    return await axios.post(
                        BASE_URL + "/users/register", {
                            name: userInfo.name,
                            phonenum: userInfo.phonenum,
                            email: userInfo.email,
                            password: encryptMd5(userInfo.password),
                            link: userInfo.link,
                            uuid: uid,
                        },
                        HEADER_REQUEST
                    );
                })
                .then((response) => { return response; })
                .catch((error) => {
                    const errorCode = error.code;

                    if (errorCode === "auth/credential-already-in-use") {
                        let response = { status: "InUsedMail" };
                        return response;
                    }

                    let response = { status: errorCode };
                    return response;
                });
        } catch (error) {
            if (error.response.data.code === 500) {
                return badRequest(i18n.t("NOTIFICATION_SERVICE_ALREADY_REGISTRED"));
            }

            internalServerError();
            return;
        }
    }

    async getUser(token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.get(BASE_URL + "/user", API_HEADER);
            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async updateUser(userInfo, token) {
        try {
            API_HEADER.headers.Authorization = token;

            const response = await axios
                .patch(BASE_URL + "/user", userInfo, API_HEADER)
                .catch((error) => {
                    return error.response;
                });

            setAuthToken(response.headers[HEADER_RESPONSE]);

            return response;
        } catch (error) {
            return internalServerError();
        }
    }

    async getUserPicture(email) {
        const defaultImg = "images/lunio/lunio-user@300x300.jpg";
        try {
            let emailEncrypt = encryptMd5(email);
            let response = await axios.get(
                "https://en.gravatar.com/" + emailEncrypt + ".json",
                HEADER_REQUEST
            );

            return response.data.entry[0].thumbnailUrl;
        } catch (error) {
            return defaultImg;
        }
    }

    async editUser(token, data) {
        let userData = {
            name: data.name,
            phonenum: data.phonenum,
            birthday: new Date(data.birthday),
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
        };
        API_HEADER.headers.Authorization = token;
        let response = await axios.patch(BASE_URL + "/user", userData, API_HEADER);
        setAuthToken(response.headers[HEADER_RESPONSE]);

        return response;
    }

    async resetUserPassword(token, newPassword, oldPassword) {
        try {
            const user = {
                newPassword: encryptMd5(newPassword),
                oldPassword: encryptMd5(oldPassword),
            };

            API_HEADER.headers.Authorization = token;
            const response = await axios.patch(BASE_URL + "/user", user, API_HEADER);

            return response;
        } catch (error) {
            return internalServerError();
        }
    }

    async resetPass(data) {
        try {
            let auth = await firebaseGetAuth();
            await firebaseSendPasswordResetEmail(auth, data.email);
            return { data: { code: 200 } };
        } catch (error) {
            return internalServerError();
        }
    }

    async verifyEmail(hash) {
        try {
            let response = await axios.get(
                `${BASE_URL}/user/email-verify/${hash}`,
                API_HEADER
            );

            return response.data;
        } catch (error) {
            return internalServerError();
        }
    }
}

export default UserService;