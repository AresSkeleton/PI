const SimpleCrypto = require("simple-crypto-js").default;

var userPass = "zxc123";
 
var hashPass = new SimpleCrypto(userPass);
 
var surveyKey = "qwerty12345";


var hashedKey = hashPass.encrypt(surveyKey);
var hashedKey1 = hashPass.encrypt(surveyKey);


console.log("surveyKey    : " + surveyKey);
console.log("hashedKey   : " + hashedKey);
console.log("hashedKey1   : " + hashedKey1);

var dehashedKey = hashPass.decrypt(hashedKey);
var dehashedKey1 = hashPass.decrypt(hashedKey1);

console.log("dehashedKey : " + dehashedKey);
console.log("dehashedKey1 : " + dehashedKey1);
