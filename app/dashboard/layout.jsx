import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
    return (
        <div className="bg-neutral-900 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow mx-5 md:mx-20 lg:mx-36">{children}</div>
        </div>
    );
};

export default DashboardLayout;
