const { ethers } = require('ethers');

// Connect to an Ethereum node using Infura
const infuraApiKey = 'YOUR_INFURA_API_KEY';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraApiKey}`);

async function getEthBalance(accountAddress) {
    try {
        const balanceWei = await provider.getBalance(accountAddress);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        return balanceEth;
    } catch (error) {
        return `Error getting ETH balance: ${error.message}`;
    }
}

async function getTokenBalance(accountAddress, tokenAddress, tokenAbi) {
    try {
        // Assuming the token follows the ERC-20 standard
        const contract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        const tokenBalanceWei = await contract.balanceOf(accountAddress);
        const tokenBalance = ethers.utils.formatUnits(tokenBalanceWei, 'ether');
        return tokenBalance;
    } catch (error) {
        return `Error getting token balance: ${error.message}`;
    }
}

module.exports = { getEthBalance, getTokenBalance };




// Example 
const accountAddress = '0x59D55EA2c086aEB6fB7E10A8014D8316F10b5a78';//my address
getEthBalance(accountAddress)
    .then((ethBalance) => console.log(`ETH Balance for ${accountAddress}: ${ethBalance} ETH`))
    .catch((error) => console.error(error));

const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';//WETH contract address
const tokenAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }]; // Replace with the actual ABI of your ERC-20 token
getTokenBalance(accountAddress, tokenAddress, tokenAbi)
    .then((tokenBalance) => console.log(`Token Balance for ${accountAddress}: ${tokenBalance} Tokens`))
    .catch((error) => console.error(error));

    
    
//Result


// arlandoff@arlandoff-TM1604:~/Desktop/ETH_API$ node ethereumApi.js
// Token Balance for 0x59D55EA2c086aEB6fB7E10A8014D8316F10b5a78: 0.0 Tokens
// ETH Balance for 0x59D55EA2c086aEB6fB7E10A8014D8316F10b5a78: 0.001049860525678491 ETH


// arlandoff@arlandoff-TM1604:~/Desktop/ETH_API$ npm test

// > eth_api@1.0.0 test
// > mocha


//   getEthBalance
// ETH Balance for 0x59D55EA2c086aEB6fB7E10A8014D8316F10b5a78: 0.001049860525678491 ETH
// Token Balance for 0x59D55EA2c086aEB6fB7E10A8014D8316F10b5a78: 0.0 Tokens
    // ✔ should return the ETH balance for a valid account address (2526ms)
    // ✔ should handle errors gracefully (1271ms)

//   getTokenBalance
    // ✔ should return the token balance for a valid account address and token address (1216ms)
    // ✔ should handle errors gracefully (736ms)


//   4 passing (6s)
