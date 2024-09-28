"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const path = usePathname();

    return (
        <div className="bg-neutral-800 p-2 max-h-16 items-center justify-between flex shadow-lg">
            <Image
                src={"/skillify_logo.svg"}
                width={160}
                height={10}
                alt="logo"
            />
            <ul className="hidden md:flex gap-6 font-medium text-lg text-gray-200">
                <Link href={"/dashboard"}>
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${path == "/dashboard" && "font-bold text-emerald-500"}
                    `}
                    >
                        Dashboard
                    </li>
                </Link>
                <Link href={"/questions"}>
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${
                        path == "/dashboard/questions" &&
                        "font-bold text-emerald-500"
                    }
                    `}
                    >
                        Questions
                    </li>
                </Link>
                <Link href={"/upgrade"}>
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${
                        path == "/dashboard/upgrade" &&
                        "font-bold text-emerald-500"
                    }
                    `}
                    >
                        Upgrade
                    </li>
                </Link>
                <Link href={"/about"}>
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${
                        path == "/dashboard/about" &&
                        "font-bold text-emerald-500"
                    }
                    `}
                    >
                        About
                    </li>
                </Link>
            </ul>
            <div className="flex justify-center items-center p-4">
                <UserButton/>
            </div>
        </div>
    );
};

export default Header;
