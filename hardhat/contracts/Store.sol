// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


import "./StoreTypes.sol";
import "./SocialCommentsTypes.sol";
import {ISocialCommentsClient, ISocialComments} from "./SocialComments.sol";

// To be used when getting Store contract.
interface IStore 
{
}

contract Store is
    IStore,
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable,
    ISocialCommentsClient
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

    // Product Arrays and Mappings
    mapping(uint256 => Product) public tokenIdToProduct;

    address _commentsAddr; 
    ISocialComments _commentsContract;

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

    function setCommentsAddr(address commentsContractAddr) public onlyOwner {
        _commentsAddr = commentsContractAddr;
        _commentsContract = ISocialComments(_commentsAddr);
    }

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

    function getSomeData(string memory someParameter) external override view returns(SomeDataStructure memory){
        return SomeDataStructure(0, "");
    }

    function setSomeData(SomeDataStructure memory param) external override {

    }

    function useCommentsForSomething() public {
        _commentsContract.doSomethingWithComments();
    }
}