"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LightbulbIcon, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);

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
        <div className="my-8 flex justify-center flex-col items-center">
            <h2 className="font-bold text-2xl text-neutral-50">
                Let's start your interview!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    {isWebcamEnabled ? (
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex justify-center mt-6 border-2 rounded-lg border-dotted border-neutral-50">
                                <Webcam
                                    onUserMedia={() => setIsWebcamEnabled(true)}
                                    onUserMediaError={() =>
                                        setIsWebcamEnabled(false)
                                    }
                                    className="rounded-lg"
                                    style={{
                                        height: 300,
                                        width: 300,
                                    }}
                                    mirrored={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <WebcamIcon className="h-72 w-72 my-5 p-20 text-neutral-50 bg-neutral-700 rounded-lg border-2 border-neutral-500" />
                            <button
                                onClick={() => setIsWebcamEnabled(true)}
                                className="my-3 font-semibold underline text-neutral-50 rounded-md hover:text-emerald-500"
                            >
                                Enable Webcam & Microphone
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col my-5 gap-5">
                    <div className="bg-neutral-800 flex flex-col p-5 gap-3 rounded-lg">
                        <h2 className="text-lg text-neutral-50">
                            <strong>Job Role: </strong>
                            {interviewData?.jobRole}
                        </h2>
                        <h2 className="text-lg text-neutral-50">
                            <strong>Job Description/ Tech Stack: </strong>
                            {interviewData?.jobDesc}
                        </h2>
                        <h2 className="text-lg text-neutral-50">
                            <strong>Years of Experience: </strong>
                            {interviewData?.jobExp}
                        </h2>
                    </div>
                    <div className="p-3 mt-10 border rounded-lg border-emerald-600 bg-emerald-900">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                            <LightbulbIcon className="h-4 w-4" />
                            <span>Information</span>
                        </div>
                        <p className="mt-2 text-sm text-emerald-300">
                            Enable video webcam and microphone to start your
                            AI-generated mock interview. It has 5 questions
                            which you can answer, and at the end, you will
                            receive a report based on your answers.
                        </p>
                        <p className="mt-2 text-xs text-emerald-400">
                            NOTE: We never record your video. Webcam access can
                            be disabled at any time.
                        </p>
                    </div>
                </div>
            </div>
            <Link
                href={"/dashboard/interview/" + params.interviewId + "/start"}
            >
                <button className="px-4 py-3 mt-5 font-semibold border border-emerald-500 hover:bg-emerald-500 text-neutral-50 rounded-md w-auto">
                    Start Interview
                </button>
            </Link>
        </div>
    );
}

export default Interview;
