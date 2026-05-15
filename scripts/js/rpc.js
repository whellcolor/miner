// ======================================================
// MULTI RPC + MULTI FAUCET + NFT SYSTEM WCC
// ======================================================

// =======================
// ALL RPC URL
// =======================

const RPC_LIST = [

{
name:"Ethereum Mainnet",
url:"https://mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Sepolia",
url:"https://sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Hoodi",
url:"https://hoodi.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Linea Sepolia",
url:"https://linea-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Linea Mainnet",
url:"https://linea-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Polygon Amoy",
url:"https://polygon-amoy.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Polygon Mainnet",
url:"https://polygon-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Base Sepolia",
url:"https://base-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Blast Sepolia",
url:"https://blast-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Optimism Mainnet",
url:"https://optimism-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Arbitrum Sepolia",
url:"https://arbitrum-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Palm Mainnet",
url:"https://palm-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Avalanche Fuji",
url:"https://avalanche-fuji.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Starknet Sepolia",
url:"https://starknet-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Celo Sepolia",
url:"https://celo-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"BSC Mainnet",
url:"https://bsc-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Hemi Mainnet",
url:"https://hemi-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Mantle Mainnet",
url:"https://mantle-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Scroll Sepolia",
url:"https://scroll-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"OpBNB Mainnet",
url:"https://opbnb-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Monad Testnet",
url:"https://monad-testnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Solana Devnet",
url:"https://solana-devnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Solana Mainnet",
url:"https://solana-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Unichain Mainnet",
url:"https://unichain-mainnet.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
},

{
name:"Unichain Sepolia",
url:"https://unichain-sepolia.infura.io/v3/418d1e12e6e4490fa5ed80a4b3b8ae8a"
}

];

// =======================
// GLOBAL
// =======================

let provider;
let signer;

const faucetAddress =
"0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88";

const nftAddress =
"0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88";

// =======================
// ABI
// =======================

const faucetAbi = [

"function requestTokens()"

];

const nftAbi = [

"function mint(address to,string uri)"

];

// =======================
// LOAD RPC TO SELECT
// =======================

function loadRPCs(){

const select =
document.getElementById("rpcSelector");

select.innerHTML = "";

RPC_LIST.forEach((rpc,index)=>{

const option =
document.createElement("option");

option.value = rpc.url;

option.innerHTML =
rpc.name;

select.appendChild(option);

});

}

// =======================
// TEST RPC
// =======================

async function checkRPC(){

const rpc =
document.getElementById(
"rpcSelector"
).value;

try{

const rpcProvider =
new ethers.JsonRpcProvider(rpc);

const block =
await rpcProvider.getBlockNumber();

document.getElementById(
"rpcStatus"
).innerHTML =

`
✅ RPC ACTIVE <br><br>
${rpc}
<br><br>
BLOCK : ${block}
`;

console.log(
"RPC ACTIVE:",
block
);

}catch(err){

console.log(err);

document.getElementById(
"rpcStatus"
).innerHTML =

`
❌ RPC FAILED
<br><br>
${err.message}
`;

}

}

// =======================
// AUTO TEST ALL RPC
// =======================

async function checkAllRPCs(){

for(let i=0;i<RPC_LIST.length;i++){

const rpc = RPC_LIST[i];

try{

const provider =
new ethers.JsonRpcProvider(
rpc.url
);

const block =
await provider.getBlockNumber();

console.log(
"✅",
rpc.name,
block
);

}catch(err){

console.log(
"❌",
rpc.name
);

}

}

}

// =======================
// CONNECT WALLET
// =======================

async function connectWallet(){

if(!window.ethereum){

alert(
"Install MetaMask"
);

return;

}

try{

provider =
new ethers.BrowserProvider(
window.ethereum
);

await provider.send(
"eth_requestAccounts",
[]
);

signer =
await provider.getSigner();

const address =
await signer.getAddress();

alert(
"Wallet Connected :\n\n" +
address
);

document.getElementById(
"rpcStatus"
).innerHTML =

`
✅ WALLET CONNECTED
<br><br>
${address}
`;

}catch(err){

console.log(err);

alert(
"Wallet Failed"
);

}

}

// =======================
// SEND TRANSACTION
// =======================

async function sendTx(){

if(!signer){

alert(
"Connect wallet first"
);

return;

}

try{

const tx =
await signer.sendTransaction({

to:
"0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",

value:
ethers.parseEther(
"0.0001"
)

});

await tx.wait();

alert(
"Transaction Success ✅"
);

}catch(err){

console.log(err);

alert(
"Transaction Failed ❌"
);

}

}

// =======================
// REQUEST FAUCET
// =======================

async function requestFaucet(){

if(!signer){

alert(
"Connect wallet first"
);

return;

}

try{

const faucet =
new ethers.Contract(

faucetAddress,

faucetAbi,

signer

);

const tx =
await faucet.requestTokens();

await tx.wait();

alert(
"Faucet Success ✅"
);

}catch(err){

console.log(err);

alert(
"Faucet Failed ❌"
);

}

}

// =======================
// MINT NFT
// =======================

async function mintNFT(){

if(!signer){

alert(
"Connect wallet first"
);

return;

}

try{

const nft =
new ethers.Contract(

nftAddress,

nftAbi,

signer

);

const tx =
await nft.mint(

await signer.getAddress(),

"ipfs://metadata.json"

);

await tx.wait();

alert(
"NFT Minted ✅"
);

}catch(err){

console.log(err);

alert(
"Mint NFT Failed ❌"
);

}

}

// =======================
// AUTO LOAD
// =======================

window.addEventListener(
"load",
()=>{

loadRPCs();

checkAllRPCs();

}
);
