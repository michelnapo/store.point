// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {ethers, upgrades} from 'hardhat';

async function main() {
    const StoreFactory = await ethers.getContractFactory('StoreFactory');
    const storeFactory = await upgrades.deployProxy(StoreFactory, [], {kind: 'uups'});
    await storeFactory.deployed();

    console.log('StoreFactory deployed to:', storeFactory.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
