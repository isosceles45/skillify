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
            <div className="p-4 mt-16 border rounded-lg border-emerald-600 bg-emerald-900">
                <h2 className="flex gap-2 items-center font-semibold text-emerald-200">
                    <strong>
                        <LightbulbIcon />
                    </strong>
                    Information
                </h2>
                <h2 className="flex flex-col items-center text-emerald-300 mt-2">
                    Click on Record Answer when you want to answer the question.
                    At the end of interview we will give you the feedback along
                    with correct answer for each of question and your answer to
                    comapre it.
                </h2>
            </div>
        </div>
    );
};

export default QuestionSection;
