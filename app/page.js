import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ArrowRight, Code2, Brain, MessageSquare, Shield } from "lucide-react";
import Header from "./dashboard/_components/Header";
import NextLogo from "/public/nextjs_icon.svg";
import DrizzleLogo from "/public/drizzle_logo.jpg";
import GeminiLogo from "/public/gemini_logo.png";
import ClerkLogo from "/public/clerk_logo.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-neutral-900">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center">
                <div
                    className="absolute inset-0 opacity-25 bg-neutral-900/90 blur-sm"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                            Master Your Tech Interviews with AI
                        </h1>
                        <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
                            Practice with our AI-powered platform that provides
                            real-time feedback and simulates realistic interview
                            scenarios to boost your confidence.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/dashboard">
                                <Button
                                    size="lg"
                                    className="bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200"
                                >
                                    Get Started{" "}
                                    <ArrowRight className="ml-2" size={20} />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white text-neutral-900 hover:bg-neutral-100 border-2 border-white transform hover:scale-105 transition-all duration-200"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-24">
                <h2 className="text-4xl font-bold text-white text-center mb-16">
                    Powered by Advanced Technology
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="bg-neutral-800 border-neutral-700 hover:border-emerald-500 transition-all duration-300">
                        <CardHeader>
                            <Brain className="h-12 w-12 text-emerald-500 mb-4" />
                            <CardTitle className="text-white">
                                Gemini AI Integration
                            </CardTitle>
                            <CardDescription className="text-neutral-300">
                                Leverage Google's most advanced AI for
                                personalized interview preparation and feedback
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-neutral-800 border-neutral-700 hover:border-emerald-500 transition-all duration-300">
                        <CardHeader>
                            <Code2 className="h-12 w-12 text-emerald-500 mb-4" />
                            <CardTitle className="text-white">
                                Real-time Code Analysis
                            </CardTitle>
                            <CardDescription className="text-neutral-300">
                                Get instant feedback on your code with detailed
                                suggestions and best practices
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-neutral-800 border-neutral-700 hover:border-emerald-500 transition-all duration-300">
                        <CardHeader>
                            <MessageSquare className="h-12 w-12 text-emerald-500 mb-4" />
                            <CardTitle className="text-white">
                                Interactive Scenarios
                            </CardTitle>
                            <CardDescription className="text-neutral-300">
                                Practice with company-specific interview
                                simulations and custom scenarios
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-neutral-800 border-neutral-700 hover:border-emerald-500 transition-all duration-300">
                        <CardHeader>
                            <Shield className="h-12 w-12 text-emerald-500 mb-4" />
                            <CardTitle className="text-white">
                                Security & Privacy
                            </CardTitle>
                            <CardDescription className="text-neutral-300">
                                Enterprise-grade encryption and compliance with
                                modern privacy standards
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="bg-neutral-800 py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        Built with Modern Technology
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="p-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-all duration-200 transform hover:scale-105">
                            <Image
                                src={NextLogo}
                                alt="Next.js"
                                width={48}
                                height={48}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-white font-semibold mb-2">
                                Next.js
                            </h3>
                            <p className="text-neutral-300">
                                Enterprise-grade React framework offering
                                optimal performance through server-side
                                rendering and static generation
                            </p>
                        </div>
                        <div className="p-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-all duration-200 transform hover:scale-105">
                            <Image
                                src={DrizzleLogo}
                                alt="Drizzle ORM"
                                width={48}
                                height={48}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-white font-semibold mb-2">
                                Drizzle ORM
                            </h3>
                            <p className="text-neutral-300">
                                Modern TypeScript ORM delivering type-safe
                                database operations with maximum performance
                            </p>
                        </div>
                        <div className="p-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-all duration-200 transform hover:scale-105">
                            <Image
                                src={GeminiLogo}
                                alt="Gemini AI"
                                width={48}
                                height={48}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-white font-semibold mb-2">
                                Gemini AI
                            </h3>
                            <p className="text-neutral-300">
                                Google's most capable AI model, powering
                                intelligent interview feedback and adaptive
                                learning
                            </p>
                        </div>
                        <div className="p-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-all duration-200 transform hover:scale-105">
                            <Image
                                src={ClerkLogo}
                                alt="Clerk"
                                width={48}
                                height={48}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-white font-semibold mb-2">
                                Clerk
                            </h3>
                            <p className="text-neutral-300">
                                Complete authentication and user management
                                solution with enterprise-grade security
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                    Ready to Ace Your Next Interview?
                </h2>
                <Link href="/dashboard">
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200"
                    >
                        Start Practicing Now{" "}
                        <ArrowRight className="ml-2" size={20} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
