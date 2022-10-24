// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

struct UserInfo {
    address walletAddress;
    string dataStorageHash;
}    

struct StoreInfo {
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

struct Theme{
    string background;
    string primary;
    string text;
}

