import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import JobForm from "./_components/JobForm";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-neutral-900 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-neutral-50">
                        Dashboard
                    </h1>
                    <p className="text-neutral-400">
                        Prepare for your next interview with AI assistance
                    </p>
                </div>

                {/* Main Card */}
                <Card className="shadow-lg bg-neutral-900 border-neutral-700">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <Briefcase className="h-5 w-5 text-emerald-500" />
                            <CardTitle className="text-2xl font-semibold text-neutral-50">
                                AI Mock Interview
                            </CardTitle>
                        </div>
                        <CardDescription className="text-neutral-400">
                            Practice your interview skills with our AI-powered
                            mock interview system. Get real-time feedback and
                            improve your performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-neutral-900 rounded-lg">
                            <JobForm />
                        </div>
                    </CardContent>
                </Card>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <Card className="shadow-md bg-neutral-900 border-neutral-700 hover:border-emerald-500/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg text-neutral-50">
                                Real-time Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-400">
                                Get instant feedback on your responses and
                                communication style
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md bg-neutral-900 border-neutral-700 hover:border-emerald-500/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg text-neutral-50">
                                Industry Specific
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-400">
                                Questions tailored to your industry and role
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md bg-neutral-900 border-neutral-700 hover:border-emerald-500/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg text-neutral-50">
                                Performance Analytics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-400">
                                Track your progress and identify areas for
                                improvement
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;