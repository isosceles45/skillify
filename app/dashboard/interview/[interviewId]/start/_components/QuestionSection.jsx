import { LightbulbIcon } from "lucide-react";
import React from "react";

const QuestionSection = ({
    interviewQuestions,
    activeQuestionIndex,
    setActiveQuestionIndex,
}) => {
    return (
        <div className="p-5 border border-neutral-600 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {interviewQuestions &&
                    interviewQuestions.map((question, index) => (
                        <h2
                            key={index}
                            className={`p-3 m-2 rounded-full text-neutral-50 text-xs md:text-sm text-center font-semibold cursor-pointer ${
                                activeQuestionIndex === index
                                    ? "bg-emerald-500"
                                    : "bg-neutral-800"
                            }`}
                            onClick={() => setActiveQuestionIndex(index)}
                        >
                            Question #{index + 1}
                        </h2>
                    ))}
            </div>
            <h2 className="my-5 font-semibold text-neutral-50">
                {interviewQuestions &&
                    interviewQuestions[activeQuestionIndex]?.question}
            </h2>
            <div className="p-2 mt-10 border rounded-lg border-emerald-600 bg-emerald-900">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                    <LightbulbIcon className="h-4 w-4" />
                    <span>Information</span>
                </div>
                <p className="mt-2 text-sm text-emerald-300">
                    Click on "Record Answer" when you're ready to answer the
                    question. After the interview, you'll receive feedback along
                    with the correct answers for each question to compare with
                    your responses.
                </p>
            </div>
        </div>
    );
};

export default QuestionSection;
