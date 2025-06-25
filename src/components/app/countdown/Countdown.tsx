import React, { useState, useEffect } from "react"

interface CountdownProps {
    targetTimestamp: number // Unix timestamp in milliseconds
    title: string;
    endMessage: string;
    className?: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const Countdown: React.FC<CountdownProps> = ({ targetTimestamp, title, endMessage, className = "" }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [isExpired, setIsExpired] = useState(false)

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = Date.now()
            const difference = targetTimestamp - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({ days, hours, minutes, seconds })
                setIsExpired(false)
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                setIsExpired(true)
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetTimestamp])

    const formatNumber = (num: number) => num.toString().padStart(2, "0")

    if (isExpired) {
        return (
            <div className={`bg-gradient-to-r from-teal-500/80 to-orange-500/80 rounded-3xl p-6 text-center ${className}`}>
                <div className="text-white text-2xl font-bold">{"Time's Up!"}</div>
                <div className="text-white/80 text-sm mt-2">{endMessage}</div>
            </div>
        )
    }

    return (
        <div className={`bg-gradient-to-r from-teal-500/80 to-orange-500/80 rounded-3xl p-6 ${className}`}>
            <div className="text-center mb-4">
                <div className="text-white text-lg font-semibold mb-1">{title}</div>
            </div>

            <div className="flex justify-center items-center gap-4">
                {timeLeft.days > 0 && (
                    <>
                        <div className="text-center">
                            <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[30px]">
                                <div className="text-white text-2xl font-bold font-mono">{formatNumber(timeLeft.days)}</div>
                            </div>
                            <div className="text-white/80 text-xs mt-1 font-medium">DAYS</div>
                        </div>
                    </>
                )}

                <div className="text-center">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[30px]">
                        <div className="text-white text-2xl font-bold font-mono">{formatNumber(timeLeft.hours)}</div>
                    </div>
                    <div className="text-white/80 text-xs mt-1 font-medium">HRS</div>
                </div>

                <div className="text-center">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[30px]">
                        <div className="text-white text-2xl font-bold font-mono">{formatNumber(timeLeft.minutes)}</div>
                    </div>
                    <div className="text-white/80 text-xs mt-1 font-medium">MIN</div>
                </div>


                <div className="text-center">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[30px]">
                        <div className="text-white text-2xl font-bold font-mono">{formatNumber(timeLeft.seconds)}</div>
                    </div>
                    <div className="text-white/80 text-xs mt-1 font-medium">SEC</div>
                </div>
            </div>
        </div>
    )
}


export default Countdown;