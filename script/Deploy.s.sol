// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "utils/BaseScript.sol";

contract MyDeployScript is BaseScript {
    using DeployerFunctions for Deployer;

    function deploy() public {
        // deployer.deploy_TestContract("TestContract", "foobar", tx.origin);
    }
}