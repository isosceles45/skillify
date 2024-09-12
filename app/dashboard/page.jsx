import React from "react";
import JobForm from "./_components/JobForm";

const Dashboard = () => {
    return (
        <div className="p-10 bg-neutral-900">
            <h2 className="font-bold text-xl text-emerald-400">Dashboard Page</h2>
            <h2 className="font-medium text-lg text-gray-300">
                Create & Start your AI Mock Interview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 my-5">
                <JobForm/>
            </div>
        </div>
    );
};

export default Dashboard;
