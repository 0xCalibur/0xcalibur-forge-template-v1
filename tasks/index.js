const shell = require('shelljs');

/**
 *  User defined tasks
 */
task("check-libs-integrity", "Ensure that the libs are not modified", require("./core/check-libs-integrity"));

task(
    "forge-deploy",
    "Deploy using Foundry",
    require("./core/forgeDeploy")
)
    .addParam("script", "The script to use for deployment")
    .addFlag("broadcast", "broadcast the transaction")
    .addFlag("verify", "verify the contract")
    .addFlag("noConfirm", "do not ask for confirmation")
    .addOptionalVariadicPositionalParam("extra", "Extra arguments to pass to the script")

task("post-deploy", "Apply post processing to deployments",
    require("./core/post-deploy"))

subtask(
    "check-console-log",
    "Check that contracts contains console.log and console2.log statements",
    require("./core/checkConsoleLog")
)
    .addParam("path", "The folder to check for console.log statements")

task("verify", "Verify a contract",
    require("./core/verify"))
    .addParam("deployment", "The name of the deployment (ex: MyContractName)")
    .addParam("artifact", "The artifact to verify (ex: src/periphery/MyContractName.sol:MyContractName)")
    .addFlag("showStandardJsonInput", "Show the standard json input to manually verify on etherscan")

task(
    "forge-deploy-multichain",
    "Deploy using Foundry on multiple chains",
    require("./core/forgeDeployMultichain"))
    .addParam("script", "The script to use for deployment")
    .addFlag("broadcast", "broadcast the transaction")
    .addFlag("verify", "verify the contract")
    .addFlag("noConfirm", "do not ask for confirmation")
    .addVariadicPositionalParam("networks", "The networks to deploy to")

task(
    "generate",
    "Generate a file from a template",
    require("./core/generate"))
    .addPositionalParam("template", "The template to use")

task(
    "blocknumbers",
    "Retrieve the latest block numbers for each network",
    require("./core/blocknumbers"))
