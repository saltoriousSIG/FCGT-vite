import { useCallback } from "react";
import useContract, { ExecutionType } from "./useContract";
import { useShows } from "@/providers/EventsProvider";
import { useAccount } from "wagmi";
import { CONTRACTS } from "@/lib/constants";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";

export type Submissiondata = {
  fid: bigint;
  entry_id: string;
  user_address: string;
  submission_link: string;
  submission_thumbnail: string;
  submission_hls_link: string;
  submission_name: string;
  submission_descripton: string;
};

const useSubmitEntry = () => {
  const { baseData, currentShowId, currentShow } = useShows();
  const { signer_uuid } = useAuth();
  const account = useAccount();
  const executeFetchApprovalAmount = useContract<ExecutionType.READABLE>(
    ExecutionType.READABLE,
    "ERC20",
    "allowance",
    baseData?.USDC_TOKEN as `0x${string}`
  );
  const executeApprove = useContract<ExecutionType.WRITABLE>(
    ExecutionType.WRITABLE,
    "ERC20",
    "approve",
    baseData?.USDC_TOKEN as `0x${string}`
  );
  // const executeSubmitEntry = useContract<ExecutionType.WRITABLE>(
  //   ExecutionType.WRITABLE,
  //   "Submit",
  //   "submit_entry"
  // );

  const postCast = useCallback(
    async (video_id: string) => {
      console.log(video_id);
      try {
        const { data } = await axios.post("/api/post_cast", {
          video_url: `https://8428-24-45-156-171.ngrok-free.app/api/video/${video_id}/video.m3u8`,
          signer_uuid,
          event_name: currentShow?.name,
        });
        return data.hash;
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
    [signer_uuid]
  );

  return useCallback(
    async (video_id: string, entryData: Submissiondata) => {
      console.log(entryData);
      try {
        console.log(CONTRACTS.DIAMOND_ADDRESS);
        if (!baseData || !account) return;
        const amount = baseData.token_entry_price;
        const allowance = await executeFetchApprovalAmount([
          account.address,
          CONTRACTS.DIAMOND_ADDRESS,
        ]);
        console.log(allowance);
        if (allowance < amount) {
          await executeApprove([CONTRACTS.DIAMOND_ADDRESS, amount]);
        }
        const hash = await postCast(video_id);
        console.log(hash);
        //console.log(hash);
        //await executeSubmitEntry([currentShowId, entryData]);
      } catch (e: any) {
        console.error(e);
      }
    },
    [baseData, currentShowId, account]
  );
};

export default useSubmitEntry;
