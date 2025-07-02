import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { signer_uuid, video_url, event_name } = req.body;
    console.log(signer_uuid, video_url, event_name);
    const { data } = await axios.post(
      "https://api.neynar.com/v2/farcaster/cast",
      {
        signer_uuid,
        text: `Testing embeded video`,
        embeds: [
          {
            url: video_url,
          },
        ],
      },
      {
        headers: {
          "x-api-key": process.env.NEYNAR_API_KEY as string,
        },
      }
    );
    console.log(data.cast);
    return res.status(200).json({
      hash: data.cast.hash,
    });
  } catch (e: any) {
    console.error("Error in post_cast handler:", e);
    res.status(500).json({ error: "Error processing cast" });
  }
}
