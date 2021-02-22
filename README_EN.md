# Crypto-SDK

English | [中文](README.md)

The Crypto-SDK is a js SDK for transfer (receive not only ETH but also any ERC-20 token; the same is true for a BNB address, BHP address, et al.) and query of mainstream blockchain.

------

## Install

- clone

```shell script
git clone https://github.com/mhxw/crypto-sdk.git
```

- installation dependencies

```bash
yarn install
```

## Example

You first need to configure your app to use the Kovan Testnet and get a few Kovan ETH (the faucet here is a good start, https://faucet.kovan.network/).

- run app

```bash
node app.js
```

## API

query balance

```bash
curl http://localhost:8082/getBalance?account=0x01f933904539fe8662c48392ee31c0afcf98758e
```

## License

Crypto-SDK is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
