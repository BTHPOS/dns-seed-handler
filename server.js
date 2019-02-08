var dnsd = require('dnsd');
var got = require("got");
var PORT = 5333;
var INTERFACEIP = '0.0.0.0'
var limit = 20; // max number of hosts
var addresses = [];

var fetchAddresses = function() {
  got("http://explorer.bithereum.network/ext/connections?_=1549651810200")
     .then(function(response) {
            var data = {}
            try {
                data = JSON.parse(response.body);
            } catch(e) {}

            if (data.data) {
                addresses = data.data.splice(0,limit).map(function(entry) {
                    return entry.address;
                });
            }
      });
};

var handle = function(req, res) {
   var question = req.question[0];
   var hostname = question.name || "";
   var length = hostname.length;
   var ttl = Math.floor(Math.random() * 60);
   console.log(question);

   if (question.type == "A") {
      // US (Mainnet)
      if (hostname.indexOf("x9.us-dnsseed") === 0) {
            for (var address in addresses) {
                res.answer.push({name:hostname, type:'A', data: addresses[address], ttl:ttl});
            }
            fetchAddresses();
      }
      // Europe (Mainnet)
      else if (hostname.indexOf("x9.eu-dnsseed") === 0) {
      }
      // Singapore (Mainnet)
      else if (hostname.indexOf("x9.sg-dnsseed") === 0) {
      }
      // US (Testnet)
      else if (hostname.indexOf("x9.us-testnet-dnsseed") === 0) {
      }
      // Europe (Testnet)
      else if (hostname.indexOf("x9.eu-testnet-dnsseed") === 0) {
      }
      // Singapore (Testnet)
      else if (hostname.indexOf("x9.sg-testnet-dnsseed") === 0) {
      }
   }

   res.end()
};

fetchAddresses();
dnsd.createServer(handle).listen(PORT, INTERFACEIP);
console.log('DNS Server Running');
