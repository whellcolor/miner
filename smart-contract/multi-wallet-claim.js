import { ethers } from "ethers";

// ======================
// RPC LIST (multi chain)
// ======================
const RPCS = [
  "https://mainnet.infura.io/v3/YOUR_KEY",
  "https://sepolia.infura.io/v3/YOUR_KEY",
  "https://polygon-mainnet.infura.io/v3/YOUR_KEY"
];

// ======================
// SMART CONTRACT ADDRESS
// ======================
const CONTRACT_ADDRESS = "0xYourContractAddressHere";

// ======================
// MINIMAL ABI
// ======================
const ABI = [
  "function claimGas() external",
  "function roles(address) view returns (uint8)",
  "function registered(address) view returns (bool)"
];

// ======================
// WALLET LIST (PRIVATE KEY)
// ======================
// ⚠️ isi private key wallet kamu di sini
const PRIVATE_KEYS = [
  "0xPRIVATE_KEY_1",
  "0xPRIVATE_KEY_2",
  "0xPRIVATE_KEY_3"
];

// ======================
// PICK RPC RANDOM (LOAD BALANCE)
// ======================
function getProvider() {
  const rpc = RPCS[Math.floor(Math.random() * RPCS.length)];
  return new ethers.JsonRpcProvider(rpc);
}

// ======================
// MAIN FUNCTION
// ======================
async function run() {
  console.log("=== MULTI WALLET CLAIM START ===");

  for (let i = 0; i < PRIVATE_KEYS.length; i++) {

    try {
      const provider = getProvider();
      const wallet = new ethers.Wallet(PRIVATE_KEYS[i], provider);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        wallet
      );

      console.log(`\nWallet #${i + 1}`);
      console.log("Address:", wallet.address);

      const balance = await provider.getBalance(wallet.address);
      console.log("Balance:", ethers.formatEther(balance), "ETH");

      // ======================
      // CHECK REGISTERED
      // ======================
      const isRegistered = await contract.registered(wallet.address);

      if (!isRegistered) {
        console.log("❌ Not registered, skip");
        continue;
      }

      // ======================
      // CLAIM GAS
      // ======================
      const tx = await contract.claimGas();
      console.log("⛽ Claim TX:", tx.hash);

      await tx.wait();
      console.log("✅ Claim success");

    } catch (err) {
      console.log("❌ Error:", err.message);
    }
  }

  console.log("\n=== DONE ===");
}

// RUN
run();
