/* CREATED BY suROMAJIN
Assessment Requirements
1. Create a variable that can hold a number of NFT's. What type of variable might this be?
2. Create an object inside your mintNFT function that will hold the metadata for your NFTs. 
   The metadata values will be passed to the function as parameters. When the NFT is ready, 
   you will store it in the variable you created in step 1
3. Your listNFTs() function will print all of your NFTs metadata to the console (i.e. console.log("Name: " + someNFT.name))
4. For good measure, getTotalSupply() should return the number of NFT's you have created
*/

// Create an array to hold the NFTs
let nfts = [];

// This function will take in some values as parameters, 
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.
function mintNFT(name, description, image, price) {
  let nft = {
    name: name,
    description: description,
    image: image,
    price: price
  };
  nfts.push(nft);
}

// Create a loop that will go through the array of NFTs
// and print their metadata with console.log()
function listNFTs() {
  for (let i = 0; i < nfts.length; i++) {
    console.log("Name: " + nfts[i].name);
    console.log("Description: " + nfts[i].description);
    console.log("Image: " + nfts[i].image);
    console.log("Price: " + nfts[i].price);
    console.log("------------------------");
  }
}

// Print the total number of NFTs we have minted to the console
function getTotalSupply() {
  console.log("Total NFTs: " + nfts.length);
}

// Call your functions below this line
mintNFT("NFT_1", "A picture of a cat drawn in baroque style, sleeping under a la mesa", "tom.jpg", 100);
mintNFT("NFT_2", "A drawing of a mouse below a coffee table, slowly creeping up to something beyond the image...", "jerry.jpg", 200);
listNFTs();
getTotalSupply();
