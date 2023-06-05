import { FC, useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
export const SendSolForm: FC = () => {
  const [balance, setBAlance] = useState(0);
  const [reciever, setReciever] = useState("");
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  useEffect(() => {
    if (!publicKey || !connection) {
      return;
    }
    connection.getBalance(publicKey).then((balance) => {
      setBAlance(balance / web3.LAMPORTS_PER_SOL);
    });
  }, [connection, publicKey]);
  const setrecieve = (e) => {
    e.preventDefault();
    setReciever((prev) => (prev = e.target.value));
  };
  const transferAmount = (e) => {
    e.preventDefault();
    setAmount((prev) => (prev = e.target.value));
  };
  const sendSol = (e) => {
    e.preventDefault();
    if (!reciever || amount < 0) {
      return;
    }
    const transactions = new web3.Transaction();
    const recievers = new web3.PublicKey(reciever);
    const instruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recievers,
      lamports: web3.LAMPORTS_PER_SOL * amount,
    });
    transactions.add(instruction);
    sendTransaction(transactions, connection);
    setBAlance(0);
    console.log(recievers);
  };

  return (
    <div>
      <p>Balance:{balance}</p>
      <form onSubmit={sendSol} className={styles.form}>
        <label htmlFor="amount">Amount (in SOL) to send:</label>
        <input
          id="amount"
          type="text"
          className={styles.formField}
          placeholder="e.g. 0.1"
          required
          onChange={transferAmount}
        />
        <br />
        <label htmlFor="recipient">Send SOL to:</label>
        <input
          id="recipient"
          type="text"
          className={styles.formField}
          placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
          onChange={setrecieve}
          required
        />
        <button type="submit" className={styles.formButton} onSubmit={sendSol}>
          Send
        </button>
      </form>
    </div>
  );
};
