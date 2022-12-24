import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider);
      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install Metamask");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.web3 && getAccount();
    web3Api.contract && loadBalance();
  }, [web3Api]);

  const addFunds = useCallback(async () => {
    const { contract } = web3Api;
    await contract.addFunds({
      from: account,
      value: Web3.utils.toWei("1", "ether"),
    });
  }, [account, web3Api]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex">
            <span className="mr-2">
              <strong>Account:</strong>
            </span>
            {account ? (
              <h1>{account}</h1>
            ) : (
              <button
                className="button is-small"
                onClick={() => {
                  web3Api.provider.request({ method: "eth_requestAccounts" });
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="balance-view is-size-2 mb-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button onClick={addFunds} className="button mr-2 is-link">
            Donate 1eth
          </button>
          <button className="button is-primary">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
