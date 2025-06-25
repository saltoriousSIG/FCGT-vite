import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: "",
  pinataGateway: (import.meta as any).env.VITE_GATEWAY_URL,
});
