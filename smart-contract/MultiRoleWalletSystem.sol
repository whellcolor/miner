// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiRoleWalletSystem {

    address public owner;

    uint256 public constant CLAIM_AMOUNT = 0.09 ether;

    enum Role { NONE, ADMIN, CONTRACTOR, HOLDER }

    mapping(address => Role) public roles;
    mapping(address => bool) public registered;

    address[] public wallets;

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }

    modifier onlyAdminOrOwner() {
        require(
            msg.sender == owner || roles[msg.sender] == Role.ADMIN,
            "NOT_ADMIN"
        );
        _;
    }

    constructor() {
        owner = 0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88;

        _add(Role.ADMIN, owner);

        _add(Role.ADMIN, 0x32ed98666663Fc8Dc7264BaF3fC1a3Ac4BFAE24B);
        _add(Role.ADMIN, 0x7D4B0583DB9c1bb69F481e241DdAa5943Bad7763);
        _add(Role.ADMIN, 0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00);
        _add(Role.CONTRACTOR, 0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb);
        _add(Role.HOLDER, 0x579a78B234E9b26922ce7a7fFb6d1aacd65db5bc);
        _add(Role.HOLDER, 0x0164FE4636d4E6485eE414A467740ba301B4811D);
        _add(Role.ADMIN, 0x69e21CfA3f4250096Ec98eF3690bF70b784B10f8);
        _add(Role.ADMIN, 0x0B1D1772d04648aABF617eD026778B272cc40f64);
        _add(Role.ADMIN, 0xC7E94F0257d066ce7B4CA52C2FdA33d7f01c38Ab);
        _add(Role.CONTRACTOR, 0x27eC563CF862452b3313Dc1E8662a1B609b147cd);
        _add(Role.CONTRACTOR, 0x171b9f078bc82f8be12c94a4de09cbe3051b1ea7);
    }

    // =========================
    // INTERNAL ADD (NO DUPLICATE)
    // =========================
    function _add(Role role, address wallet) internal {
        require(wallet != address(0), "ZERO_ADDR");

        if (!registered[wallet]) {
            registered[wallet] = true;
            wallets.push(wallet);
        }

        roles[wallet] = role;
    }

    // =========================
    // OWNER ADD WALLET
    // =========================
    function addWallet(Role role, address wallet) external onlyOwner {
        _add(role, wallet);
    }

    // =========================
    // VIEW ALL WALLETS
    // =========================
    function getWallets() external view returns (address[] memory) {
        return wallets;
    }

    // =========================
    // CLAIM GAS SYSTEM (0.09)
    // =========================
    function claimGas() external {
        require(
            roles[msg.sender] != Role.NONE,
            "NOT_REGISTERED"
        );

        require(
            address(this).balance >= CLAIM_AMOUNT,
            "INSUFFICIENT_BALANCE"
        );

        payable(msg.sender).transfer(CLAIM_AMOUNT);
    }

    // =========================
    // FUND CONTRACT
    // =========================
    receive() external payable {}

    // =========================
    // EMERGENCY WITHDRAW (OWNER)
    // =========================
    function withdrawAll() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
