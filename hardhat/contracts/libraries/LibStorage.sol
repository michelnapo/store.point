// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../StoreTypes.sol";
import "../SocialCommentsTypes.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";


struct StoreIndexStorage{
    Counters.Counter _storeIds;
    mapping(address => StoreInfo) createdStores;
}

struct StoreStorage{
    Counters.Counter _tokenIds;
    Theme theme;
    mapping(uint256 => Product) tokenIdToProduct;
}

struct StoreCommentsStorage{
    SomeDataStructure someData;
}

library LibStorage {

    bytes32 constant STORE_STORAGE_POSITION = keccak256("point.storage.store");
    bytes32 constant STORE_INDEX_STORAGE_POSITION = keccak256("point.storage.storeIndex");
    bytes32 constant STORE_COMMENTS_STORAGE_POSITION = keccak256("point.storage.storeComments");


    function storeStorage() internal pure returns (StoreStorage storage ss) {
        bytes32 position = STORE_STORAGE_POSITION;
        assembly {
            ss.slot := position
        }
    }

    function storeIndexStorage() internal pure returns (StoreIndexStorage storage sis) {
        bytes32 position = STORE_INDEX_STORAGE_POSITION;
        assembly {
            sis.slot := position
        }
    }

    function storeCommentsStorage() internal pure returns (StoreCommentsStorage storage scs) {
        bytes32 position = STORE_COMMENTS_STORAGE_POSITION;
        assembly {
            scs.slot := position
        }
    }
}

contract WithStorage {

    //store storage 
    function ss() internal pure returns (StoreStorage storage) {
        return LibStorage.storeStorage();
    }

    //store index storage
    function sis() internal pure returns (StoreIndexStorage storage) {
        return LibStorage.storeIndexStorage();
    }

    //store comments storage
    function scs() internal pure returns (StoreCommentsStorage storage) {
        return LibStorage.storeCommentsStorage();
    }

}


