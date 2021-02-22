const Web3 = require('web3');
const BigNumber = require('bignumber.js');
//旧方式代币转账使用，新方式已丢弃
const Tx =require('ethereumjs-tx');
//检查eth地址是否正确
const ethers = require('ethers');
let web3=new Web3();

web3.setProvider(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/71233863357e4636b5888f98ded4158b"));

// kovan测试网usdt合约地址
let contractAddress = "0x07de306ff27a2b630b1141956844eb1552b956b5";

// 定义合约abi
let contractAbi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

// 定义合约
let myContract = new web3.eth.Contract(contractAbi, contractAddress);


exports = module.exports = {
    //校验eth私钥是否正确
    checkEthPrivateKey() {
        let pk = '0x10'
        let w;
        try {
            w = new ethers.Wallet(pk)
            console.log(w)
        } catch (e) {
            console.log('Invalid private key.')
        }
    },
    //查询代币余额
    async getOtherERCBalance(address) {
        let count=await exports.getOtherERCUnit(contractAddress)
        let pow=new BigNumber(10).pow(count)
        return await new Promise((resolve) => {
            myContract.methods.balanceOf(address).call({from: address}, function (err, result) {
                let balance = new BigNumber(new BigNumber(result).div(pow)).toNumber();
                console.log('err:', err, 'address:', address,'代币小单位余额:', result,'代币大单位余额:', balance)
                return resolve(result);
            })
        });
    },
    // 获得代币名称
    async getOtherERCName(address) {
        return await new Promise((resolve) => {
            myContract.methods.name().call({from: address}, function (err, result) {
                console.log('err:', err, '代币名称:', result)
                return resolve(result);
            });
        });
    },
    //获取代币符号
    async getOtherERCSymbol(address) {
        return await new Promise((resolve) => {
            myContract.methods.symbol().call({from: address}, function (err, result) {
                console.log('err:', err, '代币符号:', result)
                return resolve(result);
            });
        });
    },
    //获取代币总量
    getOtherERCTotalSupply(address) {
        myContract.methods.totalSupply().call({from: address}, function (err, result) {
            console.log('err:', err, '代币总量:', result)
        });
    },
    //获取代币单位
    async getOtherERCUnit(address){
        return await new Promise((resolve) => {
            myContract.methods.decimals().call({from: address}, function (err, result) {
                console.log('err:', err, '代币单位:', result)
                return resolve(result);
            })
        });
    },

    //代币转账 新方式
    async transfer(fromAddress, toAddress, balance,privateKey) {
        await exports.getOtherERCBalance(fromAddress)
        await exports.getOtherERCName(contractAddress)
        let count=await exports.getOtherERCUnit(contractAddress)

        console.log('转账金额：',balance,"大单位")
        //转换成ETH的最小单位数量
        let pow=new BigNumber(10).pow(count)
        let balanceEth = new BigNumber(new BigNumber(balance).mul(pow));
        console.log('转账金额：',balanceEth.toNumber(),"小单位")

        let rawTx = {
            nonce: await web3.eth.getTransactionCount(fromAddress),
            gasLimit: web3.utils.toHex(800000),
            gasPrice: await web3.eth.getGasPrice(),
            from: fromAddress,
            to: contractAddress,
            data: myContract.methods.transfer(toAddress, balanceEth).encodeABI(),
        }

        const signedTx =await  web3.eth.accounts.signTransaction(
             rawTx,
             '0x'+Buffer.from(Buffer.from(privateKey).toString('hex'), 'hex')
        );

        web3.eth.sendSignedTransaction(signedTx.rawTransaction,  (err, txHash)=> {
             console.log('err:', err, 'txHash:', txHash)
        });
    },

    // 代币转账 旧方式，已丢弃
     async transfer1(fromAddress, toAddress, balance,contractAddress,privateKey) {
        // ethGasLimit
         await exports.getOtherERCBalance(fromAddress)
         await exports.getOtherERCName(contractAddress)
         let count=await exports.getOtherERCUnit(contractAddress)
         web3.eth.getTransactionCount(fromAddress, (err, txCount) =>  {
            if (err !== null) {
                console.error(err);
                return
            }
             console.log('转账金额',balance)
            //转换成ETH的最小单位数量
            let pow=new BigNumber(10).pow(count)
            //let balanceEth = new BigNumber(new BigNumber(balance).mul(pow)).toNumber();
            let balanceEth=new BigNumber(balance);
             console.log('转账金额',balanceEth.toNumber())


            let txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(800000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
                from: fromAddress,
                to: contractAddress,
                data: myContract.methods.transfer(toAddress, balanceEth).encodeABI()
            }

            let tx=new Tx(txObject)
            // //对交易进行签名
             tx.sign(Buffer.from(privateKey, 'hex'));
            //
             let serializedTx = tx.serialize()
             console.log('err:', err, 'txHash11:', serializedTx.toString('hex'))
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'),  (err, txHash)=> {
                console.log('err:', err, 'txHash:', txHash)
            });
        });
    },
};


//myContract.methods.decimals().call().then(console.log);

exports.checkEthPrivateKey()
// exports.getOtherERCBalance(currentAccount)
// exports.getOtherERCName(receiptAddress)
// exports.getOtherERCSymbol(receiptAddress)
// exports.getOtherERCTotalSupply(receiptAddress)
// exports.getOtherERCUnit(receiptAddress)
// 发送人地址 接受人地址 金额 当前账户私钥
//exports.transfer(currentAccount,receiptAddress,'0.0001',privateKey)
