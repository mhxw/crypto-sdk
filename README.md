# Crypto-SDK

中文 | [English](README_EN.md)

Crypto-SDK是针对主流区块链的转账(支持普通原生代币和合约代币，例如BNB、BHP上的合约代币)和查询的js工具。

------

## 安装

- 克隆此项目

```shell script
git clone https://github.com/mhxw/crypto-sdk.git
```

- 安装依赖

```bash
yarn install
```

## 案例

网络使用以太坊Kovan测试网，USDT代币转账作为案例。你可以在 [Kovan水龙头](https://faucet.kovan.network/) 或者 [gitter](https://gitter.im/kovan-testnet/faucet) 上领取ETH测试币。

- 启动app

```bash
node app.js
```

## API

- 查询余额

```bash
curl http://localhost:8082/getBalance?account=0x01f933904539fe8662c48392ee31c0afcf98758e
```

## License

Crypto-SDK is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)