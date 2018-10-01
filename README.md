## Bithereum DNS Seed Handler

When a full node first connects to the network it must first discover peers using the DNS seed endpoints. Bithereum mainnet and testnet both have their own endpoints which can be found hardcoded into core.

### Mainnet seeds
```c
vSeeds.emplace_back("us-dnsseed.bithereum.network", true);
vSeeds.emplace_back("eu-dnsseed.bithereum.network", true);
vSeeds.emplace_back("sg-dnsseed.bithereum.network", true);
```

### Testnet seeds
```c
vSeeds.emplace_back("us-testnet-dnsseed.bithereum.network", true);
vSeeds.emplace_back("eu-testnet-dnsseed.bithereum.network", true);
vSeeds.emplace_back("sg-testnet-dnsseed.bithereum.network", true);
```

## Install 

To install a DNS seed server, you'll need to have `NPM` and `Node JS v9+` installed prior to running the following commands.

```shell 
sudo apt-get update -y
sudo apt-get install npm -y
sudo npm install n -g -y
sudo n v9
git clone https://github.com/BTHPOS/dns-seed-handler.git dns-seed-handler
cd dns-seed-handler
npm install
```

## Configure 

Within `server.js`, configure the hostname and ip addresses that you would like returned based on the DNS query. 

```javascript
      if (hostname.indexOf("us-dnsseed") === 0) {
          res.answer.push({name:hostname, type:'A', data:"54.162.119.37", ttl:ttl});
          res.answer.push({name:hostname, type:'A', data:"18.212.4.44", ttl:ttl});
      }
```

## Run

To start the DNS server, run `npm start` or `node server.js`. 

## Troubleshooting 

In some cases, port 53 will be in use by a process acting as a DNS. 

```shell
DNS Server Running
events.js:165
      throw er; // Unhandled 'error' event
      ^

Error: bind EACCES 0.0.0.0:53
    at _handle.lookup (dgram.js:266:18)
    at process._tickCallback (internal/process/next_tick.js:178:19)
    at Function.Module.runMain (internal/modules/cjs/loader.js:697:11)
    at startup (internal/bootstrap/node.js:201:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:516:3)
Emitted 'error' event at:
    at Socket.<anonymous> (/home/ubuntu/dns-seed-handler/node_modules/dnsd/server.js:41:44)
    at Socket.emit (events.js:180:13)
    at _handle.lookup (dgram.js:267:14)
    at process._tickCallback (internal/process/next_tick.js:178:19)
    [... lines matching original stack trace ...]
    at bootstrapNodeJSCore (internal/bootstrap/node.js:516:3)
```

If you are running this on a unix based system like Ubuntu, it often times can be `systemd-resolve`. Run `sudo service systemd-resolved stop` and then try running `node server.js` once more. In a nutshell, you'll have to figure out what process is using port 53 so that your DNS seed server will be able to handle incoming requests.
