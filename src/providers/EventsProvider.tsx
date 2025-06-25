import useContract, { ExecutionType } from "@/hooks/useContract";
import { ShowData, TalentBaseStorage } from "@/types/events.type";
import { useContext, createContext, useEffect, useState } from "react";
import { RawSubmission, SubmissionData } from "@/types/submissions.type";
import axios from "axios";

interface ShowsContextValue {
    currentShow: ShowData | undefined;
    numShows: number;
    shows: Array<any>;
    error: Error | null;
    baseData: TalentBaseStorage | undefined;
    currentShowId: number;
    rawSubmissions: RawSubmission[];
    submissionsData: SubmissionData[];
    submissionsDataLoading: boolean;
}


const ShowsContext = createContext<ShowsContextValue | undefined>(undefined);

export function useShows() {
    const context = useContext(ShowsContext);
    if (context === undefined) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}

export function ShowsProvider({ children }: { children: React.ReactNode }) {
    const [currentShow, setCurrentShow] = useState<ShowData>();
    const [error, setError] = useState<Error | null>(null);
    const [currentShowId, setCurrentShowId] = useState<number>(0);
    const [numShows, setNumShows] = useState<number>(0);
    const [shows, setShows] = useState([]);
    const [baseData, setBaseData] = useState<TalentBaseStorage>();
    const [rawSubmissions, setRawSubmissions] = useState<RawSubmission[]>([]);
    const [submissionsData, setSubmissionsData] = useState<SubmissionData[]>([]);
    const [submissionsDataLoading, setSubmissionsDataLoading] = useState<boolean>(false);


    const executeCurrentShowId = useContract<ExecutionType.READABLE, bigint>(ExecutionType.READABLE, "Data", "fetch_current_show_id");
    const executeCurrentShow = useContract<ExecutionType.READABLE, ShowData>(ExecutionType.READABLE, "Data", "fetch_show_data")
    const executeGetTlntData = useContract<ExecutionType.READABLE, TalentBaseStorage>(ExecutionType.READABLE, "Data", "fetch_base_data")
    const executeGetShowSubmissions = useContract<ExecutionType.READABLE, RawSubmission[]>(ExecutionType.READABLE, "Data", "fetch_submissions");

    useEffect(() => {
        const load = async () => {
            try {
                const id = await executeCurrentShowId([]);
                const show = await executeCurrentShow([parseInt(id.toString()) - 1])
                const tlntData = await executeGetTlntData([]);
                const raw_submissions = await executeGetShowSubmissions([parseInt(id.toString()) - 1]);
                setCurrentShowId(parseInt(id.toString()) - 1)
                setRawSubmissions(raw_submissions);
                setBaseData(tlntData);
                setCurrentShow(show)
            } catch (e: any) {
                setError(new Error(e.message));
            }
        }
        load();
    }, [executeCurrentShowId]);

    useEffect(() => {
        const load = async () => {
            try {
                const fids = rawSubmissions.map((s) => s.fid.toString()).join(",");
                console.log(fids)
            } catch (e: any) {
                setError(new Error(e.message))
            }
        }

        if (rawSubmissions.length > 0) load();
    }, [rawSubmissions]);

    return (
        <ShowsContext.Provider value={{
            currentShow,
            error,
            numShows,
            shows,
            baseData,
            currentShowId,
            rawSubmissions,
            submissionsData,
            submissionsDataLoading
        }}>
            {children}
        </ShowsContext.Provider>
    )
}