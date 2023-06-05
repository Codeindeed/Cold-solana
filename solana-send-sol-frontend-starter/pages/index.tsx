import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import { SendSolForm } from "../components/SendSolForm";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as WalletAdapterwallets from "@solana/wallet-adapter-wallets";
import * as web3 from "@solana/web3.js";
import Head from "next/head";
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = (props) => {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = [
    new WalletAdapterwallets.PhantomWalletAdapter(),
    new WalletAdapterwallets.GlowWalletAdapter(),
  ];
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <AppBar />
            <div className={styles.AppBody}>
              <SendSolForm />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default Home;
