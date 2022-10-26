// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../StoreTypes.sol";
import "../SocialCommentsTypes.sol";

// External contract imports
import {StoreCommentsFacet} from "./StoreCommentsFacet.sol";

// Storage imports
import {WithStorage} from "../libraries/LibStorage.sol";

contract StoreFacet is WithStorage{

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
    
    function init() external {
        ss().theme = Theme({
            background:'white',
            primary:'indigo',
            text:'black'
        });
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
        return ss().tokenIdToProduct[tokenId];
    }

    // Method for getting setted theme
    function getTheme() public view returns (Theme memory) {
        return ss().theme;
    }

    // Method for setting store theme
    function setTheme(string calldata _background, string calldata _primary, string calldata _text) public payable {
        ss().theme = Theme({
            background: _background,
            primary: _primary,
            text: _text
        });
    }

    function getSomeData(string memory someParameter) external view returns(SomeDataStructure memory){
        return SomeDataStructure(0, "");
    }

    function setSomeData(SomeDataStructure memory param) external {

    }

    function useCommentsForSomething() public {
        StoreCommentsFacet(address(this)).doSomethingWithComments();
    }
}
