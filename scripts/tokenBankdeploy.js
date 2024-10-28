const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
    const addr1 = "0xcD895645834eA636B614AC6F4cF23DfAFA781E5e";
    const addr2 = "0xf9C11e62F6227D87108B930eC6fd5a248505DCa4";
    const addr3 = "0x345A6f57424d038A0b332A88eE511c59A85d8e16";
    const addr4  = "0xcF502Cc5A7aa5FCC50eD1bA437A7c722b3160e48";
    
     // デプロイ
     const TokenBank = await ethers.getContractFactory("TokenBank");
     const tokenBank = await TokenBank.deploy("TokenBank", "TBK", memberNFTAddress);
     await tokenBank.deployed();
     console.log(`Contract deployed to: https://rinkeby.etherscan.io/address/${tokenBank.address}`);
 
     // トークンを移転する
     let tx = await tokenBank.transfer(addr2, 300);
     await tx.wait();
     console.log("transferred to addr2");
     tx = await tokenBank.transfer(addr3, 200);
     await tx.wait();
     console.log("transferred to addr3");
     tx = await tokenBank.transfer(addr4, 100);
     await tx.wait();
     console.log("transferred to addr4");
 
     // Verifyで読み込むargument.jsを生成
     fs.writeFileSync("./argument.js",
     `
     module.exports = [
         "TokenBank",
         "TBK",
         "${memberNFTAddress}"
     ]
     `
     );
 
     // フロントエンドアプリが読み込むcontracts.jsを生成
     fs.writeFileSync("./contracts.js",
     `
     export const memberNFTAddress = "${memberNFTAddress}"
     export const tokenBankAddress = "${tokenBank.address}"
     `
     );    
 }
 
 const tokenBankDeploy = async () => {
     try{
         await main();
         process.exit(0);
     } catch(err) {
         console.log(err);
         process.exit(1);
     }
 };
 
 tokenBankDeploy();