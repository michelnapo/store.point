// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../StoreTypes.sol";
import "../SocialCommentsTypes.sol";

// Storage imports
import {WithStorage} from "../libraries/LibStorage.sol";

contract StoreIndexFacet is WithStorage{

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
