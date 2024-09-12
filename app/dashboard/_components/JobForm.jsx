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

const JobForm = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experience, setExperience] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(jobPosition, jobDescription, experience);
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
                                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-base rounded-md"
                                    >
                                        Start Interview
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
