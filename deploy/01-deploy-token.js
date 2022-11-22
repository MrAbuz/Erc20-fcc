const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains, contract } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const initialSupply = "1000000000000000000000000" //1M tokens with 18 decimal cases. It doesnt use just "1000000" because if a user wants to send half a token,
    //solidity and evm don't support this behaviour, only whole numbers can be used. So in the backend we treat the numbers with the decimal cases for math, but we
    //keep note of how many decimal cases we're dealing with in the decimals() function for display purposes to the user.
    //Wallets/exchanges adjust displayed values according to the decimals. Also this is why 1 eth = 1*10^18 wei, cuz eth uses 18 decimals and most ERC200's too.
    const args = [initialSupply]

    const token = await deploy("OurToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Main Contract Deployed at ${token.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(token.address, args, contract)
    }
    log("---------------------------------------------")
}

module.exports.tags = ["all", "token"]

// Goerli token address deployed: "0x069a85f385bC92aD44b5EB80dd722c99128e1e7A"
