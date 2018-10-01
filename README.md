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
