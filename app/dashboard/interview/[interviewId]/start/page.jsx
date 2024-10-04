"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
    const [interviewData, setInterviewData] = useState();
    const [interviewQuestions, setInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        const res = await db
            .select()
            .from(mockInterview)
            .where(eq(mockInterview.mockId, params.interviewId));
        setInterviewData(res[0]);
        const jsonMockResponse = JSON.parse(res[0]?.mockResponse);
        setInterviewQuestions(jsonMockResponse?.interview_questions);
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                {/* Questions */}

                <RecordAnswerSection />

                <QuestionSection
                    interviewQuestions={interviewQuestions}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                />

                {/* Video/ Audio Recording */}
            </div>
        </div>
    );
};

export default StartInterview;
