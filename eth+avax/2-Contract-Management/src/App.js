import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
import animeContractABI from './AnimeContract.json'; // Import ABI from the file

const ethers = require("ethers")
const CONTRACT_ADDRESS = "0xCf8e4dA48EAd550f246D662f73a88C01a8767872"; // Replace with your contract address


function App() {
  const [animeName, setAnimeName] = useState('');
  const [animeDetails, setAnimeDetails] = useState(null);
  const [tokenId, setTokenId] = useState('');
  const [searchTokenId, setSearchTokenId] = useState(''); // Separate state for the search input
  const [owner, setOwner] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const [isValidAccount, setIsValidAccount] = useState(true);  // Account validation state

  useEffect(() => {
    const setupProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const animeContract = new ethers.Contract(CONTRACT_ADDRESS, animeContractABI, signer);
        setContract(animeContract);

        try {
          // Request user's MetaMask account
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error fetching accounts:', error);
          alert('Error fetching accounts.');
        }
      } else {
        alert("Please install MetaMask to interact with this app.");
      }
    };

    setupProvider();
  }, []);

  // Check if the MetaMask account is still valid
  const handleAccountChange = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setAccount(accounts[0]);
    // Optionally validate if the account is the same as before
    setIsValidAccount(accounts[0] !== account);
     window.location.reload();
  };

  // Get Anime Details by Token ID
const getDetails = async () => {
  if (!tokenId) {
    alert('Please enter a valid Token ID');
    return;
  }

  try {
    const tokenIdNumber =  Number(searchTokenId); // Parse as BigInt
    if (isNaN(tokenIdNumber)) {
      alert('Invalid Token ID');
      return;
    }

    const [name, ownerAddress] = await contract.getDetails(tokenIdNumber);  // Pass tokenId as a number
    setOwner(ownerAddress);
    setAnimeDetails({ name, owner: ownerAddress });
    console.log("Anime Details: ", { name, ownerAddress });
  } catch (error) {
    console.error('Error fetching details:', error);
    alert('Failed to fetch anime details');
  }
};

 const mintAnime = async () => {
    if (!animeName) {
        alert('Please select an anime first');
        return;
    }

    try {
        console.log('Attempting to mint anime:', animeName);

        // Call the contract's mintAnime function
        const tx = await contract.mintAnime(animeName);
        console.log('Transaction sent:', tx);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();  // Wait for transaction confirmation
        console.log('Transaction confirmed:', receipt);

        // After minting, directly fetch the new tokenId by calling nextTokenId
        const newTokenId = await contract.nextTokenId();

        //TEMPORARY FIX, IN THE FUTURE FIX CONTRACT SO ACTUAL TOKEN ID IS RETRIEVED
        const actualTokenIDTemp =  Number(newTokenId) - 1;  // Convert BigInt to Number
        console.log("New Token ID after minting: ", actualTokenIDTemp.toString());

        // Show the new token ID to the user
        alert(`Anime NFT Minted! Your token ID is: ${actualTokenIDTemp.toString()}`);

        // Update the tokenId state to display it
        setTokenId(newTokenId.toString());

    } catch (error) {
        console.error('Error minting anime:', error);
        alert('Failed to mint NFT');
    }
};


  // Fetch random anime from Jikan API
  const fetchRandomAnime = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/random/anime?filter=sfw");
      const data = await response.json();
      const randomAnime = data.data;  // Get the random anime data
      setAnimeDetails({
        title: randomAnime.title,
        imageUrl: randomAnime.images.jpg.image_url,
        synopsis: randomAnime.synopsis,
      });
      setAnimeName(randomAnime.title);  // Set the random anime name for minting
    } catch (error) {
      console.error('Error fetching random anime:', error);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Jasper's Anime Store (powered by Jikan)</h1>

      <div>
        <h2>Connected Account</h2>
        <p>{account}</p>
        <button onClick={handleAccountChange}>Switch Account</button>
      </div>

      <div>
        <h2>Randomize Anime</h2>
        <button onClick={fetchRandomAnime}>Random Anime</button>
      </div>

      <div>
        <h2>Mint Anime NFT</h2>
        {animeDetails && (
          <div>
            <p>Anime Name: {animeDetails.title}</p>
            <img src={animeDetails.imageUrl} alt={animeDetails.title} style={{ width: '200px' }} />
            <p>{animeDetails.synopsis}</p>
          </div>
        )}
        <button onClick={mintAnime}>Mint Anime NFT</button>
      </div>

       <div>            
             <h2>Get Minted NFT Detail</h2>
        <input
          type="number"
          placeholder="Enter Token ID"
          value={searchTokenId || ''} // Controlled by separate state (searchTokenId)
          onChange={(e) => setSearchTokenId(e.target.value)} // Update only the searchTokenId state
        />
        <button onClick={getDetails}>Get Details</button>

        {animeDetails && owner && (
          <div>
            <p>Anime Title: {animeDetails.name}</p>
            <p>Owner Address: {owner}</p>
          </div>
            )}
          </div>
    </div>
  );
}

export default App;