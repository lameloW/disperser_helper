import { R } from './R.js'
import User from './config/user.js';

async function main() {
    let r = new R(User.ERC20_ADDR, User.PRIVATE_KEY);
    let res = await r.approveTokens(User.DISPERSER_ADDR);
    console.log(res ? "Approved" : "Failed");
}

main();