"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {

    const path = usePathname();

    return (
        <div className="bg-neutral-800 items-center justify-between flex shadow-lg">
            <Image
                src={"./skillify_logo.svg"}
                width={160}
                height={10}
                alt="logo"
            />
            <ul className="hidden md:flex gap-6 font-medium text-lg text-gray-200">
                <li className={`cursor-pointer hover:font-bold hover:text-gray-50 transition-all
                    ${path == '/dashboard' && 'font-bold text-gray-50'}
                    `}>
                    Dashboard
                </li>
                <li className={`cursor-pointer hover:font-bold hover:text-gray-50 transition-all
                    ${path == '/dashboard/questions' && 'font-bold text-gray-50'}
                    `}>
                    Questions
                </li>
                <li className={`cursor-pointer hover:font-bold hover:text-gray-50 transition-all
                    ${path == '/dashboard/upgrade' && 'font-bold text-gray-50'}
                    `}>
                    Upgrade
                </li>
                <li className={`cursor-pointer hover:font-bold hover:text-gray-50 transition-all
                    ${path == '/dashboard/about' && 'font-bold text-gray-50'}
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
