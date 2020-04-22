const SimpleCrypto = require("simple-crypto-js").default;

var userPass = "zxc123";
 
var hashPass = new SimpleCrypto(userPass);
 
var surveyKey = "qwerty12345";


var hashedKey = hashPass.encrypt(surveyKey);


console.log("surveyKey    : " + surveyKey);
console.log("hashedKey   : " + hashedKey);

var dehashedKey = hashPass.decrypt(hashedKey);

console.log("dehashedKey : " + dehashedKey);
