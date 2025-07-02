import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { video_id } = req.query;

  if (typeof video_id !== "string") {
    return res.status(400).json({ error: "Invalid video ID" });
  }

  try {
    const thumbnailUrl = `https://customer-${process.env.CLOUDFLARE_VIDEO_CODE}.cloudflarestream.com/${video_id}/thumbnails/thumbnail.jpg`;

    const response = await fetch(thumbnailUrl);

    if (!response.ok) {
      return res.status(404).json({ error: "Thumbnail not found" });
    }

    const imageBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400");

    res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thumbnail" });
  }
}
