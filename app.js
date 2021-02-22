/**
 * 应用程序的入口文件
 */

var express = require('express');
var app = express();
var ethApi = require('./eth.js');

//以下账户无法使用，请使用自己的账户和私钥测试
// 发送者账号
let currentAccount = "0x5F6DB07dEb8+++Caa11D56845D72D2";

// 发送者私钥
let privateKey = 'e530d3136663e878338c+++a4c09719c50b6620d2cf'

// 接收者地址
let receiptAddress = '0xE5a5bd86787+++8A1c36B7094'

app.listen(8082,()=>{
    //ethApi.getOtherERCBalance(currentAccount);
    ethApi.transfer(currentAccount,receiptAddress,1,privateKey)
   // ethApi.transfer1(currentAccount,receiptAddress,1,privateKey)
    console.log("Port 8082 is running");
});

app.get('/transfer',(req,res) => {
    console.log(req.query.account+"\n");
    let account=req.query.account;
    if (account===""){
        res.json({code: 1, message: '账号错误或不能为空'});
    }
    ethApi.getOtherERCBalance(account)
    res.send(req.query.account)
})

app.get('/getBalance',(req,res) => {
    let account=req.query.account;
    if (account===""){
        res.json({code: 1, message: '账号错误或不能为空'});
    }
    let result=ethApi.getOtherERCBalance("0x01f933904539fe8662c48392ee31c0afcf98758e")
    console.log(result)
    res.send(result)
})