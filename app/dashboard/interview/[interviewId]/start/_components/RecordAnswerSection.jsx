"use client";
import { WebcamIcon, MicIcon, StopCircleIcon } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebcam, WebcamProvider } from "../../page"; // Adjust this path based on your file structure

// Create a page wrapper component to handle the provider
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
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-neutral-50 mb-2">
                    Interview Question 1
                </h1>
                <p className="text-neutral-400">
                    Record your answer when you're ready
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <Card className="border-2 border-neutral-700 bg-neutral-800/50">
                        <CardContent className="p-4">
                            {isWebcamEnabled ? (
                                <div className="relative">
                                    <div className="flex justify-center mt-2">
                                        <Webcam
                                            onUserMedia={() =>
                                                setIsWebcamEnabled(true)
                                            }
                                            onUserMediaError={() =>
                                                setIsWebcamEnabled(false)
                                            }
                                            className="rounded-lg shadow-lg"
                                            style={{
                                                height: 400,
                                                width: 400,
                                            }}
                                            mirrored={true}
                                        />
                                        <div className="absolute bottom-4 left-4 bg-emerald-500 px-3 py-1 rounded-full text-xs text-white">
                                            Live
                                        </div>
                                        {isRecording && (
                                            <div className="absolute bottom-4 right-4 bg-red-500 px-3 py-1 rounded-full text-xs text-white flex items-center gap-2">
                                                <span className="animate-pulse h-2 w-2 bg-white rounded-full"></span>
                                                Recording
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                                    <div className="bg-neutral-700/50 p-8 rounded-2xl">
                                        <WebcamIcon className="h-32 w-32 text-neutral-400" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-neutral-200 mb-2">
                                            Camera Access Required
                                        </h3>
                                        <p className="text-sm text-neutral-400 mb-4">
                                            Please enable your camera to proceed
                                            with the interview
                                        </p>
                                        <button
                                            onClick={() =>
                                                setIsWebcamEnabled(true)
                                            }
                                            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
                                        >
                                            Enable Camera & Microphone
                                        </button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={
                                isRecording
                                    ? stopSpeechToText
                                    : startSpeechToText
                            }
                            disabled={!isWebcamEnabled}
                            className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg transition-all duration-200 ${
                                !isWebcamEnabled
                                    ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                                    : isRecording
                                    ? "bg-red-600 hover:bg-red-500 text-white"
                                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                            }`}
                        >
                            {isRecording ? (
                                <>
                                    <StopCircleIcon className="h-5 w-5" />
                                    Stop Recording
                                </>
                            ) : (
                                <>
                                    <MicIcon className="h-5 w-5" />
                                    Start Recording
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="border-2 border-neutral-700 bg-neutral-800/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-neutral-50">
                                Your Response
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="min-h-48 rounded-lg bg-neutral-900/50 p-4">
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
                                            Your response will appear here as
                                            you speak...
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-emerald-600/30 bg-emerald-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <MicIcon className="h-5 w-5 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-400">
                                    Recording Tips
                                </span>
                            </div>
                            <ul className="text-sm text-emerald-300 space-y-2">
                                <li>• Speak clearly and at a natural pace</li>
                                <li>• Keep your face visible in the camera</li>
                                <li>
                                    • You can pause and resume recording as
                                    needed
                                </li>
                                <li>
                                    • Review your response before submitting
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RecordAnswerPage;
