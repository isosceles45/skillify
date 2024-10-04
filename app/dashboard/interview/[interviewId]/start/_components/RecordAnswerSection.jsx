"use client";
import { WebcamIcon } from "lucide-react";
import React, { useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";

const RecordAnswerSection = () => {
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
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
        <div className="flex flex-col items-center">
            {isWebcamEnabled ? (
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center mt-6 border-2 rounded-md border-dotted border-neutral-50 px-10">
                        <Webcam
                            onUserMedia={() => setIsWebcamEnabled(true)}
                            onUserMediaError={() => setIsWebcamEnabled(false)}
                            style={{
                                height: 300,
                                width: 300,
                                borderRadius: "8px",
                            }}
                            mirrored={true}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <WebcamIcon className="h-72 w-full my-5 p-20 text-neutral-50 bg-neutral-700 rounded-lg border-2 border-neutral-500" />
                    <button
                        onClick={() => setIsWebcamEnabled(true)}
                        className="my-3 font-semibold underline text-neutral-50 rounded-md hover:text-emerald-500"
                    >
                        Enable Webcam & Microphone
                    </button>
                </div>
            )}
            <button className="inline-flex items-center px-4 py-3 mt-5 font-semibold border border-emerald-500 hover:bg-emerald-500 text-neutral-50 rounded-md">
                Record Answer
            </button>
                <h1 className="text-white">Recording: {isRecording.toString()}</h1>
                <button className="text-white"
                    onClick={isRecording ? stopSpeechToText : startSpeechToText}
                >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
                <ul className="text-white">
                    {results.map((result) => (
                        <li key={result.timestamp}>{result.transcript}</li>
                    ))}
                    {interimResult && <li>{interimResult}</li>}
                </ul>
        </div>
    );
};

export default RecordAnswerSection;
