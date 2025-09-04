import { ethers } from "hardhat";

/**
 * Deploys OkeNFT, OkeSBT, and Minter; then grants MINTER_ROLEs to Minter.
 * Solidity ^0.8.20 / ethers v6 / Hardhat TS
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  // ---- 1) ERC-6551 addresses (必要に応じて差し替え) ----
  const ERC6551_REGISTRY_ADDRESS = "0x000000006551c19487814612e58FE06813775758";
  const ERC6551_IMPLEMENTATION_ADDRESS =
    "0x5126D4c4f332477655B519695a4152759234B137";

  // ---- 2) Deploy OkeNFT ----
  const OkeNFT = await ethers.getContractFactory("OkeNFT");
  const okeNFT = await OkeNFT.deploy(
    "Oke NFT",
    "OKE",
    deployer.address, // admin
    ERC6551_REGISTRY_ADDRESS,
    ERC6551_IMPLEMENTATION_ADDRESS
  );
  await okeNFT.waitForDeployment();
  const okeNFTAddress = await okeNFT.getAddress();
  console.log(`✅ OkeNFT deployed: ${okeNFTAddress}`);

  // ---- 3) Deploy OkeSBT ----
  const OkeSBT = await ethers.getContractFactory("OkeSBT");
  const okeSBT = await OkeSBT.deploy(deployer.address); // admin
  await okeSBT.waitForDeployment();
  const okeSBTAddress = await okeSBT.getAddress();
  console.log(`✅ OkeSBT deployed: ${okeSBTAddress}`);

  // ---- 4) Deploy Minter ----
  const Minter = await ethers.getContractFactory("Minter");
  const mintFee = ethers.parseEther("0.01");
  const minter = await Minter.deploy(
    okeNFTAddress,
    okeSBTAddress,
    deployer.address, // admin
    deployer.address, // fee recipient
    mintFee
  );
  await minter.waitForDeployment();
  const minterAddress = await minter.getAddress();
  console.log(`✅ Minter deployed: ${minterAddress}`);

  // ---- 5) Grant roles ----
  console.log("\nGranting roles…");
  const nftMinterRole = await okeNFT.MINTER_ROLE();
  const sbtMinterRole = await okeSBT.MINTER_ROLE();

  await (await okeNFT.grantRole(nftMinterRole, minterAddress)).wait();
  console.log("✅ OkeNFT: MINTER_ROLE -> Minter");

  await (await okeSBT.grantRole(sbtMinterRole, minterAddress)).wait();
  console.log("✅ OkeSBT: MINTER_ROLE -> Minter");

  console.log("\n🚀 Done");
  console.log("----------------------------------------");
  console.log("OkeNFT:", okeNFTAddress);
  console.log("OkeSBT:", okeSBTAddress);
  console.log("Minter:", minterAddress);
  console.log("----------------------------------------");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
