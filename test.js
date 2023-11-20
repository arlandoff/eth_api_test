const { ethers } = require('ethers');
const { expect } = require('chai');

// Replace 'YOUR_INFURA_API_KEY' and 'YOUR_ERC20_ABI' with actual values
const infuraApiKey = 'YOUR_INFURA_API_KEY';
const tokenAbi = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]';

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraApiKey}`);

// Import the functions to be tested
const { getEthBalance, getTokenBalance } = require('./ethereumApi'); // Replace with the actual filename

// Mock account address for testing
const accountAddress = '0x59D55EA2c086aEB6fB7E10A8014D8316F10b5a78';
const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';//WETH

// Test suite for getEthBalance function
describe('getEthBalance', () => {
    it('should return the ETH balance for a valid account address', async () => {
        const ethBalance = await getEthBalance(accountAddress);
        expect(ethBalance).to.be.a('string');
        expect(parseFloat(ethBalance)).to.be.a('number');
    }).timeout(5000); // Increase the timeout to 5000ms (5 seconds)

    it('should handle errors gracefully', async () => {
        // Provide an invalid account address to trigger an error
        const invalidAccountAddress = 'invalid_address';
        const result = await getEthBalance(invalidAccountAddress);
        expect(result).to.include('Error getting ETH balance');
    });
});

// Test suite for getTokenBalance function
describe('getTokenBalance', () => {
    it('should return the token balance for a valid account address and token address', async () => {
        const tokenBalance = await getTokenBalance(accountAddress, tokenAddress, tokenAbi);
        expect(tokenBalance).to.be.a('string');
        expect(parseFloat(tokenBalance)).to.be.a('number');
    }).timeout(5000); // Increase the timeout to 5000ms (5 seconds)

    it('should handle errors gracefully', async () => {
        // Provide an invalid token address to trigger an error
        const invalidTokenAddress = 'invalid_address';
        const result = await getTokenBalance(accountAddress, invalidTokenAddress, tokenAbi);
        expect(result).to.include('Error getting token balance');
    });
});
