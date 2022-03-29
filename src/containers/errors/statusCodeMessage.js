import i18n from "./../../utils/i18n";
const type = "REQUEST_FAILED";
const typeSuccess = "REQUEST_SUCCESS";

export const internalServerError = () => ({
  type,
  message:
    (i18n.t("ASSETS_SERVER_ERROR"))

});
 
export const unauthorized = message => ({
  error: {
    type,
    message
  }
});

export const badRequest = message => ({
  error: {
    type,
    message
  }
});

export const forbidden = message => ({
  error: {
    type,
    message
  }
});

export const modalError = message => ({
  type,
  message
});

export const modalSuccess = message => ({
  type: typeSuccess,
  message
});
