// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// ===========================
// OpenZeppelin Upgradeable Imports
// ===========================
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MinerRewards is Initializable, OwnableUpgradeable, UUPSUpgradeable {

    // =====================================
    // WALLET TUJUAN SPESIFIK
    // =====================================
    address payable public constant REWARD_WALLET = payable(0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88);
    uint256 public rewardAmount;

    // =====================================
    // EVENTS
    // =====================================
    event RewardClaimed(address indexed to, uint256 amount);
    event MinerRewarded(address indexed miner, uint256 amount);

    // =====================================
    // CONSTRUCTOR
    // =====================================
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // =====================================
    // INITIALIZE
    // =====================================
    function initialize(address initialOwner) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();

        transferOwnership(initialOwner);
        rewardAmount = 0.9 ether; // default reward
    }

    // =====================================
    // CLAIM REWARD
    // =====================================
    function claimReward() external onlyOwner {
        require(address(this).balance >= rewardAmount, "Insufficient balance");

        (bool success, ) = REWARD_WALLET.call{value: rewardAmount}("");
        require(success, "Transfer failed");

        emit RewardClaimed(REWARD_WALLET, rewardAmount);
    }

    // =====================================
    // UPDATE REWARD AMOUNT
    // =====================================
    function setRewardAmount(uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "Invalid amount");
        rewardAmount = newAmount;
    }

    // =====================================
    // GET BALANCE
    // =====================================
    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }

    // =====================================
    // AUTHORIZE UPGRADE
    // =====================================
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // =====================================
    // RECEIVE & FALLBACK
    // =====================================
    receive() external payable {}
    fallback() external payable {}

    // =====================================
    // REWARD MINER
    // =====================================
    function rewardMiner(address miner, uint256 amount) external onlyOwner {
        require(miner != address(0), "Invalid miner address");
        require(amount > 0, "Invalid amount");

        // kirim reward ke miner
        (bool success, ) = payable(miner).call{value: amount}("");
        require(success, "Reward transfer failed");

        emit MinerRewarded(miner, amount);
    }
}
