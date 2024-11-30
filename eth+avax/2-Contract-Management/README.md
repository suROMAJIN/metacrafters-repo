# A Simple DApp: Implementing Anime NFT Minting

## Overview

This project is a decentralized application (DApp) for minting and managing Anime NFTs, built using Ethereum smart contracts. It allows users to mint anime-related NFTs, retrieve details of minted NFTs by their `tokenId`, and view details about the specific anime. The DApp interacts with a smart contract deployed on a local Ganache test network, with the front-end built in React.

## Features
- **Mint Anime NFT**: Allows users to mint NFTs with a name and store them on the blockchain.
- **Token Details**: Fetches the details of a specific NFT using its `tokenId`.
- **Random Anime Fetch**: After minting, a random anime is fetched and displayed.
- **Error Handling**: Displays appropriate messages for failed transactions or missing data.

## Smart Contract Functions

### `mintAnime(string memory _name)`
```solidity
function mintAnime(string memory _name) public
```
- **Description**: Mints a new anime NFT with the provided name. Only the caller can mint the NFT.
- **Parameters**: 
  - `_name`: The name of the anime.
- **Returns**: None

### `getDetails(uint256 tokenId)`
```solidity
function getDetails(uint256 tokenId) public view returns (string memory, address)
```
- **Description**: Retrieves the name and owner address of the anime NFT associated with a given `tokenId`.
- **Parameters**: 
  - `tokenId`: The unique ID of the anime NFT.
- **Returns**: `string` - Name of the anime, `address` - Owner of the NFT

### `nextTokenId()`
```solidity
function nextTokenId() public view returns (uint256)
```
- **Description**: Returns the next available token ID for minting a new NFT.
- **Parameters**: None
- **Returns**: `uint256` - The next available token ID.

---

## Front-End (React) Features

1. **Mint Anime NFT**:
   - The user enters an anime name, clicks the "Mint Anime" button, and a new NFT is minted.
   - Displays a random anime after minting as a placeholder or inspiration for the minted NFT.

2. **Fetch Token Details**:
   - The user can enter a `tokenId` and click the "Get Details" button to fetch details of a specific NFT.
   - Displays the anime name and owner address.

3. **State Management**:
   - Uses React hooks (`useState`) to manage the state of `animeName`, `tokenId`, `animeDetails`, and `tokenDetails`.

4. **Error Handling**:
   - Alerts users if there are issues with minting, fetching details, or if no data is available.

---

## Instructions on how to run in local environment

1. **Set Up Ganache and Metamask:**
   - Initialize a local Ganache test network.
   - Connect Ganache with Remix IDE and deploy the contract.

2. **Set Up the React Front-End:**
   - Clone the repository to your local machine.
   - Navigate to the project root folder and install the necessary packages:
     ```bash
     npm install
     ```

3. **Deploy the Contract:**
   - Open Remix IDE, connect to your Ganache instance, and deploy the smart contract using the Remix deployment tools.

4. **Set Up Metamask:**
   - Add the Ganache network to Metamask.
   - Connect to the Ganache network in Metamask and ensure it's the same network that Remix is using.

5. **Start the React App:**
   - In the project directory, run:
     ```bash
     npm run dev
     ```
   - This will start the React front-end, which interacts with the deployed contract on Ganache.

### To summarize:
- **Step 1**: Run Ganache and connect it with Remix IDE.
- **Step 2**: Deploy the contract using Remix.
- **Step 3**: Set up Metamask and connect it to Ganache.
- **Step 4**: Start the React app using `npm run dev`.

---

## Troubleshooting errors

- **If you encounter errors like "Nonce too high", "Transaction fallback", or "ethBlockNumber too high"**:
  1. Try stopping both the hardhat node and the React app. Restart them sequentially. (if using hardhat)
  2. In Metamask, remove the Ganache localhost network, switch to a different network, and then re-enter the Ganache network details.
  3. Clear cached data in Metamask (`Settings > Advanced > Clear Activity Data`).
  4. Run `npx hardhat clean` in your project and restart the node. (if using hardhat)
  5. If needed, redeploy the contract while the app is running. 
  6. Check the environment you are running with the remix ide.

- **Issues with Smart Contract Deployment**:
  - Ensure that the contract is deployed to the correct network and that your Metamask is connected to the same network.
  
---

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for more information.

---

## Acknowledgments

This DApp is inspired by basic principles of Ethereum token standards and minting processes. Developed using Solidity for the smart contract and React for the front-end. Utilized ganache to setup test deployment. Powered by the Jikan API for the anime information.
