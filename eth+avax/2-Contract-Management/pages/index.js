import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/BurgerContracts.sol/BurgerContracts.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [burgerCount, setBurger] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const getBurgerCount = async() => {
  if (atm) {
    setBurger((await atm.getBurgerCount()).toNumber());
    }
  }

  const buyBOnly = async() => {
    if (atm) {
      let tx = await atm.buyBurger(1);
      await tx.wait()
      getBalance();
      getBurgerCount()
    }
  }

  const buyBCheese = async() => {
    if (atm) {
      let tx = await atm.buyBurger(2);
      await tx.wait()
      getBalance();
      getBurgerCount()
    }
  }

  const sellB = async() => {
    if (atm) {
      let tx = await atm.sellBurger(1);
      await tx.wait()
      getBalance();
      getBurgerCount();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }
    
    if (burgerCount == undefined) {
      getBurgerCount();
    }
    return (
      <div>
      <button onClick={() => {
          if (window.confirm('Are you sure you want to buy 1 Burger for 1 ETH?')) {
            buyBOnly();
            alert('You bought 1 Burger for 1 ETH!');
          }
        }}>
          Buy 1 Burger: 1 ETH
        </button>
        
        <button onClick={() => {
          if (window.confirm('Are you sure you want to buy 1 Burger with cheese for 2 ETH?')) {
            buyBCheese();
            alert('You bought 1 Burger with cheese for 2 ETH!');
          }
        }}>
          Buy 1 Burger with cheese: 2 ETH
        </button>
        
        <button onClick={() => {
          if (burgerCount <= 0) {
            alert('You have no burgers to sell!');
        } else if (window.confirm('Are you sure you want to sell 1 Burger for 1 ETH?')) {
            sellB();
            alert('You sold 1 Burger for 1 ETH!');
        }
        }}>
          Sell 1 Burger: 1 ETH
        </button>
        <h2>Your Balance: {balance}</h2>
        <h2>Your Burgers: {burgerCount}</h2>

      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Jasper's Burger Stand</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background: #ffd480;
        }
      `}
      </style>
    </main>
  )
}
