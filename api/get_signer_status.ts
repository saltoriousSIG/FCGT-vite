import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, NeynarAPIClient } from "@neynar/nodejs-sdk";

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY as string,
});

const neynarClient = new NeynarAPIClient(config);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
  } catch (e: any) {
    console.error("Error in get_signer_status:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
