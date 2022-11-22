//in this utils folder will be where we'll add different scripts that we can use across different deployments, so we dont have to repeat this functions in every script.
const { run } = require("hardhat")

const verify = async (contractAddress, args, contract) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
            contract,
            //added this contract variable because it was giving me an error while verifying saying I needed to specify which contract is it due to inheriting another
            //one I think so I followed the instructions on the error message and added it like this and the verifying process worked :D
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
