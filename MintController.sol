// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// --- Interfaces for the contracts this controller manages ---
interface IOkeNFT {
    function mint(address to, uint256 tokenId, string memory tokenURI) external;
    function getTBAAddress(uint256 nftId) external view returns (address);
}

interface IOkeSBT {
    function mint(address to, uint256 tokenId) external;
}

/**
 * @title MintController
 * @dev Orchestrates the atomic minting of an NFT and a corresponding SBT.
 * This contract handles minting logic, fees, and access control, acting as the
 * central engine for the application. It is designed to be secure and upgradeable.
 */
contract MintController is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // --- State Variables ---
    IOkeNFT public immutable okeNFT;
    IOkeSBT public immutable okeSBT;

    uint256 public mintFee;
    address payable public feeRecipient;
    uint256 private s_nextTokenId;

    // --- Custom Errors ---
    error InvalidFee();
    error AddressZero();
    error UnauthorizedMinter(address caller);

    // --- Events ---
    event TokenPairMinted(
        address indexed minter,
        uint256 indexed nftId,
        uint256 sbtId,
        address tbaAddress
    );
    event FeeUpdated(uint256 newFee);
    event FeeRecipientUpdated(address newRecipient);

    constructor(
        address _okeNFTAddress,
        address _okeSBTAddress,
        address _admin,
        address _feeRecipient,
        uint256 _initialFee
    ) {
        if (_admin == address(0) || _feeRecipient == address(0)) revert AddressZero();
        
        okeNFT = IOkeNFT(_okeNFTAddress);
        okeSBT = IOkeSBT(_okeSBTAddress);

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(ADMIN_ROLE, _admin);
        _grantRole(MINTER_ROLE, _admin); // Admin can also mint by default

        mintFee = _initialFee;
        feeRecipient = payable(_feeRecipient);
    }

    function mint(string memory tokenURI) external payable nonReentrant {
        if (!hasRole(MINTER_ROLE, msg.sender)) {
            revert UnauthorizedMinter(msg.sender);
        }
        if (msg.value != mintFee) {
            revert InvalidFee();
        }

        uint256 nftId = s_nextTokenId++;
        uint256 sbtId = s_nextTokenId++;

        // 1. Mint the transferable NFT
        okeNFT.mint(msg.sender, nftId, tokenURI);

        // 2. Mint the non-transferable SBT
        okeSBT.mint(msg.sender, sbtId);

        // 3. Get the computed TBA address from the NFT contract
        address tbaAddress = okeNFT.getTBAAddress(nftId);

        emit TokenPairMinted(msg.sender, nftId, sbtId, tbaAddress);
    }

    function withdrawFees() external {
        (bool success, ) = feeRecipient.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function setMintFee(uint256 _newFee) external onlyRole(ADMIN_ROLE) {
        mintFee = _newFee;
        emit FeeUpdated(_newFee);
    }

    function setFeeRecipient(address _newRecipient) external onlyRole(ADMIN_ROLE) {
        if (_newRecipient == address(0)) revert AddressZero();
        feeRecipient = payable(_newRecipient);
        emit FeeRecipientUpdated(_newRecipient);
    }
}