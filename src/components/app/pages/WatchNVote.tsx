import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { VideoFeed } from "@/components/app/video_feed/VideoFeed";


interface WatchNVoteProps { }

const WatchNVote: React.FC<WatchNVoteProps> = () => {
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
                        <h1 className="text-xl font-bold text-white font-heading">Watch and Vote</h1>
                    </div>
                </div>
            </div>
            <VideoFeed onBack={() => { }} />
        </div>
    )
}

export default WatchNVote;