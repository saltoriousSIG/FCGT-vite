import { useCallback } from "react";
import useContract, { ExecutionType } from "./useContract";
import { useShows } from "@/providers/EventsProvider";
import { useAccount } from "wagmi";
import { CONTRACTS } from "@/lib/constants";

export type Submissiondata = {
  fid: bigint;
  entry_id: string;
  user_address: string;
  submission_link: string;
  submission_name: string;
  submission_descripton: string;
};

const useSubmitEntry = () => {
  const { baseData, currentShowId } = useShows();
  const account = useAccount();
  console.log(account.address);
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
  const executeSubmitEntry = useContract<ExecutionType.WRITABLE>(
    ExecutionType.WRITABLE,
    "Submit",
    "submit_entry"
  );
  return useCallback(
    async (entryData: Submissiondata) => {
      try {
        if (!baseData || !account) return;
        const amount = baseData.token_entry_price;
        const allowance = await executeFetchApprovalAmount([
          account.address,
          CONTRACTS.DIAMOND_ADDRESS,
        ]);
        if (allowance < amount) {
          await executeApprove([CONTRACTS.DIAMOND_ADDRESS, amount]);
        }
        console.log(currentShowId, entryData, allowance);
        await executeSubmitEntry([currentShowId, entryData]);
      } catch (e: any) {
        console.error(e);
      }
    },
    [baseData, currentShowId, account]
  );
};

export default useSubmitEntry;
