import React from "react";
import UserManager from "../components/lists/UserManager";

const dashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <UserManager />
    </div>
  );
};

export default dashboard;
