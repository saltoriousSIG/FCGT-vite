import type { Abi, Address } from "viem";
import { base } from "viem/chains";

/**
 * NFT Metadata Configuration
 */
export const mintMetadata = {
  name: "FCGT",
  description: "Show me what you got ",
  imageUrl:
    "https://res.cloudinary.com/dsrjjqkjs/image/upload/v1751082910/Screenshot_2025-06-27_at_11.53.09_PM_a40rdu.png",
  creator: {
    name: "saltorious.eth",
    fid: 483713,
    profileImageUrl:
      "https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/f93094db-4e5f-4c6d-e870-1d7deeb82d00/anim=false,fit=contain,f=auto,w=576",
  },
  chain: "Base",
  priceEth: "0.0004",
  startsAt: null,
  endsAt: null,
  isMinting: true,
} as const;

/**
 * Contract Configuration
 */
export const contractConfig = {
  address: "0x8087039152c472Fa74F47398628fF002994056EA" as Address,
  chain: base,
  abi: [
    { inputs: [], name: "MintPaused", type: "error" },
    { inputs: [], name: "InvalidPaymentAmount", type: "error" },
    { inputs: [], name: "SenderNotDirectEOA", type: "error" },
    {
      inputs: [
        { internalType: "uint256", name: "vectorId", type: "uint256" },
        { internalType: "uint48", name: "numTokensToMint", type: "uint48" },
        { internalType: "address", name: "mintRecipient", type: "address" },
      ],
      name: "vectorMint721",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "vectorId",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bool",
          name: "onChainVector",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "numMinted",
          type: "uint256",
        },
      ],
      name: "NumTokenMint",
      type: "event",
    },
  ] as const as Abi,
  vectorId: 6506,
  referrer: "0x075b108fC0a6426F9dEC9A5c18E87eB577D1346a" as Address,
} as const;

/**
 * Farcaster Frame Embed Configuration
 */
export const embedConfig = {
  version: "next",
  imageUrl:
    "https://res.cloudinary.com/dsrjjqkjs/image/upload/v1751082910/Screenshot_2025-06-27_at_11.53.09_PM_a40rdu.png",
  button: {
    title: "Join the show",
    action: {
      type: "launch_frame",
      name: "FCGT",
      url: "https://8428-24-45-156-171.ngrok-free.app",
    },
  },
} as const;

/**
 * Main App Configuration
 */
export const config = {
  ...mintMetadata,
  contract: contractConfig,
  embed: embedConfig,
} as const;
