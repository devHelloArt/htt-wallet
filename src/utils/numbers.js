import i18n from "./i18n";
import { countriesInfo } from "../constants/user.js";

export const convertBiggestCoinUnit = (value, decimal) => {
  let number = "1";
  for (let i = 0; i < decimal; i++) {
    number = number + "0";
  }
  return value / parseInt(number);
};

export const convertSmallerCoinUnit = (value, decimal) => {
  let number = "1";
  for (let i = 0; i < decimal; i++) {
    number = number + "0";
  }
  return parseInt(value * parseInt(number));
};

export const percentCalcByRange = (first, last) => {
  let result = (last * 100) / first - 100;

  return result.toFixed(2);
};

export const percentCalc = (first, last) => (first * last) / 100;

export const formatDate = (date, type = "DMY", monthNumber = false) => {
  /* TYPES
   D - day,
   DM - day and month,
   DMY - day, month and year
   H - hour
   HM - hour and minute
   HMS - hour, minute and second */

  let monthNames = [
    i18n.t("JANUARY"),
    i18n.t("FEBRUARY"),
    i18n.t("MARCH"),
    i18n.t("APRIL"),
    i18n.t("MAY"),
    i18n.t("JUNE"),
    i18n.t("JULY"),
    i18n.t("AUGUST"),
    i18n.t("SEPTEMBER"),
    i18n.t("OCTOBER"),
    i18n.t("NOVEMBER"),
    i18n.t("DECEMBER")
  ];

  date = new Date(date);

  let day = addZeroIfLessThan(date.getDate());
  let monthIndex = date.getMonth();
  let month = monthNumber ? monthIndex : monthNames[monthIndex];
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = addZeroIfLessThan(date.getMinutes());
  let seconds = addZeroIfLessThan(date.getSeconds());

  if (type === "D") {
    return day;
  } else if (type === "DM") {
    return day + "/" + month;
  } else if (type === "DMI") {
    return day + "/" + month.toString().substr(0, 3);
  } else if (type === "H") {
    return hours;
  } else if (type === "HM") {
    return hours + ":" + minutes;
  } else if (type === "HMS") {
    return hours + ":" + minutes + ":" + seconds;
  } else {
    return day + "/" + month + "/" + year;
  }
};

export const convertISO8601 = (iso) => {
  let d = new Date(iso)
  let minutes = d.getMinutes().toString()
  minutes = minutes < 10 ? '0'.concat(minutes) : minutes
  return {
    hour: `${d.getHours() + 1}:${minutes}`,
    date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  };
};
export const commonToSatoshi = (value, zeros = 8) => {
  return parseInt(value * 10 ** zeros);
};
export const satoshiToCommon = (value, zeros = 8) => {
  return parseFloat(value / 10 ** zeros);
};
export const localCurrency = (number, currency) => {
  if (!currency) {
    let { user } = window.store.getState().user;
    let { country } = user;
    country = country ? country.replace(/\s/gim, "_").toLowerCase() : undefined;
    let countryInfo = countriesInfo[country];
    let currencyAbbr =
      countryInfo && countryInfo.currencyAbbr
        ? countryInfo.currencyAbbr
        : "USD";
    return number.toLocaleString("it-IT", {
      style: "currency",
      currency: currencyAbbr
    });
  }
  return number.toLocaleString("it-IT", {
    style: "currency",
    currency
  });
};

const addZeroIfLessThan = (value, number = 10) => {
  return value < number ? "0" + value : value;
};
