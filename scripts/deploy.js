const hre = require("hardhat");

async function main() {

  const wallets = [
    "0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",
    "0x32ed98666663Fc8Dc7264BaF3fC1a3Ac4BFAE24B",
    "0x7D4B0583DB9c1bb69F481e241DdAa5943Bad7763",
    "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00",
    "0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb",
    "0x579a78B234E9b26922ce7a7fFb6d1aacd65db5bc",
    "0x0164FE4636d4E6485eE414A467740ba301B4811D",
    "0x69e21CfA3f4250096Ec98eF3690bF70b784B10f8",
    "0x0B1D1772d04648aABF617eD026778B272cc40f64",
    "0xC7E94F0257d066ce7B4CA52C2FdA33d7f01c38Ab",
    "0x27eC563CF862452b3313Dc1E8662a1B609b147cd",
    "0x171b9f078bc82f8be12c94a4de09cbe3051b1ea7"
  ];

  const Contract = await hre.ethers.getContractFactory("MultiRoleWalletSystem");

  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());

  // add wallets after deploy
  for (let i = 0; i < wallets.length; i++) {
    const tx = await contract.addWallet(1, wallets[i]); // 1 = ADMIN role
    await tx.wait();
    console.log("Added:", wallets[i]);
  }

  console.log("ALL WALLETS REGISTERED");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Ambil signer / deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy Upgradeable Contract
  const MinerRewards = await ethers.getContractFactory("MinerRewards");
  const minerRewards = await upgrades.deployProxy(
    MinerRewards,
    [deployer.address], // initialize() param: initialOwner
    { initializer: "initialize" }
  );

  await minerRewards.deployed();

  console.log("MinerRewards deployed to:", minerRewards.address);
  console.log("Reward amount:", (await minerRewards.rewardAmount()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// multi-rpc.js
import { ethers } from "ethers";

const RPCS = {
  ethereum: {
    mainnet: "https://mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
    sepolia: "https://sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  linea: {
    mainnet: "https://linea-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
    sepolia: "https://linea-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  polygon: {
    mainnet: "https://polygon-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
    amoy: "https://polygon-amoy.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  base: {
    sepolia: "https://base-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  arbitrum: {
    sepolia: "https://arbitrum-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  optimism: {
    mainnet: "https://optimism-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  avalanche: {
    fuji: "https://avalanche-fuji.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  bsc: {
    mainnet: "https://bsc-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  mantle: {
    mainnet: "https://mantle-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  opbnb: {
    mainnet: "https://opbnb-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  scroll: {
    sepolia: "https://scroll-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  celo: {
    sepolia: "https://celo-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  blast: {
    sepolia: "https://blast-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  monad: {
    testnet: "https://monad-testnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },

  unichain: {
    mainnet: "https://unichain-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
    sepolia: "https://unichain-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a",
  },
};

// ambil provider
export function getProvider(chain, network) {
  return new ethers.JsonRpcProvider(
    RPCS[chain][network]
  );
}

// contoh cek block terbaru
async function checkBlock() {
  const provider = getProvider("ethereum", "sepolia");

  const block = await provider.getBlockNumber();

  console.log("Latest Block:", block);
}

checkBlock();
