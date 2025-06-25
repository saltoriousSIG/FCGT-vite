import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileVideo, HardDrive, FileType, Calendar, Globe, Hash } from "lucide-react";
import { UploadResponse } from "pinata";
import { formatFileSize, formatDate } from "@/lib/utils";

interface VideoUploadedConfirmationProps {
    uploadResponse: UploadResponse
}

const VideoUploadedConfirmation: React.FC<VideoUploadedConfirmationProps> = ({ uploadResponse }) => {

    return (
        <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Uploaded Video</h3>
            <Card className="bg-slate-700/50 border-slate-600/50">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <FileVideo className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white truncate">{uploadResponse.name}</h4>
                            <p className="text-slate-400 text-sm">Video uploaded successfully</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-300">Size:</span>
                            <span className="text-white font-medium">{formatFileSize(uploadResponse.size)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FileType className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-300">Type:</span>
                            <span className="text-white font-medium">{uploadResponse.mime_type}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-300">Uploaded:</span>
                            <span className="text-white font-medium">{formatDate(uploadResponse.created_at)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-300">Network:</span>
                            <span className="text-white font-medium capitalize">{uploadResponse.network}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-300">ID:</span>
                            <span className="text-white font-medium font-mono text-xs">
                                {uploadResponse.id.slice(0, 8)}...
                            </span>
                        </div>
                    </div>

                    {/* CID Section */}
                    <div className="mt-4 pt-4 border-t border-slate-600/50">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-300">CID:</span>
                            <code className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono break-all">
                                {uploadResponse.cid}
                            </code>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default VideoUploadedConfirmation;