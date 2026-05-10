require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY", // ganti sesuai RPC
      accounts: ["0xPRIVATE_KEY_DEPLOYER"], // ganti private key deployer
    },
  },
};


require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
