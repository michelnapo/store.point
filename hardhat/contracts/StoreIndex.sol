// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import "./StoreTypes.sol";

contract StoreIndex is 
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable, 
    ReentrancyGuard 
{
    using Counters for Counters.Counter;
    Counters.Counter internal _storeIds;

    // Product Arrays and Mappings
    mapping(address => StoreInfo) public createdStores;

    function initialize() public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    // Store Functions
    // Example: "My Store", "A quality store", "store.jpg"
    function registerStore(
        string memory name,
        string memory description,
        string memory logo) external 
    {
        // _storeIds.increment();
        // uint256 newStoreId = _storeIds.current();
        // Store memory _store = Store(newStoreId, name, description, logo);
        // stores.push(_store);
        // emit NewStoreEvent(newStoreId, name, block.timestamp);
    }

    function getStores() external view returns(StoreInfo[] memory) {
        //
    }

    //function getStoreByAddress(address storeAddress) external view returns(Store[] memory) {
    //    return stores[];
    //}
}

