import { ethers, run } from "hardhat";

import { TokenNFT__factory, Token__factory } from "../typechain-types";

async function main() {
  const [signer] = await ethers.getSigners();

  const Token = await new Token__factory(signer).deploy();

  await Token.deployed();

  console.log("Token deployed to:", Token.address);

  const NFT = await new TokenNFT__factory(signer).deploy();

  await NFT.deployed();

  console.log("TokenNFT deployed to:", NFT.address);

  await NFT.safeMint(
    signer.address,
    "https://bafybeid2iuyhqr4uxrtkyqw3x4n7ynhuteasbe4doywijmtb4qmk7bxsmm.ipfs.nftstorage.link/1.png"
  );

  await run("verify:verify", {
    address: Token.address,
    contract: "contracts/Token.sol:Token",
  });

  await run("verify:verify", {
    address: NFT.address,
    contract: "contracts/NFT.sol:TokenNFT",
  });
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
