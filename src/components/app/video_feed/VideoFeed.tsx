"use client"

import { useState, useRef, useEffect } from "react"
import { VideoPlayer } from "@/components/app/video_player/VideoPlayer";
import { useShows } from "@/providers/EventsProvider";


interface VideoFeedProps {
    onBack: () => void
}


export function VideoFeed({ onBack }: VideoFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showVoting, setShowVoting] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const { rawSubmissions } = useShows();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleScroll = () => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scrollTop = container.scrollTop
        const itemHeight = container.clientHeight
        const newIndex = Math.round(scrollTop / itemHeight)

        if (newIndex !== currentIndex && newIndex < rawSubmissions.length) {
            setCurrentIndex(newIndex)
        }

        // Show voting interface when scrolled past all videos
        if (newIndex >= rawSubmissions.length) {
            setShowVoting(true)
        } else {
            setShowVoting(false)
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener("scroll", handleScroll)
            return () => container.removeEventListener("scroll", handleScroll)
        }
    }, [currentIndex])

    return (
        <div className="min-h-screen bg-slate-950">
            <div
                ref={containerRef}
                className="h-[calc(100vh-70px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {rawSubmissions.map((video, index) => (
                    <div key={video.entry_id} className="h-full snap-start">
                        <VideoPlayer video={video} isActive={index === currentIndex} />
                    </div>
                ))}

                {/* Voting Interface */}
                <div className="h-full snap-start">
                    {/* <VotingInterface videos={mockVideos} /> */}
                </div>
            </div>
        </div>
    )
}
