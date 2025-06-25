import React from "react";
import { RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";


interface FinishRecordingActionsProps {
    handleRecordAgain: () => void;
    handleUseVideo: () => void;
}

const FinishRecordingActions: React.FC<FinishRecordingActionsProps> = ({ handleRecordAgain, handleUseVideo }) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex gap-3 justify-center">
                {/* Record Again Button */}
                <Button
                    onClick={handleRecordAgain}
                    variant="outline"
                    className="flex-1 h-12 bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 hover:border-white/30 transition-all duration-200 font-medium"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Record Again
                </Button>

                {/* Use Video Button */}
                <Button
                    onClick={handleUseVideo}
                    className="flex-1 h-12 bg-white text-black hover:bg-white/90 transition-all duration-200 font-medium shadow-lg"
                >
                    <Check className="w-4 h-4 mr-2" />
                    Use Video
                </Button>
            </div>
        </div>
    );
};

export default FinishRecordingActions;