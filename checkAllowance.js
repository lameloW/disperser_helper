import { R } from './R.js'
import User from './config/user.js';

async function main() {
    let r = new R(User.ERC20_ADDR, User.PRIVATE_KEY);
    let allowance = await r.checkAllowance(User.DISPERSER_ADDR);
    console.log({allowance});
}

main();