// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Store is 
    ERC721, 
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable, 
    ReentracyGuard 
{
    constructor() ERC721("Store", "STOZ") {}

    using Counters for Counters.Counter;
    Counters.Counter internal _storeIds;
    Counters.Counter internal _tokenIds;

    struct Store {
        uint256 id;
        string name;
        string description;
        string logo;
    }

    struct Product {
        IERC721 nft;
        uint tokenId;
        uint price;
        address owner;
        bool sold;
    }

    // Store Array
    Store[] public stores;

    // Product Arrays and Mappings
    mapping(uint256 => uint256[]) public storeIdToTokenIds;
    mapping(uint256 => Product) public tokenIdToProduct;

    // Events
    event NewStoreEvent(uint id, string name, uint256 timestamp);

    event NewProductEvent(
        address nft,
        uint tokenId,
        uint price,
        address owner, 
        uint256 timestamp
    );

    event ProductSoldEvent(        
        uint itemId,
        address nft,
        uint tokenId,
        uint price,
        address from,
        address to
    );

    // Store Functions
    // Example: "My Store", "A quality store", "store.jpg"
    function registerStore(
        string memory name,
        string memory description,
        string memory logo) external 
    {
        _storeIds.increment();
        uint256 newStoreId = _storeIds.current();
        Store memory _store = Store(newStoreId, name, description, logo);
        stores.push(_store);
        emit NewStoreEvent(newStoreId, name, block.timestamp);
    }

    function getStores() external view returns(Store[] memory) {
        return stores;
    }


    function addProductToStore(
        uint storeId,
        string memory name,
        uint price,
        string memory metadata) external 
    {
        ///
    }
                          
    function buyProduct(uint _tokenId) external payable {
        ///
        /// emit ProductSoldEvent(_tokenId, ownerAddress, msg.sender, block.timestamp);
    }

    function getProductsByStoreId(uint storeId) external view returns(Product[] memory) 
    {
        ///
    }

    function getProductByTokenId(uint tokenId) external view returns(Product memory) {
        return tokenIdToProduct[tokenId];
    }
}