import { parseUnits } from 'ethers';
import { R } from './R.js'
import User from './config/user.js';
import BigNumber from 'bignumber.js';

let decimals;

function getAmountInWei(amount){
    // 建议传入的amount是字符串 否则会有浮点数问题
    const amountInWei = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals));
    let res = BigInt(amountInWei.toFixed(0));
    return res;
}

function amountArrToWei(arr){
    const weiArr = arr.map((item)=>{
        return getAmountInWei(item);
    });

    return weiArr;
}

async function main() {
    let r = new R(User.ERC20_ADDR, User.PRIVATE_KEY);
    decimals = await r.getDecimals();

    // user accounts
    let recipients = ["0x1234567812345678123456781234567812345678", "0x1234567812345678123456781234567812345678", "0x1234567812345678123456781234567812345678"];
    let amounts = [0.000000000000001, 0.0000000001, 0.00000000000000001];
    amounts = amountArrToWei(amounts);

    let res = await r.disperseTokens(User.ERC20_ADDR, recipients, amounts);
    console.log(res ? "Succeed" : "Failed");
}

main();