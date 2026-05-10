# 🌐 WEB3 Miner Dashboard

![Web3 Miner Badge](https://img.shields.io/badge/Web3-Miner-blue?style=flat-square)
![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

Dashboard ini adalah sistem **simulasi mining Web3** dengan integrasi smart contract reward, self-hosted GitHub Actions runner, dan Web3 wallet connection. Sistem ini dirancang untuk **testing, learning, atau token reward simulation**, bukan mining cryptocurrency nyata.

---

## 🔹 Fitur Utama

- Dashboard real-time: hash rate, mining timer, total earnings
- Wallet connection: MetaMask, Trust Wallet, ThirdWeb
- Claim reward dan mint NFT
- RPC status check dan latest block tracking
- Smart contract reward (upgradeable)
- Mining simulation engine (Node.js)
- GitHub Actions self-hosted runner

---

## 📂 Struktur Proyek

```

.
├── index.html                 # Dashboard Web3 + UI miner
├── mining-engine/
│   ├── package.json
│   └── mining.js              # Node.js mining engine
├── smart-contract/
│   └── MinerRewards.sol       # Smart contract reward upgradeable
└── .github/
└── workflows/
└── miner.yml          # GitHub Actions workflow

````

---

## ⚙️ Prerequisites

- Node.js >= 18
- NPM / Yarn
- VPS / Linux untuk self-hosted runner
- MetaMask / Web3 wallet untuk testing dashboard
- GitHub account untuk Actions
- Basic knowledge Solidity & Web3

---

## 🚀 Setup Self-Hosted Runner

1. **Buat folder runner**

```bash
mkdir actions-runner && cd actions-runner
````

2. **Download runner package**

```bash
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v2.334.0/actions-runner-linux-x64-2.334.0.tar.gz
tar xzf actions-runner-linux-x64.tar.gz
```

3. **Konfigurasi runner**

Ambil **token GitHub**:
`Repo Settings → Actions → Runners → New self-hosted runner`

```bash
./config.sh --url https://github.com/<USERNAME>/<REPO> --token YOUR_TOKEN
```

4. **Jalankan runner**

```bash
./run.sh
```

> Runner akan mendengarkan GitHub Actions jobs untuk project ini.

---

## 🧱 Deploy Smart Contract

1. Buka folder `smart-contract/`
2. Compile dan deploy `MinerRewards.sol` menggunakan:

   * [Remix IDE](https://remix.ethereum.org)
   * Atau Hardhat (`npx hardhat compile` + `npx hardhat run scripts/deploy.js --network <network>`)
3. Catat **Contract Address** untuk digunakan di dashboard
4. Atur reward amount sesuai kebutuhan (`0.9 ETH` default)

---

## ⚡ Mining Engine (Node.js)

1. Masuk ke folder `mining-engine/`:

```bash
cd mining-engine
npm install
```

2. Edit `mining.js`:

* Ganti `PRIVATE_KEY_VPS_KAMU` dengan private key owner
* Ganti `0xYourContractAddress` dengan smart contract address
* Ganti `0xUserWallet` dengan wallet target (bisa dari dashboard input)

3. Jalankan mining engine:

```bash
node mining.js
```

Mining engine akan mensimulasikan hash rate dan mengirim reward ke smart contract secara otomatis.

---

## 🧪 GitHub Actions Workflow

File: `.github/workflows/miner.yml`

```yaml
name: Miner Engine

on:
  push:
  workflow_dispatch:

jobs:
  run-miner:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - name: Run Mining Engine
        run: |
          cd mining-engine
          node mining.js
```

> Runner self-hosted akan mengeksekusi `mining.js` otomatis saat workflow jalan.

---

## 🌐 Dashboard Web3

Buka `index.html` di browser:

1. Hubungkan wallet MetaMask / Trust Wallet
2. Mulai mining simulasi
3. Lihat hash rate, timer, total earnings
4. Claim reward dan mint NFT

**Screenshot Dashboard:**

![Dashboard Placeholder](./screenshots/dashboard.png)

---

## 📡 RPC & Status

* Cek RPC aktif dan block terbaru
* Dashboard menampilkan status mining dan reward
* Bisa switch network untuk testnet (Holesky / Sepolia / Goerli)

---

## ⚠️ Catatan Penting

* Ini **simulasi mining** dan **token reward internal**, bukan mining cryptocurrency nyata.
* Private key bersifat sensitif → jangan share ke publik.
* Uji dulu smart contract di testnet sebelum deploy ke mainnet.
* Reward amount dan wallet tujuan dapat diatur melalui smart contract.

---

## 🏗️ Next Upgrade

* ERC-20 token integration
* Auto payout system
* Staking & leaderboard
* WebSocket live dashboard
* Anti-bot mining protection

---

## 📄 License

MIT License

```

---

Kalau kamu mau, aku bisa buatkan juga **versi README.md yang sudah termasuk gambar dashboard nyata, flowchart mining engine, dan GitHub Actions workflow diagram** supaya repo langsung kelihatan **profesional dan siap investor / developer**.  

Apakah mau aku buatkan versi itu juga?
```
