"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {

    const path = usePathname();

    return (
        <div className="bg-neutral-800 p-2 items-center justify-between flex shadow-lg">
            <Image
                src={"./skillify_logo.svg"}
                width={160}
                height={10}
                alt="logo"
            />
            <ul className="hidden md:flex gap-6 font-medium text-lg text-gray-200">
                <li className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${path == '/dashboard' && 'font-bold text-emerald-500'}
                    `}>
                    Dashboard
                </li>
                <li className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${path == '/dashboard/questions' && 'font-bold text-emerald-500'}
                    `}>
                    Questions
                </li>
                <li className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${path == '/dashboard/upgrade' && 'font-bold text-emerald-500'}
                    `}>
                    Upgrade
                </li>
                <li className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all
                    ${path == '/dashboard/about' && 'font-bold text-emerald-500'}
                    `}>
                    About
                </li>
            </ul>
            <div className="p-4">
                <UserButton />
            </div>
        </div>
    );
};

export default Header;
