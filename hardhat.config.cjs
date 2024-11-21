// import 'hardhat-deploy';
// import '@layerzerolabs/devtools-evm-hardhat';

require("@nomiclabs/hardhat-ethers");  // or any other plugin you're using
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.20",  // Specify the Solidity version or other configurations
  networks: {
    harmony: {
      url: 'https://api.s0.t.hmny.io'
    }
  },
  // Other Hardhat config options...
};
