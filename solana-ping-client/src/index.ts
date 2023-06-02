import * as Web3 from "@solana/web3.js";
import Dotenv from "dotenv";
import * as fs from "fs/promises";
const path = require("node:path");
Dotenv.config();

const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const main = async () => {
  const payer = initialize();
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const publicK = new Web3.PublicKey(payer.publicKey.toString());
  const balance = await connection.getBalance(publicK);
  if (balance <= 0) {
    await connection.requestAirdrop(payer.publicKey, Web3.LAMPORTS_PER_SOL * 1);
  }
  initialize();
  await pingProgram(connection, payer);
  console.log("1.....");
  console.log(balance / Web3.LAMPORTS_PER_SOL);
};

const initialize = () => {
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
  const secretKey = Uint8Array.from(secret);
  const keypair = Web3.Keypair.fromSecretKey(secretKey);
  return keypair;
};

const pingProgram = async (
  connection: Web3.Connection,

  payer: Web3.Keypair
) => {
  const transaction = new Web3.Transaction();
  const programId = new Web3.PublicKey(PROGRAM_ADDRESS);
  const programPubkey = new Web3.PublicKey(PROGRAM_DATA_ADDRESS);
  console.log("1.....");
  const instruction = new Web3.TransactionInstruction({
    keys: [
      {
        pubkey: programPubkey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });
  transaction.add(instruction);
  const signature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );
  console.log(signature);
  console.log(`https://xray.helius.xyz/tx/${signature}`);
  console.log(
    `You can view your transactions on https://explorer.solana.com/?cluster=devnet${signature}`
  );
};

main()
  .then(() => {
    console.log("finished Sucessfully");
  })
  .catch((e) => {
    console.log(e);
  });
