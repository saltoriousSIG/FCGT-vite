import { PinataSDK } from "pinata";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const url = await pinata.upload.public.createSignedURL({
      expires: 60, // The only required param
      mimeTypes: ["video/*"], // Optional restriction for certain file types
      maxFileSize: 30000000, // Optional file size limit
    });
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
}
