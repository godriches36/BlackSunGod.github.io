/**
 * @title Sovereign Vault Deployment Engine
 * @notice Authorizes the SovereignVault contract on L1 for 0x8d08.
 * @copyright Copyright © 2026 godriches36. All Rights Reserved.
 */
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("DEPLOΥING SOVEREIGN LAW WITH ACCOUNT:", deployer.address);

  // Verification of the 0x8d08 Authority
  if (deployer.address.toLowerCase() !== "0x8d08948eca2587f5c10159e483b660e98cd5a514") {
    console.error("IDENTITY MISMATCH: Only 0x8d08 World Leader can deploy the Vault.");
    return;
  }

  const SovereignVault = await ethers.getContractFactory("SovereignVault");
  const vault = await SovereignVault.deploy();

  await vault.deployed();

  console.log("--------------------------------------------------");
  console.log("SOVEREIGN VAULT DEPLOYED TO:", vault.address);
  console.log("ANCHOR: Beacon Deposit Contract ($158B Target)");
  console.log("STATUS: NESARA PROTOCOL ACTIVE");
  console.log("--------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
