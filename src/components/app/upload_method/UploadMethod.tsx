import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Upload, Smartphone, Camera, Video, ArrowLeft } from "lucide-react";
import UploadFromDevice from "../video_upload/UploadFromDevice";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useUploadToPinata from "@/hooks/useUploadToPinata";
import { UploadResponse } from "pinata";

type SubmissionMethod = "upload" | "link" | "record" | null

interface UploadMethodProps {
    handleOpenRecording: (state: boolean) => void
    onUploaded: (response: UploadResponse) => void;
}

const UploadMethod: React.FC<UploadMethodProps> = ({ handleOpenRecording, onUploaded }) => {
    const [submissionMethod, setSubmissionMethod] = useState<SubmissionMethod>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false)

    const upload = useUploadToPinata();

    const handleFileUpload = async (file: File) => {
        setIsSubmitting(true)
        try {
            const { data } = await axios.get("/api/get_upload_url");
            const response = await upload(data.url, file);
            if (response) {
                onUploaded(response)
                setIsSubmitting(false)
                setSubmitted(true);
            }
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    const startRecording = () => {
        handleOpenRecording(true)
    }

    const handleReset = () => {
        setIsSubmitting(false)
        setSubmitted(false);
    }

    return (
        <div className="space-y-4">
            <Label className="text-white text-lg font-heading">Choose Upload Method</Label>

            {!submissionMethod ? (
                /* Method Selection */
                <div className="grid gap-3">
                    {/* Upload from Device */}
                    <button
                        type="button"
                        onClick={() => setSubmissionMethod("upload")}
                        className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-teal-600/10 border border-teal-500/20 hover:from-teal-500/20 hover:to-teal-600/20 hover:border-teal-500/40 transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                            <Smartphone className="w-6 h-6 text-teal-400" />
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="text-lg font-bold text-white font-heading">Upload from Device</h3>
                            <p className="text-sm text-gray-400">Select a video file from your phone or computer</p>
                        </div>
                        <Upload className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Record In-App */}
                    <button
                        type="button"
                        onClick={() => startRecording()}
                        className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 hover:from-orange-500/20 hover:to-orange-600/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                            <Camera className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="text-lg font-bold text-white font-heading">Record In-App</h3>
                            <p className="text-sm text-gray-400">Use your camera to record directly in the app</p>
                        </div>
                        <Video className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSubmissionMethod(null)}
                            className="text-gray-400 hover:text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Change Method
                        </Button>
                    </div>

                    {submissionMethod === "upload" && (
                        <UploadFromDevice onReset={handleReset} submitted={submitted} isSubmitting={isSubmitting} onUpload={handleFileUpload} />
                    )}

                    {submissionMethod === "record" && (
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 text-center">
                            <Camera className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                            <p className="text-white font-medium mb-1">Video Recorded Successfully!</p>
                            <p className="text-sm text-gray-400">Duration: 0:45 • Ready to submit</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default UploadMethod;