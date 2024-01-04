# 0xCalibur Forge Template

## Prerequisites
- Foundry
- Rust/Cargo
- Yarn
- Linux / MacOS / WSL 2

## Commit Style
`<emoji><space><Title>`

| Type             | Emoji |
|------------------|-------|
| readme/docs      | 📝    |
| new feature      | ✨     |
| refactor/cleanup | ♻️     |
| nit              | 🥢    |
| security fix     | 🔒    |
| optimization     | ⚡️     |
| configuration    | 👷‍♂️    |
| events           | 🔊    |
| bug fix          | 🐞    |
| tooling           | 🔧 |

## Getting Started

Initialize
```sh
yarn
```

Make a copy of `.env.defaults` to `.env` and set the desired parameters. This file is git ignored.

Build and Test.

```sh
yarn
yarn build
yarn test
```

Test a specific file
```sh
yarn test --match-path test/MyTest.t.sol
```

Test a specific test
```sh
yarn test --match-path test/MyTest.t.sol --match-test testFoobar
```

## Deploy & Verify
This will run each deploy the script `MyScript.s.sol` inside `script/` folder.
```sh
yarn deploy --network <network-name> --script <my-script-name>
```

## Dependencies
use `package.json` `libs` field to specify the git dependency lib with the commit hash.
run `yarn` again to update them.

## Updating remappings
edit `foundry.toml` remappings section and then run `yarn remappings`

## Updating Foundry
This will update to the latest Foundry release
```
foundryup
```

## Using code generators
```
yarn gen <template_name>
```

Templates are located in `templates/` folder. They are using handlebars templating system.
They can be added or updated using the `tasks/core/generate.js` task file.

> Note that `DeployerFunctions.g.sol.hbs` is not meant to be used for CLI code generating but instead used by `forge-deploy` to generate
> the deployer contract.

# CI
Update `.github/workflows/test.yml` rpc urls to run fork tests on desired chains

## Playground
Playground is a place to make quick tests. Everything that could be inside a normal test can be used there.
Use case can be to test out some gas optimisation, decoding some data, play around with solidity, etc.
```
yarn playground
```

## Verify contract example

### Using forge verify-contract
Use deployments/MyContract.json to get the information needed for the verification

```
forge verify-contract --chain-id 1 --num-of-optimizations 200 --watch --constructor-args $(cast abi-encode "constructor(address,address[])" "<address>" "[<address>,address]") --compiler-version v0.8.16+commit.07a7930e <contract-address> src/MyContract.sol:MyContract -e <etherscan-api-key>
```

### Using Deployment File
```
yarn task verify --deployment My_DeploymentName  --network avalanche  --artifact src/MyContract.sol:MyContract
```

Where `My_DeploymentName` is the deployment json file inside `deployments/` and `src/MyContract.sol:MyContract` the `<contract-path>:<contract-name>` artifact.

### Examples
#### Deploy a script on all chains
```
yarn task forge-deploy-multichain --script Create3Factory --broadcast --verify all
```

#### Deploy a script on some chains, without confirmations
```
yarn task forge-deploy-multichain --script Create3Factory --broadcast --no-confirm --verify mainnet polygon avalanche
```

### Testing and deploying using shanghai EVM
Simply rename a test from `.t.sol` to `.t.shanghai.sol`.
Use `test:shanghai` to run shanghai tests

For scripts rename from `.s.sol` to `.s.shanghai.sol` and deploy using `yarn deploy --script MyScript` without the extension,
as usual.

### Deploy Create3Factory
- Use create3Factories task to deploy a new version on all chain.
- If you want to add an existing one to another chain:
    - need to be deployed from the same msg.sender
    - copy hexdata from the create3factory of the one you want to deploy at the same address to another chain
    - send hexdata to 0x4e59b44847b379578588920cA78FbF26c0B4956C (create2 factory) using metamask hexdata field, for example.
    - copy paste existing deployment from deployments/. Like Arbitrum_Create3Factory.json to the new chain deployment
    - change the deployment file name + txHash at the bottom of the file
    - verify the contract, for example:
        `yarn task verify --network base --deployment Base_Create3Factory --artifact src/mixins/Create3Factory.sol:Create3Factory`

## Example on how to deploy manually
```
forge create --rpc-url <rpc> \
    --constructor-args 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 "arg1" "arg2"  \
    --private-key $PRIVATE_KEY \
    --verify --etherscan-api-key <key> \
    --legacy \
    src/MyContract.sol:MyContract
```

Then create a deployement file with at least the contract address in it.

And to interact:

```
cast send --rpc-url <rpc> \
    --private-key $PRIVATE_KEY \
    --legacy \
    0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7 \
    "myFunction(address)" \
    0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```
