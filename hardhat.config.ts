import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_MAINNET_API_KEY_URL = "https://eth-mainnet.g.alchemy.com/v2/FIQ1qwifmra7ZqdkVHnZ2lHQAKG8j4Yd";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_MAINNET_API_KEY_URL,
      }
    }
  },
};

export default config;
