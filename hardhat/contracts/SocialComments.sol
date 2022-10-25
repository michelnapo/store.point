// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./SocialCommentsTypes.sol";

// To be used as the client 
interface ISocialCommentsClient 
{

    function getSomeData(string memory someParameter) external view returns(SomeDataStructure memory);
    function setSomeData(SomeDataStructure memory param) external;
}

interface ISocialComments{
    function doSomethingWithComments() external;
}

contract SocialComments is
    Initializable, 
    UUPSUpgradeable, 
    OwnableUpgradeable,
    ISocialComments
{
    address _client;
    ISocialCommentsClient _clientContract;

    function initialize() public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function setClientAddr(address client) public onlyOwner {
        _client = client;
        _clientContract = ISocialCommentsClient(_client);
    }

    function _doSomethingThatNeedClient(string memory parameter) public {
        SomeDataStructure memory data = _clientContract.getSomeData(parameter);
        _clientContract.setSomeData(SomeDataStructure(0, ""));
    }

    function doSomethingWithComments() override external {

    }

}