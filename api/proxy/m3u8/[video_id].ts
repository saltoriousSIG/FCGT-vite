import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { video_id } = req.query;
  if (typeof video_id !== "string") {
    return res.status(400).json({ error: "Invalid video ID" });
  }
  try {
    const m3u8Url = `https://customer-${process.env.CLOUDFLARE_VIDEO_CODE}.cloudflarestream.com/${video_id}/manifest/video.m3u8`;
    const response = await fetch(m3u8Url);
    if (!response.ok) {
      return res.status(404).json({ error: "Video not found" });
    }
    const m3u8Content = await response.text();
    console.log("M3U8 Content:", m3u8Content); // Log the content for debugging
    res.setHeader("Content-Type", "application/x-mpegURL");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.status(200).send(m3u8Content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
}
