import { Play, Upload, Trophy, User, ArrowRight, Plus, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFrameContext } from "@/providers/FrameProvider"
import { NavLink } from "react-router-dom"

type PageType = "splash" | "watch" | "leaderboard" | "submit" | "profile"

interface SplashPageProps {
    onNavigate: (page: PageType) => void
}

const SplashPage: React.FC<SplashPageProps> = ({ onNavigate }) => {
    const { handleAddFrame } = useFrameContext();
    return (
        <div className="min-h-screen relative overflow-hidden bg-dark-950">
            {/* Vibrant background with multiple gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,212,170,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,107,53,0.1),transparent_50%)]" />

            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
            />

            {/* Content */}
            <div className="relative z-10 p-6 pb-12">
                <div className="flex justify-end mb-4 pt-4">
                    <NavLink to="/about" className="flex items-center gap-2">
                        <button
                            onClick={() => { }}
                            className="flex items-center gap-2 px-4 py-2 glass-effect border border-gray-600/30 rounded-full text-gray-300 hover:text-white hover:border-teal-500/40 transition-all duration-300"
                        >
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">How It Works</span>
                        </button>
                    </NavLink>
                </div>
                {/* Header */}
                <div className="text-center mb-12 pt-12 animate-fade-in-up flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center w-fit h-fit p-10 bg-gradient-to-r from-teal-500/70 to-orange-500/70 rounded-2xl mb-8 shadow-2xl animate-rainbow-pulse">
                        <img src="https://res.cloudinary.com/dsrjjqkjs/image/upload/v1750750764/showmewhatyougot_cavvv1.png" className="h-[150px] w-[150px] m-auto" />
                        <span>Show me what you got</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-heading">
                        Farcaster's
                        <span className="block gradient-text mt-2">Got Talent</span>
                    </h1>
                    <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                    </p>
                </div>

                <div className="w-full flex items-center justify-center mb-10">
                    <Button className="w-full hover:cursor-pointer min-h-[50px]" variant="secondary" onClick={() => handleAddFrame()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Mini App
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto mb-8">
                    <div className="glass-effect rounded-2xl p-6 border border-gray-700/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Primary Actions */}
                            <div className="gap-y-2 flex flex-col">
                                {/* Watch & Vote */}
                                <NavLink to="/watch#">
                                    <button
                                        onClick={() => onNavigate("watch")}
                                        className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-teal-600/10 border border-teal-500/20 hover:from-teal-500/20 hover:to-teal-600/20 hover:border-teal-500/40 transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                                            <Play className="w-6 h-6 text-teal-400" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className="text-lg font-bold text-white font-heading">Watch & Vote</h3>
                                            <p className="text-sm text-gray-400">47 videos ready</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </NavLink>

                                {/* Submit Entry */}
                                <NavLink to="/submit#" className="!mt-2">
                                    <button
                                        onClick={() => onNavigate("submit")}
                                        className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 hover:from-orange-500/20 hover:to-orange-600/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                                            <Upload className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className="text-lg font-bold text-white font-heading">Submit Entry</h3>
                                            <p className="text-sm text-gray-400">5 days to submit</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </NavLink>
                            </div>

                            {/* Secondary Actions */}
                            <div className="space-y-4">
                                {/* Hall of Fame */}
                                <button
                                    onClick={() => onNavigate("leaderboard")}
                                    className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 hover:from-yellow-500/20 hover:to-yellow-600/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                                        <Trophy className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-bold text-white font-heading">Hall of Fame</h3>
                                        <p className="text-sm text-gray-400">Top performers</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* My Profile */}
                                <button
                                    onClick={() => onNavigate("profile")}
                                    className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-600/10 to-gray-700/10 border border-gray-600/20 hover:from-gray-600/20 hover:to-gray-700/20 hover:border-gray-600/40 transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-600/30 transition-colors">
                                        <User className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-bold text-white font-heading">My Profile</h3>
                                        <p className="text-sm text-gray-400">Track progress</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;