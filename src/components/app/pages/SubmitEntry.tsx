import React, { useEffect, useMemo } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { NavLink } from "react-router-dom"
import useUploadToPinata from "@/hooks/useUploadToPinata"
import RecordVideo from "../video_upload/RecordVideo"
import { useShows } from "@/providers/EventsProvider"
import axios from "axios";
import Countdown from "../countdown/Countdown";
import { UploadResponse } from "pinata"
import { formatUnits } from "viem"
import { useAuth } from "@/providers/AuthProvider"
import SubmitConnect from "../connect/SubmitConnect"
import sdk from "@farcaster/frame-sdk"
import UploadForm from "../upload_form/UploadForm"

interface SubmitEntryProps { }

const SubmitEntry: React.FC<SubmitEntryProps> = ({ }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState(false)
    const [isRecordingOpen, setIsRecordingOpen] = useState(false)
    const [uploadedMediaResponse, setUploadedMediaResponse] = useState<UploadResponse>();

    const { currentShow, baseData } = useShows();
    const { status, authentication_url } = useAuth();
    console.log(submitted)
    const upload = useUploadToPinata();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const entryPrice = useMemo(() => {
        if (!baseData) return;
        return formatUnits(baseData.token_entry_price, 6)
    }, [baseData]);

    const handleSelectVideo = async (blob: Blob) => {
        try {
            const { data } = await axios.get("/api/get_upload_url");
            const response = await upload(data.url, blob);
            if (response) {
                setUploadedMediaResponse(response)
                setIsRecordingOpen(false)
                setIsSubmitting(false)
                setSubmitted(true);
            }
        } catch (e: any) {
            throw new Error("Failed to upload video")
        }
    }

    if (isRecordingOpen) {
        return (
            <div className="min-h-screen flex items-center justify-center  bg-dark-950 rounded overflow-y-hidden">
                <Card className="w-full max-w-md p-0 glass-effect border-teal-500/20">
                    <CardContent className="text-center p-0">
                        <RecordVideo
                            isSubmitting={isSubmitting}
                            onStartRecording={() => setIsRecordingOpen(true)}
                            onClickBack={() => setIsRecordingOpen(false)}
                            onUseVideo={async (url, blob) => {
                                setIsSubmitting(true);
                                await handleSelectVideo(blob)
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Header */}
            <div className="sticky top-0 z-10 glass-effect border-b border-gray-700/50 p-4">
                <div className="flex items-center gap-3">
                    <NavLink to="/">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </NavLink>
                    <div>
                        <h1 className="text-xl font-bold text-white font-heading">Submit Entry</h1>
                        <p className="text-sm text-gray-400">{currentShow?.name}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 max-w-2xl mx-auto">
                {/* Competition Info */}
                <Card className="mb-6 glass-effect border-teal-500/20">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 font-heading">This Week's Theme: {currentShow?.name} </h3>
                        <p className="text-gray-300 mb-4">
                            {currentShow?.description}
                        </p>
                        <div className="my-2.5 text-white">
                            Entry: {entryPrice} $USDC
                        </div>
                        <Countdown targetTimestamp={!currentShow ? 0 : Number(currentShow.entry_closed_time) * 1000} title="Submissions Close In:" endMessage="Submissions Closed" />
                    </CardContent>
                </Card>

                {/* Submission Form */}
                <Card className="glass-effect border-gray-700/50">
                    {status !== "approved" ? (
                        <div className="p-4">
                            <SubmitConnect onConnect={() => {
                                console.log(authentication_url)
                                sdk.actions.openUrl(authentication_url as string)
                            }} />
                        </div>
                    ) : (
                        <UploadForm
                            uploadedMediaResponse={uploadedMediaResponse}
                            hanldeSetUploadedMediaResponse={(response) => setUploadedMediaResponse(response)}
                            handleSetRecordingOpen={(state) => setIsRecordingOpen(state)}
                        />
                    )}
                </Card>
            </div>
        </div >
    )
}

export default SubmitEntry;
