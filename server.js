var dnsd = require('dnsd');
var PORT = 53;
var INTERFACEIP = '0.0.0.0'

var handle = function(req, res) {
   var question = req.question[0];
   var hostname = question.name || "";
   var length = hostname.length;
   var ttl = Math.floor(Math.random() * 3600);

   if (question.type == "A") {
      // US (Mainnet)
      if (hostname.indexOf("x9.us-dnsseed") === 0) {
        res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
        res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
      // Europe (Mainnet)
      else if (hostname.indexOf("x9.eu-dnsseed") === 0) {
        res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
        res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
      // Singapore (Mainnet)
      else if (hostname.indexOf("x9.sg-dnsseed") === 0) {
        res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
        res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
      // US (Testnet)
      else if (hostname.indexOf("x9.us-testnet-dnsseed") === 0) {
        res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
        res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
      // Europe (Testnet)
      else if (hostname.indexOf("x9.eu-testnet-dnsseed") === 0) {
        res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
        res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
      // Singapore (Testnet)
      else if (hostname.indexOf("x9.sg-testnet-dnsseed") === 0) {
        res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
        res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
   }

   res.end()
};

dnsd.createServer(handle).listen(PORT, INTERFACEIP);
console.log('DNS Server Running');
