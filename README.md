# DISPERSER_HELPER

### 1. install

    npm install


### 2. set config
在 [`User`](./config/user.js) 中配置好完整的
- PRIVATE_KEY : 钱包私钥（请勿泄漏）

- ERC20_ADDR : 需要转账的币种地址

- DISPERSER_ADDR : 分散器合约地址

- RPC_URL : 配置rpc url

### 3. 授权 token

    node approve.js

[`./approve.js`](./approve.js)

### 4. 检查授权

    node checkAllowance.js

[`./checkAllowance.js`](./checkAllowance.js)

### 5. disperser tokens

    node checkAllowance.js

在代码中，修改所需要的参数

- recipients : 接收空投的用户的地址

- amounts : 对应玩家应该接收到的代币数量

[`./disperser.js`](./disperser.js)