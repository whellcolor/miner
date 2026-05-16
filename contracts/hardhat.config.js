require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  networks: {

    hardhat: {},

    sepolia: {
      url: RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },

    mainnet: {
      url: RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },

    polygon: {
      url: RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};
