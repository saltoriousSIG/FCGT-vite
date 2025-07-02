import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { video_id, type } = req.query;
  console.log(video_id, type);

  const customerCode = process.env.CLOUDFLARE_VIDEO_CODE;

  if (type === "video.m3u8") {
    try {
      const m3u8Url = `https://customer-${customerCode}.cloudflarestream.com/${video_id}/manifest/video.m3u8`;
      const response = await fetch(m3u8Url);

      if (!response.ok) {
        return res.status(404).json({ error: "Video not found" });
      }

      const m3u8Content = await response.text();

      res.setHeader("Content-Type", "application/x-mpegURL");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=300");
      res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Range, Content-Range, Content-Type"
      );
      res.setHeader(
        "Access-Control-Expose-Headers",
        "Content-Length, Content-Range"
      );

      return res.status(200).send(m3u8Content);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch video" });
    }
  }

  if (type === "thumbnail.jpg") {
    try {
      const thumbnailUrl = `https://customer-${customerCode}.cloudflarestream.com/${video_id}/thumbnails/thumbnail.jpg`;
      const response = await fetch(thumbnailUrl);

      if (!response.ok) {
        return res.status(404).json({ error: "Thumbnail not found" });
      }

      const imageBuffer = await response.arrayBuffer();

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");

      return res.status(200).send(Buffer.from(imageBuffer));
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch thumbnail" });
    }
  }

  res.status(404).json({ error: "File not found" });
}
