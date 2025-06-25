import React, { useRef, useState } from "react";
import { Loader, Smartphone, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadFromDeviceProps {
    onUpload: (file: File) => void;
    onReset: () => void;
    isSubmitting: boolean
    submitted: boolean;
}

const UploadFromDevice: React.FC<UploadFromDeviceProps> = ({ onUpload, onReset, isSubmitting, submitted }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file)
        }
    };

    const handleClick = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }


    return (
        <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-8 text-center hover:border-teal-500/50 transition-colors cursor-pointer bg-teal-500/5">
            <div className="flex flex-col items-center justify-center" onClick={handleClick}>
                <Smartphone className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">{file ? file.name : "Click to select video file"}</p>
                <p className={`text-sm ${file && file?.size > 30000000 ? "text-red-500" : "text-gray-600"} `}>{file ? (file.size / 1000000).toFixed(2).toString() + " MB" : "MP4,  30MB (max 60 seconds)"}</p>
                <input ref={fileRef} type="file" accept="video/mp4" className="hidden" required onChange={handleFileChange} size={30000000} />
            </div>
            {file && (
                <Button type="button" disabled={isSubmitting || submitted} onClick={() => file && onUpload(file)} className="m-4 mb-0 bg-green-500">
                    {isSubmitting ? (
                        <>
                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                        </>

                    )}
                </Button>
            )}
            {submitted && (
                <Button onClick={() => {
                    setFile(null);
                    onReset();

                }} type="button" className="text-black bg-yellow-500 mt-2 ">Submit a different video</Button>
            )}
        </div>

    );
}

export default UploadFromDevice