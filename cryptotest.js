const SimpleCrypto = require("simple-crypto-js").default;

var userPass = "zxc123";
 
//var hashPass = new SimpleCrypto(userPass);
var hashPass = new SimpleCrypto("CZDqFRqoS4");
 
var surveyKey = "qwerty12345";


// var hashedKey = hashPass.encrypt(surveyKey);
// var hashedKey1 = hashPass.encrypt(surveyKey);

var data = "5dbf702cca3b6d6491fc7921a484fda8453244a358f4d952cf9e64d55c8e10betFfFlNMMaCTXmTN919KLJW2/aYHWiMTi92tjDYlB/M5N2B1yvanN5EikuSPvwB8kJfzRn4XZnYx6cbZ1wGQGbsDKBufvgHsaJ5cmq7eJY5Wt7T/TwYnoranq1WX4PT/GPfajTtxS15Lt3LMqCb9iItK8f2NzKATFjoXNtbU87neuu+BQT8RFSKZmS/u+qb+gqKpK72tbKHUyS0natgMb4qlJRNqR1y0o5x/Nnu/bpH1G85VkiVCHTKsg/nFD1paj96CwUzHOI1pEnsPCtahP0JC0G1Jegs1pnvbDD++C/e/hwe/dbr16w3VW1Xazu+Xh4iEKjeo9/jdA0mTCWxePdQlV/+YMgxyRld0sk1125SH1ccac5hk9PKJ8JJPSiirGbOThJbwA4ryfNJcVsezMc0AZVmTo4Mvo31gGYnJjl0zq5b3jXQfeb3XOt2EQkweaQivNpbfvAg8m7AkhZwB/lpr3axLxx04aoYpLrW+rznc=";
let datajson = JSON.stringify(data);
// console.log("surveyKey    : " + surveyKey);
// console.log("hashedKey   : " + hashedKey);
// console.log("hashedKey1   : " + hashedKey1);

//var dehashedKey = hashPass.decrypt(hashedKey);
var dehashedKey1 = hashPass.decrypt(datajson);

//console.log("dehashedKey : " + dehashedKey);
console.log("dehashedKey1 : " + dehashedKey1);
