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
    const [isWebcamEnabled, setIsWebcamEnabled] = useState();

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
                            <Webcam
                                onUserMedia={() => setIsWebcamEnabled(true)}
                                onUserMediaError={() =>
                                    setIsWebcamEnabled(false)
                                }
                                style={{
                                    height: 300,
                                    width: 300,
                                }}
                                mirrored={true}
                            />
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
                </div>
                <div className=" flex flex-col my-5 gap-5">
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
                    <div className="p-4 border rounded-lg border-emerald-600 bg-emerald-900">
                        <h2 className="flex gap-2 items-center text-lg font-bold text-emerald-200">
                            <strong>
                                <LightbulbIcon />
                            </strong>
                            Information
                        </h2>
                        <h2 className="flex flex-col items-center text-emerald-300 mt-2">
                            <p>
                                Enable Video Web Cam and Microphone to Start
                                your Al Generated Mock Interview, It Has 5
                                question which you can answer and at the last
                                you will get the report on the basis of your
                                answer.
                            </p>
                            NOTE: We never record your video, Web cam access you
                            can disable at any time if you want
                        </h2>
                    </div>
                </div>
            </div>
            <Link href={'/dashboard/interview/'+params.interviewId+"/start"}>
                <button className="px-4 py-3 mt-5 font-semibold border border-emerald-500 hover:bg-emerald-500 text-neutral-50 rounded-md w-100">
                    Start Interview
                </button>
            </Link>
        </div>
    );
}

export default Interview;
