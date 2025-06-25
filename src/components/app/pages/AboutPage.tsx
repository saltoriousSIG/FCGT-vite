import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, ArrowLeft, Upload, Trophy, Users, Calendar, Star, CheckCircle, Zap, Heart } from "lucide-react"
import { NavLink } from "react-router-dom"

interface AboutPageProps {
    onBack: () => void
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
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
                        <h1 className="text-xl font-bold text-white font-heading">How It Works</h1>
                        <p className="text-sm text-gray-400">Everything you need to know</p>
                    </div>
                </div>
            </div>

            <div className="p-6 max-w-4xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="text-center py-8 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-orange-500 rounded-2xl mb-6 animate-rainbow-pulse">
                        <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4 font-heading">
                        Welcome to <span className="gradient-text">Farcaster's Got Talent</span>
                    </h2>
                </div>

                {/* How It Works Steps */}
                <div className="grid gap-6">
                    <Card className="glass-effect border-teal-500/20 animate-slide-in-right">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3 font-heading">
                                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-teal-400" />
                                </div>
                                Weekly Competitions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300 space-y-4">
                            <p>
                                Every week, we launch a new themed talent competition. From dance and music to comedy and magic, each
                                week celebrates a different form of creative expression.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass-effect border-orange-500/20 animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3 font-heading">
                                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-orange-400" />
                                </div>
                                Submit Your Talent
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300 space-y-4">
                            <p className="mb-6">
                                Got skills? Time to prove it! Submit your best 60-second video and compete for real USDC prizes.
                                Pay $15 USDC to enter - your fee goes directly into the prize pool that winners split.
                            </p>

                            <div className="grid md:grid-cols-3 gap-3">
                                <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <Upload className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Submit Entry</p>
                                    <p className="text-xs text-gray-400">$15 USDC + video of your talent</p>
                                </div>

                                <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <Star className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Community Votes</p>
                                    <p className="text-xs text-gray-400">$0.50 per vote</p>
                                </div>

                                <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <CheckCircle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Win Prizes</p>
                                    <p className="text-xs text-gray-400">Top 3 split 70% of pool</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-effect border-yellow-500/20 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3 font-heading">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-yellow-400" />
                                </div>
                                Community Voting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300 space-y-4">
                            <p>
                                The power is in your hands! Watch submissions and vote for your favorites.
                                Your $0.50 votes directly fund the prize pool, and you can vote up to 3 times per show.
                            </p>
                            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                                <h4 className="font-semibold text-white mb-2">How Voting Works</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• Pay $0.50 USDC per vote</li>
                                    <li>• One discounted vote via the $TLNT token</li>
                                    <li>• Vote up to 3 times per show</li>
                                    <li>• First vote can use discounted $TLNT</li>
                                    <li>• Your votes fund creator prizes</li>
                                    <li>• Earn $TLNT airdrops for participating</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-effect border-teal-500/20 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3 font-heading">
                                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-teal-400" />
                                </div>
                                Winners & Rewards
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300 space-y-4">
                            <p>
                                Top 3 creators split 70% of all USDC collected from entries and votes.
                                The remaining 30% goes to $TLNT token buybacks. Everyone who participates earns $TLNT token airdrops.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                                    <h4 className="font-semibold text-white mb-2">USDC Prizes</h4>
                                    <p className="text-sm">🥇 1st Place: ~50% of prize pool</p>
                                    <p className="text-sm">🥈 2nd Place: ~30% of prize pool</p>
                                    <p className="text-sm">🥉 3rd Place: ~20% of prize pool</p>
                                </div>
                                <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                                    <h4 className="font-semibold text-white mb-2">$TLNT Airdrops</h4>
                                    <p className="text-sm">🎨 Creators: Token rewards for participating</p>
                                    <p className="text-sm">🗳️ Voters: Rewards for community engagement</p>
                                    <p className="text-sm">💰 30% of revenue goes to token buybacks</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-effect border-teal-500/20 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3 font-heading">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Coins className="w-5 h-5 text-purple-400" />
                                </div>
                                The $TLNT Token
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300 space-y-4">
                            <p>
                                $TLNT is our platform token that powers the talent show ecosystem.
                                It's earned through participation and has utility within the platform, with consistent buyback pressure from show revenues.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                                    <h4 className="font-semibold text-white mb-2">How You Earn $TLNT</h4>
                                    <p className="text-sm">🎭 Submit content: Airdrop rewards</p>
                                    <p className="text-sm">🗳️ Vote on shows: Participation rewards</p>
                                    <p className="text-sm">🎯 Quality contributions: Bonus distributions</p>
                                </div>
                                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                                    <h4 className="font-semibold text-white mb-2">Token Utility</h4>
                                    <p className="text-sm">💸 Discounted voting (once per show)</p>
                                    <p className="text-sm">✅ Creator verification badges</p>
                                    <p className="text-sm">🔥 30% of revenue: buybacks + burn</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* Community Guidelines */}
                <Card className="glass-effect border-gray-600/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-3 font-heading">
                            <div className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-gray-300" />
                            </div>
                            Community Guidelines
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-white mb-3">✅ What We Love</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>• Original content and authentic performances</li>
                                    <li>• Supportive and encouraging community</li>
                                    <li>• Creative expression in all its forms</li>
                                    <li>• Respectful feedback and constructive comments</li>
                                    <li>• Celebrating diversity and inclusion</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-3">❌ Not Allowed</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>• Inappropriate or offensive content</li>
                                    <li>• Copyrighted material without permission</li>
                                    <li>• Harassment or bullying behavior</li>
                                    <li>• Spam or promotional content</li>
                                    <li>• Content that violates platform rules</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Call to Action */}
                <div className="text-center py-8">
                    <h3 className="text-2xl font-bold text-white mb-4 font-heading">Ready to Show Your Talent?</h3>
                    <p className="text-gray-300 mb-6">
                        Join thousands of creators in the most exciting talent community on Farcaster!
                    </p>
                    <Button
                        onClick={onBack}
                        className="bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold px-8 py-3 text-lg"
                    >
                        Get Started Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AboutPage; 
