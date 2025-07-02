import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { video_url } = req.body;
    const { data } = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_CUSTOMER_CODE}/stream/copy`,
      {
        url: video_url,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    res.status(200).json({
      success: true,
      data: data.result,
    });
  } catch (e: any) {
    console.error("Error in get_cloudflare_stream handler:", e);
    res.status(500).json({ error: "Error processing request" });
  }
}
