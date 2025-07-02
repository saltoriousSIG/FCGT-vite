import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { hash, signer_uuid } = req.body;
    await axios.delete("https://api.neynar.com/v2/farcaster/cast", {
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY as string,
      },
      data: {
        signer_uuid,
        target_hash: hash,
      },
    });
  } catch (e: any) {
    console.error("Error in delete_cast handler:", e);
    res.status(500).json({ error: "Error deleting cast" });
  }
}
