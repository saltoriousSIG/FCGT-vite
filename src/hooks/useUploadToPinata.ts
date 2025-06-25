import { useCallback } from "react";
import { pinata } from "@/lib/pinata";
import { v4 as uuidv4 } from "uuid";

const useUploadToPinata = () => {
  return useCallback(async (upload_url: string, file: Blob | null) => {
    console.log(upload_url, file);
    if (!upload_url || !file) {
      return;
    }

    try {
      const fileToUpload = new File([file], `${uuidv4()}.mp4`, {
        type: "video/mp4",
      });
      const resp = await pinata.upload.public
        .file(fileToUpload)
        .url(upload_url);
      return resp;
    } catch (e: any) {
      throw new Error(`Failed to upload to Pinata: ${e.message}`);
    }
  }, []);
};

export default useUploadToPinata;
