"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Play, Volume2, VolumeX } from "lucide-react"
import { RawSubmission, SubmissionData } from "@/types/submissions.type"

interface Video {
    id: string
    user: {
        name: string
        username: string
        avatar: string
    }
    title: string
    description: string
    videoUrl: string
    likes: number
    views: number
    duration: string
}

interface VideoPlayerProps {
    video: RawSubmission;
    isActive: boolean
}

export function VideoPlayer({ video, isActive }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            if (isActive && isPlaying) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }, [isActive, isPlaying])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
        }
    }

    const toggleLike = () => {
        setIsLiked(!isLiked)
    }

    return (
        <div className="relative h-full w-full bg-black">
            {/* Video */}
            <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={video.submission_link}
                loop
                muted={isMuted}
                playsInline
                onClick={togglePlay}
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                        onClick={togglePlay}
                    >
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                    </Button>
                </div>
            )}

            {/* Top Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                    onClick={toggleMute}
                >
                    {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
                </Button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <div className="flex items-end justify-between">
                    {/* User Info & Description */}
                    <div className="flex-1 mr-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-10 w-10 border-2 border-white/20">
                                <AvatarImage src={"/placeholder.svg"} />
                                <AvatarFallback>{"placeholder username"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-white font-heading">{"placeholder username"}</p>
                                <p className="text-sm text-slate-300">{"placeholder username"}</p>
                            </div>
                        </div>
                        <h3 className="font-bold text-white mb-1 font-heading">{video.submission_name}</h3>
                        <p className="text-sm text-slate-200 mb-2">{video.submission_descripton}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>{"placeholder"} votes</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 flex-col transition-all duration-300"
                            onClick={toggleLike}
                        >
                            <Heart className={`h-6 w-6 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
                            <span className="text-xs text-white mt-1">{"placeholder votes"}</span>
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 flex-col transition-all duration-300"
                        >
                            <MessageCircle className="h-6 w-6 text-white" />
                            <span className="text-xs text-white mt-1">12</span>
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                        >
                            <Share className="h-6 w-6 text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
