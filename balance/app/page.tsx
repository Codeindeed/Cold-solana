"use client";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import * as Web3 from "@solana/web3.js";
export default function Home() {
  const [Address, setAddress] = useState("");
  const [Balance, SetBalance] = useState(0);

  const setValue = (e: { target: { value: SetStateAction<string> } }) => {
    setAddress(e.target.value);
    console.log("hey");
  };

  const getBalance = async (Address: string) => {
    try {
      const key = new Web3.PublicKey(Address);
      const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(key);
      SetBalance(balance);
    } catch (e) {
      SetBalance(0);
      setAddress("");
      alert(e);
    }
  };

  return (
    <VStack as="main" bg="grey" h="100vh" p={10}>
      <Flex w="50%" mt={"auto"} mb={"auto"} flexDirection="column" gap={10}>
        <Text fontSize={32} fontWeight={300} textAlign="center">
          Start Your Solana journey by checking your Balance
        </Text>
        <FormControl>
          <FormLabel>Input your wallet address</FormLabel>
          <Input
            type="email"
            w="100%"
            bg="white"
            value={Address}
            onChange={setValue}
          />
        </FormControl>
        <Box textAlign="center">
          <Button
            w="50%"
            colorScheme="blue"
            onClick={() => {
              getBalance(Address);
            }}
          >
            Check
          </Button>
          <Box m={6} pt={10} fontSize={28}>
            <Text>Addres:{Address}</Text>
            <Text>Balance:{Balance}</Text>
          </Box>
        </Box>
      </Flex>
    </VStack>
  );
}
