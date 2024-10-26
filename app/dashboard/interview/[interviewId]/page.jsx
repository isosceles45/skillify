"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LightbulbIcon, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Create WebcamContext
const WebcamContext = createContext();

// Create WebcamProvider component
export const WebcamProvider = ({ children }) => {
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);

    return (
        <WebcamContext.Provider value={{ isWebcamEnabled, setIsWebcamEnabled }}>
            {children}
        </WebcamContext.Provider>
    );
};

// Custom hook to use webcam context
export const useWebcam = () => {
    const context = useContext(WebcamContext);
    if (!context) {
        throw new Error("useWebcam must be used within a WebcamProvider");
    }
    return context;
};

// WebcamSection component
const WebcamSection = ({ isWebcamEnabled, setIsWebcamEnabled }) => {
    if (isWebcamEnabled) {
        return (
            <Card className="border-2 border-neutral-700 bg-neutral-800/50">
                <CardContent className="p-4">
                    <div className="flex justify-center mt-2">
                        <div className="relative">
                            <Webcam
                                onUserMedia={() => setIsWebcamEnabled(true)}
                                onUserMediaError={() => setIsWebcamEnabled(false)}
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
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-2 border-neutral-700 bg-neutral-800/50">
            <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-neutral-700/50 p-8 rounded-2xl">
                        <WebcamIcon className="h-32 w-32 text-neutral-400" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-neutral-200 mb-2">
                            Camera Access Required
                        </h3>
                        <p className="text-sm text-neutral-400 mb-4">
                            Please enable your camera to proceed with the interview
                        </p>
                        <button
                            onClick={() => setIsWebcamEnabled(true)}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
                        >
                            Enable Camera & Microphone
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// Page wrapper with provider
export default function InterviewPage({ params }) {
    return (
        <WebcamProvider>
            <Interview params={params} />
        </WebcamProvider>
    );
}

// Interview component
function Interview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const { isWebcamEnabled, setIsWebcamEnabled } = useWebcam();

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        const res = await db
            .select()
            .from(mockInterview)
            .where(eq(mockInterview.mockId, params.interviewId));
        setInterviewData(res[0]);
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-neutral-50 mb-2">
                    Mock Interview Setup
                </h1>
                <p className="text-neutral-400">
                    Prepare yourself for the interview and ensure your camera is working
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="order-2 lg:order-1">
                    <WebcamSection
                        isWebcamEnabled={isWebcamEnabled}
                        setIsWebcamEnabled={setIsWebcamEnabled}
                    />
                </div>

                <div className="order-1 lg:order-2 space-y-6">
                    <Card className="border-2 border-neutral-700 bg-neutral-800/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-neutral-50">
                                Interview Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-neutral-400">
                                    Job Role
                                </h3>
                                <p className="text-lg text-neutral-50">
                                    {interviewData?.jobRole}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-neutral-400">
                                    Tech Stack & Requirements
                                </h3>
                                <p className="text-lg text-neutral-50">
                                    {interviewData?.jobDesc}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-neutral-400">
                                    Experience Required
                                </h3>
                                <p className="text-lg text-neutral-50">
                                    {interviewData?.jobExp} years
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-emerald-600/30 bg-emerald-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <LightbulbIcon className="h-5 w-5 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-400">
                                    Important Information
                                </span>
                            </div>
                            <p className="text-sm text-emerald-300 mb-3">
                                This mock interview consists of 5 questions. Your responses
                                will be analyzed to provide comprehensive feedback on your
                                interview performance.
                            </p>
                            <p className="text-xs text-emerald-400">
                                Your privacy is important to us. We do not record or store
                                any video data from your session.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <button
                        className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 ${
                            isWebcamEnabled
                                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                                : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        }`}
                        disabled={!isWebcamEnabled}
                    >
                        {isWebcamEnabled
                            ? "Start Interview"
                            : "Enable Camera to Continue"}
                    </button>
                </Link>
            </div>
        </div>
    );
}