class aes {
  CryptoJS = require('crypto-js');
  key = this.CryptoJS.MD5('Samsundot!');
  encrypt = function (word) {
    //加密
    var CryptoJS = require('crypto-js');
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    var ciphertext = encrypted.ciphertext.toString();
    return CryptoJS.enc.Hex.parse(ciphertext).toString();
  };
  decrypt = function (word) {
    //解密
    try {
      var CryptoJS = require('crypto-js');
      var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      var decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, this.key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return CryptoJS.enc.Utf8.stringify(decrypt).toString() === ''
        ? word
        : CryptoJS.enc.Utf8.stringify(decrypt).toString();
    } catch (err) {
      return word;
    }
  };
  hroaEncrypt = function (word) {
    //hroa itcode加密
    var CryptoJS = require('crypto-js');
    var key = CryptoJS.enc.Utf8.parse('12345678900000000000000000000000');
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    var ciphertext = encrypted.ciphertext.toString();
    return CryptoJS.enc.Hex.parse(ciphertext).toString();
  };
  // 详情见 https://zhidao.baidu.com/question/1819427615658816228.html
}
export default new aes();
