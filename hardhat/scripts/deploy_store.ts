// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {ethers, upgrades} from 'hardhat';

async function main() {
    const Store = await ethers.getContractFactory('Store');
    const store = await upgrades.deployProxy(Store, [], {kind: 'uups'});
    await store.deployed();

    console.log('Store deployed to:', store.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
