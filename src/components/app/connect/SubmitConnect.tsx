import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "lucide-react";

interface SubmitConnectProps {
    onConnect: () => void;
}

const SubmitConnect: React.FC<SubmitConnectProps> = ({ onConnect }) => {
    return (
        <div className="text-center py-8 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-orange-500 rounded-2xl mb-4">
                <Link className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white font-heading">Connect Required</h3>
                <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                    You must connect your Farcaster account to submit entries and unlock the full potential of your
                    submissions
                </p>
            </div>

            <Card className="bg-teal-500/10 border-teal-500/30 text-left max-w-lg mx-auto">
                <CardContent className="p-6">
                    <h4 className="font-semibold text-white mb-3 font-heading">Why Connect?</h4>
                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p>All submissions will also be casted to your feed</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p>Votes can be added as likes to boost your cast engagement</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p>Comments in app are replies to the cast in your feed</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p>This boosts engagement to your profile for everything you cast within the app</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-3">
                <Button
                    onClick={onConnect}
                    className="w-full max-w-sm bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white font-semibold py-3"
                >
                    Connect Farcaster Account
                </Button>
            </div>
        </div>
    )
}

export default SubmitConnect;