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
