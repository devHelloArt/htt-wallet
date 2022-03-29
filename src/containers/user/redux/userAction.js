export const authenticate = (username, password) => ({
    type: "POST_USER_AUTHENTICATE_API",
    username,
    password
});

export const createTwoFactorAuth = () => ({
    type: "POST_USER_CREATE_2FA_API"
});

export const verifyTwoFactorAuth = token => ({
    type: "POST_USER_VERIFY_2FA_API",
    token
});

export const getCreateUserInfo = (name, phonenum, email) => ({
    type: "CHANGE_USER_PERSONAL_INFO",
    user: {
        name,
        phonenum,
        email
    }
});

export const backUserInfo = () => ({
    type: "BACK_USER_PERSONAL_INFO"
});

export const getCreateUserInfoPassword = password => ({
    type: "CHANGE_USER_PERSONAL_INFO_PASSWORD",
    password
});

export const createUser = (name, phonenum, email, password, link) => ({
    type: "POST_USER_CREATE_USER_API",
    user: {
        name,
        phonenum,
        email,
        password,
        link
    }
});

export const setUserSeed = (seed, password) => ({
    type: "SET_USER_SEED_API",
    seed,
    password
});

export const resetUser = login => ({
    type: "POST_USER_RESET_USER_API",
    login
});

export const loading = () => ({
    type: "CHANGE_LOADING_STATE"
});

export const updateUserConsents = consents => ({
    type: "PATH_USER_CONSENTS_API",
    consents
});

export const editUserData = data => ({
    type: "PATH_USER_DATA_API",
    data
});

export const updateUserPassword = (
    oldPassword,
    confirmOldPassword,
    newPassword,
    confirmNewPassword
) => ({
    type: "PATH_USER_PASSWORD_API",
    oldPassword,
    confirmOldPassword,
    newPassword,
    confirmNewPassword
});

export const clearUserData = () => ({
    type: "CLEAR_USER_DATA"
});

export const verifyInvite = hash => ({
    type: "VERIFY_INVITE_SAGA",
    hash
});

export const verifyEmail = hash => ({
    type: "VERIFY_EMAIL_SAGA",
    hash
});