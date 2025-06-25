import { motion, AnimatePresence } from "framer-motion"
import { Video, Square, Pause, Play } from "lucide-react"

interface RecordButtonProps {
    isRecording: boolean;
    isPaused: boolean;
    onStopRecording: () => void;
    onStartRecording: () => void;
    onPauseRecording: () => void;
    onResumeRecording: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ isRecording, onStopRecording, onStartRecording, onPauseRecording, onResumeRecording, isPaused }) => {
    console.log(isPaused)

    return (
        <div className="">
            <div className="relative flex flex-row items-center justify-center">
                {/* Always-visible pulsing ring */}
                <motion.div
                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />

                {/* Outer pulsing ring when recording */}
                <AnimatePresence>
                    {isRecording && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-600 to-red-600 opacity-30"
                            initial={{ scale: 1, opacity: 0.3 }}
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.3, 0.1, 0.3],
                            }}
                            exit={{ scale: 1, opacity: 0 }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Middle ring */}
                <motion.div
                    className="absolute inset-2 rounded-full bg-gradient-to-r from-rose-500 to-red-500 opacity-20"
                    animate={
                        isRecording
                            ? {
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }
                            : {}
                    }
                    transition={{
                        duration: 1.5,
                        repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                    }}
                />

                {/* Additional pulsing layer */}
                <motion.div
                    className="absolute inset-1 rounded-full bg-gradient-to-r from-rose-500 to-red-500 opacity-10"
                    animate={
                        isRecording
                            ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.3, 0.1],
                            }
                            : {}
                    }
                    transition={{
                        duration: 1,
                        repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                    }}
                />

                {/* Main button */}
                <motion.button
                    className="relative w-20 h-20 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-red-700 shadow-2xl flex items-center justify-center overflow-hidden"
                    whileTap={{ scale: 0.9 }}
                    animate={
                        isRecording
                            ? {
                                boxShadow: [
                                    "0 0 30px rgba(225, 29, 72, 0.6)",
                                    "0 0 60px rgba(220, 38, 38, 0.8)",
                                    "0 0 30px rgba(225, 29, 72, 0.6)",
                                ],
                            }
                            : {
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                            }
                    }
                    transition={{
                        duration: 1,
                        repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                    }}
                    onClick={onStartRecording}
                >
                    {/* Gradient overlay for extra vibrancy */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-red-500 opacity-80 rounded-full" />

                    {/* Inner content */}
                    <motion.div
                        className="relative z-10 flex items-center justify-center"
                        animate={isRecording ? { rotate: 360 } : { rotate: 0 }}
                        transition={{
                            duration: 2,
                            repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
                            ease: "linear",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {isRecording ? (
                                <motion.div
                                    key="recording"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Square className="w-6 h-6 text-white fill-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Video className="w-8 h-8 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full"
                        animate={{
                            x: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            repeatDelay: 1,
                        }}
                    />
                </motion.button>

                {/* Recording indicator and stop button */}
                <AnimatePresence>
                    {isRecording && (
                        <motion.div
                            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex  items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                className="relative w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-xl flex items-center justify-center overflow-hidden border-2 border-gray-500/30"
                                whileTap={{ scale: 0.9 }}
                                onClick={onStopRecording}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 opacity-80 rounded-full" />

                                {/* Stop icon */}
                                <div className="relative z-10 flex items-center justify-center">
                                    <Square className="w-5 h-5 text-white fill-white" />
                                </div>

                                {/* Subtle shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 rounded-full"
                                    animate={{
                                        x: ["-100%", "100%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                        repeatDelay: 2,
                                    }}
                                />
                            </motion.button>
                            <motion.button
                                className="relative w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-xl flex items-center justify-center overflow-hidden border-2 border-gray-500/30"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    if (isPaused) {
                                        onResumeRecording();
                                    } else {
                                        onPauseRecording();
                                    }
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 opacity-80 rounded-full" />

                                {/* Stop icon */}
                                <div className="relative z-10 flex items-center justify-center">
                                    {isPaused ?
                                        <Play className="w-5 h-5 text-white fill-white" /> :
                                        <Pause className="w-5 h-5 text-white fill-white" />
                                    }
                                </div>

                                {/* Subtle shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 rounded-full"
                                    animate={{
                                        x: ["-100%", "100%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                        repeatDelay: 2,
                                    }}
                                />
                            </motion.button>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
export default RecordButton;