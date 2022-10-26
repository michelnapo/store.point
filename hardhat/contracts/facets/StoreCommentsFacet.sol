// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../StoreTypes.sol";
import "../SocialCommentsTypes.sol";

// External contract imports
import {StoreFacet} from "./StoreFacet.sol";

// Storage imports
import {WithStorage} from "../libraries/LibStorage.sol";

contract StoreCommentsFacet is WithStorage{

    function _doSomethingThatNeedClient(string memory parameter) external {
        SomeDataStructure memory data = StoreFacet(address(this)).getSomeData(parameter);
        StoreFacet(address(this)).setSomeData(SomeDataStructure(0, ""));
    }

    function doSomethingWithComments() external {
        scs().someData = SomeDataStructure(1, "call doSomethingWithComments");
    }

    function getSomeData() public view returns (SomeDataStructure memory){
        return scs().someData;
    }

    


}
