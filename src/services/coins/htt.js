import { internalServerError } from "../../containers/errors/statusCodeMessage";

class HTTServices {
    async createLunesTransaction(data) {
        return data;
    }

    async createLeasing(data) {
        return data;
    }

    async cancelLeasing(data) {
        return data;
    }

    async createAlias(value) {
        return value;
    }

    async getAliases(value) {
        return value;
    }

    async getAddressByAlias(value) {
        return value;
    }

    async getLunesAddress(data) {
        try {
            return data;
        } catch (error) {
            return internalServerError();
        }
    }
}

export default HTTServices;