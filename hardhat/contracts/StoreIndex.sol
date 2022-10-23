// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// To be used when getting Store contract.
interface IStore 
{
}

contract StoreIndex is 
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable, 
    ReentracyGuard 
{
    using Counters for Counters.Counter;
    Counters.Counter internal _storeIds;

    // Product Arrays and Mappings
    mapping(address => Store) public createdStores;

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

    function getStores() external view returns(Store[] memory) {
        //
    }

     function getStoreByAddress(address storeAddress) external view returns(Store[] memory) {
        return stores[];
    }
}

contract Store is
    IStore,
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable, 
    ReentracyGuard 
{
    constructor(string storeName)
    {
        theme = Theme({
            background:'white',
            primary:'indigo',
            text:'black'
        });

        emit NewStoreEvent(address(this), name, block.timestamp);
    }

    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    struct Theme{
        string background;
        string primary;
        string text;
    }

    struct UserInfo {
        address walletAddress;
        string dataStorageHash;
    }    

    struct Store {
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

    Theme theme;

    // Product Arrays and Mappings
    mapping(uint256 => Product) public tokenIdToProduct;

    // Events
    event NewStoreEvent(
        address storeAddress,
        string name, 
        uint256 timestamp
    );

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

    function addProductToStore(
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

    function getProducts() external view returns(Product[] memory) 
    {
        ///
    }

    function getProductByTokenId(uint tokenId) external view returns(Product memory) {
        return tokenIdToProduct[tokenId];
    }

    // Method for getting setted theme
    function getTheme() public view returns (Theme memory) {
        return theme;
    }

    // Method for setting store theme
    function setTheme(string calldata _background, string calldata _primary, string calldata _text) public payable {
        theme = Theme({
            background: _background,
            primary: _primary,
            text: _text
        });
    }
}