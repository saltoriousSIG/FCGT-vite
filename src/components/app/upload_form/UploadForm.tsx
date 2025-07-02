import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFrameContext } from '@/providers/FrameProvider';
import { v4 as uuidV4 } from "uuid";
import { useAccount } from 'wagmi';
import UploadMethod from '../upload_method/UploadMethod';
import VideoUploadedConfirmation from '../video_upload/ VideoUploadedConfirmation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader } from 'lucide-react';
import { UploadResponse } from 'pinata';
import useSubmitEntry from '@/hooks/useSubmitEntry';
import { Submissiondata } from '@/hooks/useSubmitEntry';
import axios from 'axios';

interface UploadFormProps {
    uploadedMediaResponse?: UploadResponse;
    hanldeSetUploadedMediaResponse: (response: UploadResponse) => void;
    handleSetRecordingOpen: (state: boolean) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({
    uploadedMediaResponse,
    handleSetRecordingOpen,
    hanldeSetUploadedMediaResponse

}) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { fUser } = useFrameContext();
    const account = useAccount();
    console.log(error);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "dance",
        videoUrl: "",
    });

    const submitEntry = useSubmitEntry();

    const uploadStream = useCallback(async (submission_link: string) => {
        try {
            const { data } = await axios.post("/api/get_cloudflare_stream", {
                video_url: submission_link,
            });
            console.log(data);
            return {
                id: data.data.uid,
                hls_url: data.data.playback.hls,
                thumbnail: data.data.thumbnail,
            };
        } catch (e: any) {
            throw new Error(e.message);
        }
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        setIsSubmitting(true)
        e.preventDefault();
        if (!fUser || !uploadedMediaResponse) return;
        try {
            const submission_url = "https://" + (import.meta as any).env.VITE_GATEWAY_URL + "/ipfs/" + uploadedMediaResponse.cid
            const { id, hls_url, thumbnail } = await uploadStream(submission_url);
            console.log(id, hls_url, thumbnail);
            const submission_data: Submissiondata = {
                fid: BigInt(fUser?.fid),
                entry_id: uuidV4(),
                user_address: account.address as string,
                submission_link: submission_url,
                submission_thumbnail: thumbnail,
                submission_hls_link: hls_url,
                submission_name: formData.title,
                submission_descripton: formData.description
            };
            await submitEntry(id, submission_data)
        } catch (e: any) {
            setError(new Error(e.message));
        } finally {
            setIsSubmitting(false)
        }
    }, [uploadedMediaResponse, fUser, formData, uploadStream, account.address, submitEntry]);


    return (
        <>
            <CardHeader>
                <CardTitle className="text-white font-heading">Submit Your Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Video Upload Method Selection */}
                    <UploadMethod onUploaded={(response) => {
                        hanldeSetUploadedMediaResponse(response);
                    }}
                        handleOpenRecording={(state) => handleSetRecordingOpen(state)}
                    />

                    {uploadedMediaResponse && (
                        <VideoUploadedConfirmation uploadResponse={uploadedMediaResponse} />
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
                        disabled={!uploadedMediaResponse || !formData.title || !formData.description || isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader className='h-3 w-3 animate-spin' />
                        ) : (
                            <div className="flex items-center justify-center gap-x-2">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Submit My Entry
                            </div>
                        )}
                    </Button>
                </form>
            </CardContent>
        </>
    )
}

export default UploadForm;