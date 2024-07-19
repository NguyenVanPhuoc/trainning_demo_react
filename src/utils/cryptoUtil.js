import CryptoJS from "crypto-js";

const CryptoUtil = {
  encrypt: (key, encryptVal) => {
    return CryptoJS.AES.encrypt(encryptVal, key.replace(/-/g, "")).toString();
  },
  decrypt: (key, decryptVal) => {
    const bytes = CryptoJS.AES.decrypt(decryptVal, key.replace(/-/g, ""));
    return bytes.toString(CryptoJS.enc.Utf8);
  },
};

export default CryptoUtil;