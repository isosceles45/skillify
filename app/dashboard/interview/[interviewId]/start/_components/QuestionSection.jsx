import { LightbulbIcon, VolumeIcon, Volume2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const QuestionSection = ({
    interviewQuestions,
    activeQuestionIndex,
    setActiveQuestionIndex,
}) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speakQuestion = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();

            const question = interviewQuestions[activeQuestionIndex]?.question;
            const utterance = new SpeechSynthesisUtterance(question);

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="p-6 bg-neutral-900/50 backdrop-blur-sm">
            {/* Question Navigation */}
            <div className="grid grid-cols-4 gap-3">
                {interviewQuestions &&
                    interviewQuestions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveQuestionIndex(index)}
                            className={`relative flex items-center justify-center w-100 h-10 rounded-lg transition-transform
                                ${
                                    activeQuestionIndex === index
                                        ? "bg-emerald-600 scale-105 shadow-lg shadow-emerald-600/30 text-neutral-50"
                                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                                }
                            `}
                            title={`Question ${index + 1}`}
                        >
                            <span className="text-sm font-medium">
                                Question. {index + 1}
                            </span>
                        </button>
                    ))}
            </div>

            {/* Current Question */}
            <div className="mt-8 p-6 rounded-lg bg-neutral-800 border border-neutral-700">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-semibold text-xl text-neutral-50">
                        {interviewQuestions &&
                            interviewQuestions[activeQuestionIndex]?.question}
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={isSpeaking ? stopSpeaking : speakQuestion}
                    >
                        {isSpeaking ? (
                            <Volume2Icon className="h-5 w-5 text-emerald-500 animate-pulse" />
                        ) : (
                            <VolumeIcon className="h-5 w-5 text-neutral-400 hover:text-emerald-500 transition-colors" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Information Box */}
            <div className="p-4 mt-8 rounded-lg border border-emerald-500/20 bg-emerald-950/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                    <LightbulbIcon className="h-5 w-5" />
                    <span>How to proceed</span>
                </div>
                <div className="mt-3 space-y-2">
                    <p className="text-sm text-emerald-200 leading-relaxed">
                        1. Take a moment to gather your thoughts about the
                        question
                    </p>
                    <p className="text-sm text-emerald-200 leading-relaxed">
                        2. Click "Record Answer" when you're ready to begin your
                        response
                    </p>
                    <p className="text-sm text-emerald-200 leading-relaxed">
                        3. After completing all questions, you'll receive
                        detailed feedback and model answers
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;
