// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AnimeContract {
    // Structure to hold the anime details
    struct Anime {
        string name;
        address owner;
    }

    // Mapping from tokenId to Anime struct
    mapping(uint256 => Anime) public animeData;

    // Keep track of the next token ID
    uint256 public nextTokenId;

    // Mint an Anime NFT
    function mintAnime(string memory name) public {
        uint256 tokenId = nextTokenId;
        animeData[tokenId] = Anime(name, msg.sender);  // Assign the name and the owner's address
        nextTokenId++;  // Increment the tokenId for the next mint
    }

    // Get Anime details by tokenId
    function getDetails(uint256 tokenId) public view returns (string memory, address) {
        require(tokenId < nextTokenId, "AnimeNFT: Token does not exist");
        Anime storage anime = animeData[tokenId];
        return (anime.name, anime.owner);  // Return the name and owner of the token
    }
}
