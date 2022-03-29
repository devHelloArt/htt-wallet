import cryptoJs from "crypto-js";
import base64 from "base-64"

export const encryptHmacSha512 = (value, key) =>
    cryptoJs.HmacSHA512(value, key).toString();

export const encryptHmacSha512Key = value =>
    cryptoJs.HmacSHA512(value, "HTT").toString();

export const encryptSha512 = value => cryptoJs.SHA512(value).toString();

export const encryptMd5 = value => cryptoJs.MD5(value).toString();

export const encryptAes = (value, key) =>
    cryptoJs.AES.encrypt(value, key).toString();

export const decryptAes = (value, key) =>
    cryptoJs.AES.decrypt(value, key).toString(cryptoJs.enc.Utf8);

export const decodeToken = (token) => {
    if (!token) return;
    if (token.constructor.name !== 'String') return;
    if (token.search('.') < 0) return;
    token = token.split('.')
    return {
        head: JSON.parse(base64.decode(token[0])),
        payload: JSON.parse(base64.decode(token[1]))
    }
}