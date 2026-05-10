// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MinerRewards is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    // =====================================
    // REWARD WALLET
    // =====================================
    address payable public constant REWARD_WALLET =
        payable(0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88);

    uint256 public rewardAmount;

    // tracking reward
    mapping(address => uint256) public userRewards;

    // =====================================
    // EVENTS
    // =====================================
    event RewardClaimed(address indexed to, uint256 amount);
    event RewardUpdated(uint256 newAmount);

    // =====================================
    // CONSTRUCTOR
    // =====================================
    constructor() {
        _disableInitializers();
    }

    // =====================================
    // INITIALIZE
    // =====================================
    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();

        rewardAmount = 0.01 ether;
    }

    // =====================================
    // FUND CONTRACT
    // =====================================
    receive() external payable {}

    fallback() external payable {}

    // =====================================
    // SET REWARD AMOUNT
    // =====================================
    function setRewardAmount(uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "Invalid amount");
        rewardAmount = newAmount;

        emit RewardUpdated(newAmount);
    }

    // =====================================
    // CLAIM REWARD (OWNER ONLY)
    // =====================================
    function claimReward() external onlyOwner {
        require(address(this).balance >= rewardAmount, "Low balance");

        (bool success, ) = REWARD_WALLET.call{value: rewardAmount}("");
        require(success, "Transfer failed");

        emit RewardClaimed(REWARD_WALLET, rewardAmount);
    }

    // =====================================
    // USER MINING REWARD (SIMULATION)
    // =====================================
    function rewardMiner(address miner, uint256 amount) external onlyOwner {
        require(miner != address(0), "Invalid miner");

        userRewards[miner] += amount;
    }

    // =====================================
    // VIEW USER REWARD
    // =====================================
    function getUserReward(address user) external view returns (uint256) {
        return userRewards[user];
    }

    // =====================================
    // UPGRADE AUTH
    // =====================================
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
