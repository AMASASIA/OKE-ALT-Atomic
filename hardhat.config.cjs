const dotenv = require("dotenv");
dotenv.config();

require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";


module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      chainId: 11155111,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};