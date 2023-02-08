import numeral from "numeral";
import "numeral/locales/pt-br";
import moment from "moment";
import "moment/locale/pt-br";
import * as datefns from "date-fns";

numeral.locale("pt-br");
moment.locale("pt-br");

const withPadding = (value, pad = " ", size = 10) => {
  return (pad.repeat(size) + value).slice(-size);
};

class Format {
  withDecimalPlaces(value, places = 2) {
    const valueString = String(value).replace(".", "").replace(",", ".").trim();
    let mask = "0" + (places <= 0 ? "" : "." + "0".repeat(places));
    return isFinite(valueString || NaN) ? numeral(value).format(mask) : "";
  }

  asCurrency(value) {
    const valueString = String(value).replace(".", "").replace(",", ".").trim();
    return isFinite(valueString || NaN) ? numeral(value).format("0,0.00") : "";
  }

  asNumberFromCurrency(numberAsString) {
    return numeral(numberAsString).value();
  }

  asDateFromString(dateAsString) {
    let date = moment((dateAsString || "").substring(0, 10));
    return date.isValid() ? date.format("L") : "";
  }

  asDateFromStringWithoutFormat(dateAsString) {
    return datefns.parse(dateAsString, "dd/MM/yyyy", new Date());
  }

  asStringFromDate(string) {
    let date = moment((string || "").substring(0, 10));
    return date.isValid() ? date.format("DD/MM/YYYY") : "";
  }

  asStringFromFullMonth(string) {
    let date = moment((string || "").substring(0, 10));
    let month = date.format("MMMM");
    month = month.substring(0, 1).toUpperCase().concat(month.substring(1));
    const year = date.format("YYYY");
    return month + " de " + year;
  }

  asStringFromYear(string) {
    let date = moment((string || "").substring(0, 10));
    const year = date.format("YYYY");
    return year;
  }

  asIsoDate(dateAsString) {
    let date = moment(dateAsString, "DD/MM/YYYY");
    return date.isValid() ? date.toISOString() : "";
  }

  isStringDate(dateAsString) {
    let date = moment(dateAsString, "DD/MM/YYYY");
    return date.isValid();
  }

  asIsoWithoutTZ(dateAsString) {
    let date = moment(dateAsString, "DD/MM/YYYY");
    return date.isValid() ? date.format("YYYY-MM-DDTHH:mm:ss") : "";
  }

  asStringfromJson(dateObj, showDate = true, showTime = true) {
    if (!dateObj) {
      return "";
    }

    let date, time;

    if (showDate) {
      const { year, month, day } = dateObj.date;
      date = `${withPadding(day, "0", 2)}/${withPadding(
        month,
        "0",
        2
      )}/${year}`;
    }

    if (showTime) {
      const { hour, minute } = dateObj.time;
      time = `${withPadding(hour, "0", 2)}:${withPadding(minute, "0", 2)}`;
    }

    if (showDate && showTime) {
      return `${date} às ${time}`;
    }

    return showDate ? date : time;
  }

  textOverflow(text, numberToParse) {
    if (text) {
      if (text.length > numberToParse) {
        return text.substring(0, numberToParse) + "...";
      } else {
        return text;
      }
    } else {
      return "";
    }
  }

  asCpfCnpj(text) {
    const numbers = (text || "").replace(/\D/g, "");

    if (numbers.length === 14) {
      return numbers.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    } else if (numbers.length === 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return numbers;
  }

  asStringToCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  }

  asStringToCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    return cnpj;
  }
}

const formatInstance = new Format();

export default formatInstance;
