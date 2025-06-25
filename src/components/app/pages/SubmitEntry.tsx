import React, { useEffect, useMemo } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { NavLink } from "react-router-dom"
import useUploadToPinata from "@/hooks/useUploadToPinata"
import RecordVideo from "../video_upload/RecordVideo"
import { useShows } from "@/providers/EventsProvider"
import axios from "axios";
import Countdown from "../countdown/Countdown";
import { UploadResponse } from "pinata"
import VideoUploadedConfimation from "../video_upload/ VideoUploadedConfirmation"
import { formatUnits } from "viem"
import UploadMethod from "../upload_method/UploadMethod"
import useSubmitEntry, { Submissiondata } from "@/hooks/useSubmitEntry"
import { useFrameContext } from "@/providers/FrameProvider"
import { v4 as uuidV4 } from "uuid";
import { useAccount } from "wagmi"



interface SubmitEntryProps { }


const SubmitEntry: React.FC<SubmitEntryProps> = ({ }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState(false)
    const [isRecordingOpen, setIsRecordingOpen] = useState(false)
    const [uploadedMediaResponse, setUploadedMediaResponse] = useState<UploadResponse>();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "dance",
        videoUrl: "",
    });
    const [error, setError] = useState<Error | null>(null);

    console.log(submitted, error)

    const { currentShow, baseData } = useShows();
    const { fUser } = useFrameContext();
    const account = useAccount();

    const upload = useUploadToPinata();
    const submitEntry = useSubmitEntry();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axios.post("/api/get_signer", {});
                console.log(data.signedKey)
            } catch (e: any) {
                console.error(e.message)
            }
        }
        load();
    }, [])

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
                                console.log(url)
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
                    <CardHeader>
                        <CardTitle className="text-white font-heading">Submit Your Entry</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!fUser || !uploadedMediaResponse) return;
                            try {
                                const submission_url = "https://" + (import.meta as any).env.VITE_GATEWAY_URL + "/ipfs/" + uploadedMediaResponse.cid
                                console.log(submission_url)
                                const submission_data: Submissiondata = {
                                    fid: BigInt(fUser?.fid),
                                    entry_id: uuidV4(),
                                    user_address: account.address as string,
                                    submission_link: submission_url,
                                    submission_name: formData.title,
                                    submission_descripton: formData.description
                                };
                                await submitEntry(submission_data)
                            } catch (e: any) {
                                setError(new Error(e.message));
                            }
                        }} className="space-y-6">
                            {/* Video Upload Method Selection */}
                            <UploadMethod onUploaded={(response) => {
                                setUploadedMediaResponse(response);
                            }}
                                handleOpenRecording={(state) => setIsRecordingOpen(state)}
                            />

                            {uploadedMediaResponse && (
                                <VideoUploadedConfimation uploadResponse={uploadedMediaResponse} />
                            )}
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-white">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Give your performance a catchy title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-dark-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-teal-500/50"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-white">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Tell us about your performance, inspiration, or technique..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-dark-800/50 border-gray-700/50 text-white placeholder:text-gray-500 min-h-[100px] focus:border-teal-500/50"
                                    required
                                />
                            </div>
                            {/* Guidelines */}
                            <Card className="bg-gray-600/10 border-gray-600/30">
                                <CardContent className="p-4">
                                    <h4 className="font-semibold text-gray-300 mb-2 font-heading">Submission Guidelines</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• Videos must be original content performed by you</li>
                                        <li>• Maximum length: 60 seconds</li>
                                        <li>• Good lighting and clear audio preferred</li>
                                        <li>• Follow community guidelines - no inappropriate content</li>
                                        <li>• Have fun and be creative!</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={!uploadedMediaResponse || !formData.title || !formData.description}
                                className="w-full bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Submit My Entry
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default SubmitEntry;
