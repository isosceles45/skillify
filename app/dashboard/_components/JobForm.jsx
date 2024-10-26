"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiModel";
import { LoaderPinwheel, Plus } from "lucide-react";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const JobForm = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, experience(in years): ${experience}. Based on these attributes generate 5 interview questions which are up to date to industry standards, no need of placeholders in answer. The JSON fields will be question, answer and reference link of the answer`;

        try {
            setLoading(true);
            const result = await chatSession.sendMessage(inputPrompt);
            const questionsMock = JSON.parse(result.response.text());
            setQuestions(questionsMock);

            if (result) {
                const resp = await db
                    .insert(mockInterview)
                    .values({
                        mockId: uuidv4(),
                        mockResponse: questionsMock,
                        jobRole: jobPosition,
                        jobDesc: jobDescription,
                        jobExp: experience,
                        createdBy: user.primaryEmailAddress.emailAddress,
                        createdAt: moment().format("DD-MM-YYYY"),
                    })
                    .returning({ mockId: mockInterview.mockId });
                if (resp) {
                    setOpenDialog(false);
                    router.push("/dashboard/interview/" + resp[0]?.mockId);
                }
            } else {
                console.error("Error fetching data!");
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            console.error();
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                onClick={() => setOpenDialog(true)}
                className="p-8 rounded-lg bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all cursor-pointer group"
            >
                <div className="flex flex-col items-center gap-2">
                    <Plus className="h-8 w-8 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                    <h2 className="text-neutral-300 group-hover:text-neutral-50 transition-colors text-lg font-medium">
                        Create New Interview
                    </h2>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-xl bg-neutral-900 border-neutral-700">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-2xl text-neutral-50">
                            Create AI Mock Interview
                        </DialogTitle>
                        <DialogDescription className="text-neutral-400 text-base">
                            Add details about the job position and your
                            experience to generate relevant interview questions.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-6 mt-4" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-neutral-200">
                                    Job Position/Role
                                </label>
                                <Input
                                    value={jobPosition}
                                    onChange={(e) =>
                                        setJobPosition(e.target.value)
                                    }
                                    placeholder="e.g. Senior Frontend Developer"
                                    className="bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:ring-emerald-500 focus:border-emerald-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-neutral-200">
                                    Job Description / Tech Stack
                                </label>
                                <Textarea
                                    value={jobDescription}
                                    onChange={(e) =>
                                        setJobDescription(e.target.value)
                                    }
                                    placeholder="Describe the role requirements and tech stack"
                                    className="bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:ring-emerald-500 focus:border-emerald-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-neutral-200">
                                    Years of Experience
                                </label>
                                <Input
                                    value={experience}
                                    onChange={(e) =>
                                        setExperience(e.target.value)
                                    }
                                    placeholder="Enter years of experience"
                                    type="number"
                                    max={50}
                                    className="bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:ring-emerald-500 focus:border-emerald-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setOpenDialog(false)}
                                className="px-4 py-2 border border-neutral-700 hover:bg-neutral-800 text-neutral-300 hover:text-neutral-100 text-sm font-medium rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg w-40 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoaderPinwheel className="animate-spin h-5 w-5" />
                                ) : (
                                    "Start Interview"
                                )}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default JobForm;
