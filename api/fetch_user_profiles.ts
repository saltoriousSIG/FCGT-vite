import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fids } = req.body;
    const users = await axios.get(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fids}`,
      {
        headers: {
          "x-api-key": process.env.NEYNAR_API_KEY,
        },
      }
    );
    res.status(200).json({ success: true, payload: users });
  } catch (e: any) {
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
}
