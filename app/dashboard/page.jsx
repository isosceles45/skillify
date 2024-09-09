import React from "react";
import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
    return (
        <div className="bg-neutral-950">
            Dashboard Page
            <UserButton />
        </div>
    );
};

export default Dashboard;
