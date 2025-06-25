import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, SwitchCamera } from "lucide-react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui/button";
import RecordButton from "./RecordButton";
import { Loader } from "lucide-react";
import FinishRecordingActions from "./FinishRecordingActions";

interface RecordVideoProps {
    onStartRecording: () => void;
    onStopRecording?: () => void;
    onClickBack: () => void;
    onUseVideo: (blobUrl: string, blob: Blob) => void;
    isSubmitting: boolean;
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};


const VideoPreview = ({
    stream,
    onClickBack,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    onFlipCamera
}: {
    stream: MediaStream | null,
    onClickBack: () => void,
    startRecording: () => void
    stopRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
    onFlipCamera: () => void;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const recordingInterval = useRef<NodeJS.Timeout | null>(null)

    const handleStartRecording = () => {
        setIsRecording(true);
        startRecording();
    }

    const handleStopRecording = () => {
        setIsRecording(false);
        stopRecording()
    }

    const handlePauseRecording = () => {
        setIsPaused(true);
        pauseRecording();
    }

    const handleResumeRecording = () => {
        setIsPaused(false);
        resumeRecording();
    }

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        if (isRecording && !isPaused) {
            recordingInterval.current = setInterval(() => {
                setRecordingDuration(prev => {
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (recordingInterval.current) {
                clearInterval(recordingInterval.current);
                recordingInterval.current = null;
            }
        }
    }, [isRecording, isPaused]);

    useEffect(() => {
        if (recordingDuration >= 60) {
            handleStopRecording();
        }
    }, [recordingDuration])

    if (!stream) {
        return (
            <div className="text-white flex flex-col items-center justify-center h-full w-full">
                <Loader className="animate-spin h-8 w-8 text-white mb-4" />
                <span>
                    Loading video...
                </span>
            </div>
        );
    }

    return (
        <div className="h-full w-full relative overflow-y-hidden">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClickBack}
                    className="text-white hover:bg-white/20 flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <div className="absolute h-fit w-fit top-4 right-4 text-white">
                {formatTime(recordingDuration)} (60 Sec Max)
            </div>

            <div className="absolute bottom-10 left-6 z-10 flex items-center gap-2">
                <Button disabled={isRecording} type="button" variant="ghost" onClick={onFlipCamera} className="text-white h-fit w-fit">
                    <SwitchCamera className="scale-[2.5] stroke-gray-300 " />
                </Button>
            </div>

            <div className={`absolute h-fit w-fit transition-all left-1/2 -translate-x-1/2 z-[10] ${isRecording ? "bottom-24" : "bottom-6"}`}>
                <RecordButton isPaused={isPaused} onResumeRecording={handleResumeRecording} onPauseRecording={handlePauseRecording} onStartRecording={handleStartRecording} onStopRecording={handleStopRecording} isRecording={isRecording} />
            </div>
            <video ref={videoRef} playsInline autoPlay className="h-screen w-screen object-cover" />;
        </div>
    )
};

const RecordVideo: React.FC<RecordVideoProps> = ({ onStartRecording, onUseVideo, onClickBack, isSubmitting }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [cameraFacingMode, setCameraFacingMode] = useState<"user" | "environment">("user");

    const handleOnFlipCamera = () => {
        setCameraFacingMode(prev => prev === "user" ? "environment" : "user");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full overflow-y-hidden relative">
            {isSubmitting && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 h-screen w-screen">
                    <Loader className="animate-spin h-8 w-8 text-white" />
                    <span className="text-white ml-4">Submitting your video...</span>
                </div>

            )}
            {url ? (
                <div className="flex flex-col items-center justify-center h-full w-full relative">
                    <video src={url} autoPlay playsInline loop className="h-screen w-screen object-cover" />
                    <FinishRecordingActions
                        handleRecordAgain={() => setUrl(null)}
                        handleUseVideo={() => onUseVideo(url, blob!)}
                    />
                </div>
            ) : (

                <ReactMediaRecorder
                    key={cameraFacingMode}
                    video={{
                        facingMode: cameraFacingMode
                    }}
                    mediaRecorderOptions={{
                        mimeType: "video/mp4",
                    }}
                    onStart={onStartRecording}
                    onStop={(blobUrl, blob) => {
                        setUrl(blobUrl);
                        setBlob(blob);
                    }}
                    askPermissionOnMount={true}
                    render={({ previewStream, startRecording, stopRecording, pauseRecording, resumeRecording }) => {
                        return <VideoPreview resumeRecording={resumeRecording} pauseRecording={pauseRecording} onFlipCamera={handleOnFlipCamera} startRecording={startRecording} stream={previewStream} onClickBack={onClickBack} stopRecording={stopRecording} />;
                    }}
                />

            )}
        </div>
    );
}

export default RecordVideo;
