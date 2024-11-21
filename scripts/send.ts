const { ethers } = require("hardhat");
const { addressToBytes32 } = require("@layerzerolabs/lz-v2-utilities");
const { EndpointId } = require("@layerzerolabs/lz-definitions");
const { Options } = require("@layerzerolabs/lz-v2-utilities");

async function main() {
  const privateKey = "";
  
  // Create a signer from the private key
  const signer = new ethers.Wallet(privateKey, ethers.provider);

  const network = await ethers.provider.getNetwork();
  console.log("Network Name:", network.name); // e.g., 'hardhat', 'rinkeby', 'mainnet', etc.
  console.log("Network Chain ID:", network.chainId);
  
  console.log("Signer address:", signer.address);
  const contractAddress = '0x1D6ba2d7eaaA4f4c13Df0E87A62763B481Ac72d2';
  const destinationAddress = '0x89F23E9850617E6268CD3d4c8a24D043201333F8';
  const destinationEid = EndpointId.BASE_V2_MAINNET; // Replace with appropriate value

  const oftContract = await ethers.getContractAt('WageOFTAdapter', contractAddress, signer);
  const decimals = await oftContract.sharedDecimals();
  const amount = ethers.utils.parseUnits('1', "18");

  console.log(amount, destinationEid)

  let options = Options.newOptions().addExecutorLzReceiveOption(65000, 0).toBytes();

  const sendParam = {
    dstEid: destinationEid,
    to: addressToBytes32(destinationAddress),
    amountLD: amount,
    minAmountLD: amount,
    extraOptions: options,
    composeMsg: ethers.utils.arrayify('0x'),
    oftCmd: ethers.utils.arrayify('0x'),
  };

  const feeQuote = await oftContract.quoteSend(sendParam, false);
  const nativeFee = feeQuote.nativeFee;
  console.log(nativeFee)

  console.log(`Sending tokens to network ${destinationEid}`);

  // const tx = await oftContract.send(sendParam, { nativeFee: nativeFee, lzTokenFee: 0 }, signer.address, {
  //   value: nativeFee,
  // });
  // console.log(`Transaction initiated: https://layerzeroscan.com/tx/${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
