require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const RewardClaimer = await hre.ethers.getContractFactory("RewardClaimer");
  
  // rewardAmount 0.9 ETH
  const rewardAmount = hre.ethers.parseEther("0.9");

  const rewardClaimer = await RewardClaimer.deploy(rewardAmount);
  await rewardClaimer.deployed();

  console.log("RewardClaimer deployed to:", rewardClaimer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
