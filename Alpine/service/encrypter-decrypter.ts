require("dotenv").config({path: "/Users/mantragohil/Documents/code/Nirma/Alpine/.env"})
const crypto = require('crypto');
const cryptoKey = process.env.encryptionKey;
const initialVector = "kfmdjsngkijoieok";

const encrypt = (data:String) => {
    let mykey = crypto.createCipher('aes-128-cbc', cryptoKey);
    let encrypted = mykey.update(data, 'utf8', 'hex')
    encrypted += mykey.final('hex');
    return encrypted;
};

const decrypt = (data:any) => {
    let decodedObject = crypto.createDecipher('aes-128-cbc', cryptoKey);
    let decrypted = decodedObject.update(data, 'hex', 'utf8')
    decrypted += decodedObject.final('utf8')
    return decrypted;
};

export {}
module.exports = {encrypt, decrypt}
