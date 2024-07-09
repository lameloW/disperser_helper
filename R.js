import { ethers, Wallet, JsonRpcProvider, Contract, MaxUint256, parseUnits, formatUnits } from 'ethers';
import Contract_Abi from './config/abi.js';
import User from './config/user.js';

export class R {
    constructor(tokenAddress, privateKey) {
        const provider = new JsonRpcProvider(User.RPC_URL);
        const abi = [
            Contract_Abi.approve,
            Contract_Abi.balanceOf,
            Contract_Abi.decimals,
            Contract_Abi.allowance,
        ];
        
        // 创建钱包实例
        this.wallet = new Wallet(privateKey, provider);
        this.tokenContract = new Contract(tokenAddress, abi, this.wallet);
        
        const disperserAddress = User.DISPERSER_ADDR;
        const disperserAbi = [
            Contract_Abi.disperseTokens
        ];

        this.disperserContract = new Contract(disperserAddress, disperserAbi, this.wallet);
    }

    async approveTokens(spenderAddress) {
        try {
            const tx = await this.tokenContract.approve(spenderAddress, MaxUint256);
            console.log('Transaction hash:', tx.hash);
    
            const receipt = await tx.wait();
            console.log('Transaction was mined in block:', receipt.blockNumber);

            return true;
        } catch (error) {
            console.error('Error approving tokens:', error);
            return false;
        }
    };

    async checkAllowance(spenderAddress) {
        try {
            // 调用 allowance 方法查询批准的额度
            const allowance = await this.tokenContract.allowance(this.wallet.address, spenderAddress);
            console.log(`Allowance of spender (${spenderAddress}) by owner (${this.wallet.address}): ${formatUnits(allowance, 18)} tokens`);

            return allowance;
        } catch (error) {
            console.error('Error checking allowance:', error);
            
            return error;
        }
    }

    async getBalance(){
        const balance = await this.tokenContract.balanceOf(this.wallet.address);
        return balance;
    }

    async getDecimals(){
        const decimals = await this.tokenContract.decimals();
        return decimals;
    }

    async disperseTokens(tokenAddress, recipients, amounts) {
        // const decimals = await this.tokenContract.disperseTokens();
        try {
            const tx = await this.disperserContract.disperseTokens(tokenAddress, recipients, amounts);
            console.log('Transaction hash:', tx.hash);
    
            const receipt = await tx.wait();
            console.log('Transaction was mined in block:', receipt.blockNumber);

            return true;
        } catch (error) {
            console.error('Error approving tokens:', error);
            return false;
        }
    }
}