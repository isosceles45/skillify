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
import { LoaderPinwheel } from "lucide-react";
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
                if(resp) {
                    setOpenDialog(false);
                    router.push("/dashboard/interview/" +resp[0]?.mockId);
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
                className="p-8 rounded-lg bg-neutral-800 hover:scale-105 hover:shadow-sm hover:shadow-neutral-700 transition-all cursor-pointer"
            >
                <h2 className="text-gray-100 text-center text-lg">+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Tell us more about the job you are interviewing
                        </DialogTitle>
                        <DialogDescription className="space-y-4">
                            <form className="space-y-5" onSubmit={onSubmit}>
                                <div className="text-base text-gray-600">
                                    Add details about the job position, your
                                    skills, and years of experience
                                </div>
                                <div>
                                    <label className="block text-base mb-1 font-medium text-gray-700">
                                        Job Position/Role name
                                    </label>
                                    <Input
                                        value={jobPosition}
                                        onChange={(e) =>
                                            setJobPosition(e.target.value)
                                        }
                                        placeholder="Enter Job Role"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-base mb-1 font-medium text-gray-700">
                                        Job Description / Tech Stack in Short
                                    </label>
                                    <Textarea
                                        value={jobDescription}
                                        onChange={(e) =>
                                            setJobDescription(e.target.value)
                                        }
                                        placeholder="Describe the role in brief"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-base mb-1 font-medium text-gray-700">
                                        No of Years Experience
                                    </label>
                                    <Input
                                        value={experience}
                                        onChange={(e) =>
                                            setExperience(e.target.value)
                                        }
                                        placeholder="Enter years of experience"
                                        type="number"
                                        max={50}
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-5">
                                    <button
                                        type="button"
                                        onClick={() => setOpenDialog(false)}
                                        className="px-4 py-2 border border-emerald-700 hover:bg-gray-100 text-emerald-700 text-base rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-base rounded-md w-40 flex items-center justify-center"
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
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default JobForm;
