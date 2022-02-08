const hre = require("hardhat")
const fs = require('fs')
const { log } = require("console")

async function main() {

  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  const NFTMarket = await ethers.getContractFactory("NFTMarket")
  const nftMarket = await NFTMarket.deploy()
  await nftMarket.deployed()
  console.log("nftMarket deployed to:", nftMarket.address)

  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy(nftMarket.address)
  await nft.deployed()
  console.log("nft deployed to:", nft.address)

  const DeezNutz = await ethers.getContractFactory("DeezNutzNFT")
  const deezNutz = await DeezNutz.deploy("DeezNutz NFT", "DNN", "https://deez-nutz.vercel.app/api/")
  await deezNutz.deployed()
  console.log("DeezNutz deployed to:", deezNutz.address)

  let config = `
  export const nftmarketaddress = "${nftMarket.address}"
  export const nftaddress = "${nft.address}"
  export const deeznutzaddress = "${deezNutz.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
