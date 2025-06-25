import { useCallback, useMemo } from "react";
import { readContract, writeContract } from "@wagmi/core";
import DataFacetAbi from "@/abis/DataFacet.json";
import CastVoteFacetAbi from "@/abis/CastVoteFacet.json";
import SubmitEntryFacetAbi from "@/abis/SubmitEntryFacet.json";
import ERC20Abi from "@/abis/ERC20.json";
import { config } from "@/wagmi";
import { CONTRACTS } from "@/lib/constants";

type Facets = "Data" | "Vote" | "Submit" | "ERC20";

export enum ExecutionType {
  READABLE,
  WRITABLE,
}

type ExecutionResult<
  T extends ExecutionType,
  R = any,
> = T extends ExecutionType.READABLE
  ? (args: Array<any>) => Promise<R>
  : (args: Array<any>) => Promise<`0x${string}`>;

const useContract = <T extends ExecutionType, R = any>(
  type: T,
  facet: Facets,
  functionName: string,
  contractAddress: `0x${string}` = "0x0"
): ExecutionResult<T, R> => {
  const abi = useMemo(() => {
    switch (facet) {
      case "Data":
        return DataFacetAbi;
      case "Submit":
        return SubmitEntryFacetAbi;
      case "Vote":
        return CastVoteFacetAbi;
      case "ERC20":
        return ERC20Abi;
    }
  }, [facet]);

  const execute = useCallback(
    async (args: Array<any>) => {
      try {
        let res;
        switch (type) {
          case ExecutionType.READABLE:
            res = await readContract(config as any, {
              abi,
              address:
                facet === "ERC20" ? contractAddress : CONTRACTS.DIAMOND_ADDRESS,
              functionName,
              args,
            });
            console.log(res);
            break;
          case ExecutionType.WRITABLE:
            res = await writeContract(config as any, {
              abi,
              address:
                facet === "ERC20" ? contractAddress : CONTRACTS.DIAMOND_ADDRESS,
              functionName,
              args,
            });
            console.log(res);
            break;
        }
        return res as any;
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
    [abi, functionName, contractAddress]
  );

  return execute;
};

export default useContract;
