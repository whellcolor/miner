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
