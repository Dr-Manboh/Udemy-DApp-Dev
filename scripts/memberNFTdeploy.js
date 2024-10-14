const fs = require("fs");

const main = async() => {
    const addr1 = "0xcD895645834eA636B614AC6F4cF23DfAFA781E5e";
    const addr2 = "0xf9C11e62F6227D87108B930eC6fd5a248505DCa4";
    const addr3 = "0x345A6f57424d038A0b332A88eE511c59A85d8e16";

    const tokenURI1 = "https://ipfs.io/ipfs/Qme2UmqytGpvUfHQqpggor6aSawZ3RHSYjyha8QFDWAvgG/metadata1.json";
    const tokenURI2 = "https://ipfs.io/ipfs/Qme2UmqytGpvUfHQqpggor6aSawZ3RHSYjyha8QFDWAvgG/metadata2.json";
    const tokenURI3 = "https://ipfs.io/ipfs/Qme2UmqytGpvUfHQqpggor6aSawZ3RHSYjyha8QFDWAvgG/metadata3.json";
    const tokenURI4 = "https://ipfs.io/ipfs/Qme2UmqytGpvUfHQqpggor6aSawZ3RHSYjyha8QFDWAvgG/metadata4.json";
    const tokenURI5 = "https://ipfs.io/ipfs/Qme2UmqytGpvUfHQqpggor6aSawZ3RHSYjyha8QFDWAvgG/metadata5.json";

    //デプロイ
    MemberNFT = await ethers.getContractFactory("MemberNFT");
    memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${memberNFT.address}`);

    // NFTをmintする
    let tx = await memberNFT.nftMint(addr1, tokenURI1);
    await tx.wait();
    console.log("NFT#1 minted...");
    tx = await memberNFT.nftMint(addr1, tokenURI2);
    await tx.wait();
    console.log("NFT#2 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI3);
    await tx.wait();
    console.log("NFT#3 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI4);
    await tx.wait();
    console.log("NFT#4 minted...");

    // コントラクトアドレスの書き出し
    fs.writeFileSync("./memberNFTContract.js",
    `
    module.exports = "${memberNFT.address}"
    `
    );
}

const memberNFTDeploy = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

memberNFTDeploy();