// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "./StoreTypes.sol";
import {NFT} from "./NFT.sol";

// To be used when getting Store contract.
interface IStore 
{
}

contract Store is
    IStore,
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable
{
    
    function initialize() public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
        theme = Theme({
            background:'white',
            primary:'indigo',
            text:'black'
        });

        //emit NewStoreEvent(address(this), storeName, block.timestamp);
    }

    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    Theme theme;
    StoreInfo store;
    Product[] products;
    
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

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function addProductToStore(
        string calldata _tokenURI,
        address _nftContract,
        uint _price
    ) external 
    {
        uint tokenId = NFT(_nftContract).mint(_tokenURI);
        products.push(Product(
            _nftContract,
            tokenId,
            _price,
            false
        ));
    }

    function getTokenURI(address _nftContract, uint _tokenId) public view returns (string memory) {
        return IERC721Metadata(_nftContract).tokenURI(_tokenId);
    }

    function buyProduct(uint _tokenId) external payable {
        ///
        /// emit ProductSoldEvent(_tokenId, ownerAddress, msg.sender, block.timestamp);
    }

    function getProducts() external view returns(Product[] memory) 
    {
        return products;
    }

    function getProductByTokenId(uint tokenId) external view returns(Product memory) {
        return tokenIdToProduct[tokenId];
    }

    // Method for getting setted theme
    function getTheme() public view returns (Theme memory) {
        return theme;
    }

    // Method for setting store theme
    function setTheme(string calldata _background, string calldata _primary, string calldata _text) public {
        theme = Theme({
            background: _background,
            primary: _primary,
            text: _text
        });
    }

    function setStoreConfig(string calldata _name, string calldata _description, string calldata _logo) public {
      store = StoreInfo({
          name: _name,
          description: _description,
          logo: _logo
      });
    }

    function getStoreConfig() public view returns (StoreInfo memory) {
        return store;
    }
}
