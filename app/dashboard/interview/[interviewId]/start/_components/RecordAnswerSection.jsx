import { WebcamIcon, MicIcon, StopCircleIcon, InfoIcon } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWebcam, WebcamProvider } from "../../page";

const RecordAnswerPage = () => {
    return (
        <WebcamProvider>
            <RecordAnswerSection />
        </WebcamProvider>
    );
};

const RecordAnswerSection = () => {
    const { isWebcamEnabled, setIsWebcamEnabled } = useWebcam();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    return (
        <div className="container mx-auto max-w-5xl p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Webcam Section */}
                <div>
                    <Card className="border border-neutral-700 bg-neutral-800/50">
                        <CardContent className="p-3">
                            {isWebcamEnabled ? (
                                <div className="relative">
                                    <Webcam
                                        onUserMedia={() =>
                                            setIsWebcamEnabled(true)
                                        }
                                        onUserMediaError={() =>
                                            setIsWebcamEnabled(false)
                                        }
                                        className="rounded-lg w-full aspect-video object-cover"
                                        mirrored={true}
                                    />
                                    <div className="absolute bottom-3 left-3 bg-emerald-500/90 px-2 py-0.5 rounded-full text-xs text-white">
                                        Live
                                    </div>
                                    {isRecording && (
                                        <div className="absolute bottom-3 right-3 bg-red-500/90 px-2 py-0.5 rounded-full text-xs text-white flex items-center gap-1.5">
                                            <span className="animate-pulse h-1.5 w-1.5 bg-white rounded-full"></span>
                                            Recording
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                                    <div className="bg-neutral-700/50 p-6 rounded-xl">
                                        <WebcamIcon className="h-20 w-20 text-neutral-400" />
                                    </div>
                                    <div className="text-center px-4">
                                        <h3 className="text-base font-semibold text-neutral-200 mb-2">
                                            Camera Access Required
                                        </h3>
                                        <p className="text-sm text-neutral-400 mb-3">
                                            Enable camera access to proceed
                                        </p>
                                        <Button
                                            onClick={() =>
                                                setIsWebcamEnabled(true)
                                            }
                                            className="bg-emerald-600 hover:bg-emerald-500"
                                        >
                                            Enable Camera
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="mt-4 flex items-center justify-center gap-3">
                        <Button
                            onClick={
                                isRecording
                                    ? stopSpeechToText
                                    : startSpeechToText
                            }
                            disabled={!isWebcamEnabled}
                            variant={isRecording ? "destructive" : "default"}
                            className={`${
                                !isWebcamEnabled
                                    ? "bg-neutral-700 text-neutral-400"
                                    : isRecording
                                    ? "bg-red-600 hover:bg-red-500"
                                    : "bg-emerald-600 hover:bg-emerald-500"
                            }`}
                        >
                            {isRecording ? (
                                <>
                                    <StopCircleIcon className="h-4 w-4 mr-2" />
                                    Stop
                                </>
                            ) : (
                                <>
                                    <MicIcon className="h-4 w-4 mr-2" />
                                    Record
                                </>
                            )}
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="h-10 w-10 bg-neutral-800 hover:bg-neutral-700" size="icon">
                                    <InfoIcon className="h-4 w-4 text-neutral-100" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-neutral-800 text-white">
                                <DialogHeader>
                                    <DialogTitle className="text-emerald-500">
                                        Recording Tips
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3">
                                    <p className="text-sm text-neutral-400">
                                        Follow these guidelines for the best
                                        results:
                                    </p>
                                    <ul className="text-sm text-neutral-200 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            Speak clearly at a natural pace
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            Ensure good lighting and camera
                                            positioning
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            You can pause and resume as needed
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            Review your response before
                                            submitting
                                        </li>
                                    </ul>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Response Section */}
                <div>
                    <Card className="border border-neutral-700 bg-neutral-800/50">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-medium text-neutral-200 mb-3">
                                Your Response
                            </h2>
                            <div className="min-h-[300px] rounded-lg bg-neutral-900/50 p-4">
                                {results.length > 0 || interimResult ? (
                                    <div className="space-y-2">
                                        {results.map((result) => (
                                            <p
                                                key={result.timestamp}
                                                className="text-neutral-200"
                                            >
                                                {result.transcript}
                                            </p>
                                        ))}
                                        {interimResult && (
                                            <p className="text-neutral-400 italic">
                                                {interimResult}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-neutral-500 text-center py-8">
                                        Your response will appear here as you
                                        speak...
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RecordAnswerPage;