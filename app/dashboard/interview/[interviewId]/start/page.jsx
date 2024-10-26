"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Loader2 } from "lucide-react";

const StartInterview = ({ params }) => {
    const [interviewData, setInterviewData] = useState(null);
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getInterviewDetails();
    }, [params.interviewId]);

    const getInterviewDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await db
                .select()
                .from(mockInterview)
                .where(eq(mockInterview.mockId, params.interviewId));

            if (!res || res.length === 0) {
                throw new Error("Interview not found");
            }

            setInterviewData(res[0]);

            try {
                const mockResponse = res[0]?.mockResponse;

                if (Array.isArray(mockResponse)) {
                    setInterviewQuestions(mockResponse);
                    return;
                }

                if (typeof mockResponse === "string") {
                    let parsedQuestions;
                    try {
                        parsedQuestions = JSON.parse(mockResponse);
                    } catch (e) {
                        const cleanedResponse = mockResponse.replace(
                            /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
                            '$1"$2":'
                        );
                        parsedQuestions = JSON.parse(cleanedResponse);
                    }

                    if (Array.isArray(parsedQuestions)) {
                        setInterviewQuestions(parsedQuestions);
                    } else if (parsedQuestions.interview_questions) {
                        setInterviewQuestions(
                            parsedQuestions.interview_questions
                        );
                    } else if (parsedQuestions.questions) {
                        setInterviewQuestions(parsedQuestions.questions);
                    } else {
                        const questionsArray = Object.values(
                            parsedQuestions
                        ).filter(
                            (q) =>
                                typeof q === "object" &&
                                (q.question || q.prompt)
                        );
                        if (questionsArray.length > 0) {
                            setInterviewQuestions(questionsArray);
                        } else {
                            throw new Error(
                                "Could not find questions in the response"
                            );
                        }
                    }
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                setError(
                    "Failed to load interview questions. Please try again."
                );
            }
        } catch (err) {
            console.error("Database Error:", err);
            setError(err.message || "Failed to load interview data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 bg-neutral-900 p-8 rounded-lg border border-neutral-700">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
                    <p className="text-neutral-400 text-lg">
                        Preparing your interview questions...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-700 text-center space-y-4">
                    <p className="text-red-400 font-medium text-lg">{error}</p>
                    <button
                        onClick={getInterviewDetails}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-8 shadow-lg">
                    <h3 className="text-lg md:text-3xl font-bold text-neutral-50 mb-4">
                        {interviewData?.jobRole} Interview
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-neutral-400">
                        <p className="flex items-center">
                            <span className="font-medium mr-2">
                                Experience Level:
                            </span>
                            {interviewData?.jobExp} years
                        </p>
                        <p className="flex items-center">
                            <span className="font-medium mr-2">Created:</span>
                            {interviewData?.createdAt}
                        </p>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-neutral-400 font-medium">
                            Question {activeQuestionIndex + 1} of{" "}
                            {interviewQuestions?.length || 0}
                        </span>
                        <span className="text-emerald-500 font-semibold">
                            {Math.round(
                                ((activeQuestionIndex + 1) /
                                    (interviewQuestions?.length || 1)) *
                                    100
                            )}
                            % Complete
                        </span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                            style={{
                                width: `${
                                    ((activeQuestionIndex + 1) /
                                        (interviewQuestions?.length || 1)) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recording Section */}
                    <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-8 shadow-lg h-fit">
                        <RecordAnswerSection />
                    </div>

                    {/* Questions Section */}
                    <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-8 shadow-lg">
                        <QuestionSection
                            interviewQuestions={interviewQuestions}
                            activeQuestionIndex={activeQuestionIndex}
                            setActiveQuestionIndex={setActiveQuestionIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartInterview;
