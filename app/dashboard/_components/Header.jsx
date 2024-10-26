"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const path = usePathname();

    return (
        <div className="bg-neutral-800 p-4 h-20 items-center justify-between flex shadow-lg">
            <Link href="/">
                <Image
                    src="/skillify_logo.svg"
                    width={160}
                    height={10}
                    alt="logo"
                    className="cursor-pointer"
                />
            </Link>
            <ul className="hidden md:flex gap-6 font-medium text-lg text-gray-200">
                <Link href="/dashboard">
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all ${
                            path === "/dashboard"
                                ? "font-bold text-emerald-500"
                                : ""
                        }`}
                    >
                        Dashboard
                    </li>
                </Link>
                <Link href="#about" scroll={false}>
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all ${
                            path === "/about"
                                ? "font-bold text-emerald-500"
                                : ""
                        }`}
                    >
                        About
                    </li>
                </Link>
                <Link href="/pricing">
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all ${
                            path === "/pricing"
                                ? "font-bold text-emerald-500"
                                : ""
                        }`}
                    >
                        Pricing
                    </li>
                </Link>
                <Link href="/contact">
                    <li
                        className={`cursor-pointer hover:font-bold hover:text-emerald-400 transition-all ${
                            path === "/contact"
                                ? "font-bold text-emerald-500"
                                : ""
                        }`}
                    >
                        Contact
                    </li>
                </Link>
            </ul>
            <div className="flex justify-center items-center p-4">
                <UserButton />
            </div>
        </div>
    );
};

export default Header;
