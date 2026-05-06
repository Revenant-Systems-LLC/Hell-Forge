import React from "react";
import { useBuilderStore } from "../../store/builderStore.js";
import { FieldsList } from "./lists/FieldsList.js";
import { LogicBlocksList } from "./lists/LogicBlocksList.js";
import { OutputsList } from "./lists/OutputsList.js";

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"fields" | "logic" | "outputs">("fields");

  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        <button
          className={`tab-button ${activeTab === "fields" ? "active" : ""}`}
          onClick={() => setActiveTab("fields")}
        >
          Fields
        </button>
        <button
          className={`tab-button ${activeTab === "logic" ? "active" : ""}`}
          onClick={() => setActiveTab("logic")}
        >
          Logic
        </button>
        <button
          className={`tab-button ${activeTab === "outputs" ? "active" : ""}`}
          onClick={() => setActiveTab("outputs")}
        >
          Outputs
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === "fields" && <FieldsList />}
        {activeTab === "logic" && <LogicBlocksList />}
        {activeTab === "outputs" && <OutputsList />}
      </div>
    </div>
  );
};
