import React, { useState } from "react";
import { useBuilderStore } from "../../store/builderStore.js";
import { FieldEditor } from "./editors/FieldEditor.js";
import { LogicBlockEditor } from "./editors/LogicBlockEditor.js";
import { OutputBlockEditor } from "./editors/OutputBlockEditor.js";
import { BrandingEditor } from "./editors/BrandingEditor.js";

type EditorTab = "field" | "logic" | "output" | "branding";

export const Inspector: React.FC = () => {
  const {
    selectedFieldId,
    selectedLogicBlockId,
    selectedOutputId,
    tool,
  } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<EditorTab>("branding");

  const determineActiveTab = (): EditorTab => {
    if (selectedFieldId) return "field";
    if (selectedLogicBlockId) return "logic";
    if (selectedOutputId) return "output";
    return activeTab;
  };

  const currentTab = determineActiveTab();

  const getEditorTitle = (): string => {
    if (selectedFieldId) {
      const field = tool.config.fields.find((f) => f.id === selectedFieldId);
      return field ? `Edit Field: ${field.label}` : "Field Editor";
    }
    if (selectedLogicBlockId) {
      const block = tool.config.logic.find((b) => b.id === selectedLogicBlockId);
      return block ? `Edit Logic Block: ${block.name}` : "Logic Block Editor";
    }
    if (selectedOutputId) {
      const output = tool.config.outputs.find((o) => o.id === selectedOutputId);
      return output ? `Edit Output: ${output.label}` : "Output Editor";
    }
    return "Branding";
  };

  return (
    <div className="inspector">
      <div className="inspector-tabs">
        <button
          className={`tab ${currentTab === "field" ? "active" : ""}`}
          onClick={() => setActiveTab("field")}
          disabled={!selectedFieldId}
        >
          Field
        </button>
        <button
          className={`tab ${currentTab === "logic" ? "active" : ""}`}
          onClick={() => setActiveTab("logic")}
          disabled={!selectedLogicBlockId}
        >
          Logic
        </button>
        <button
          className={`tab ${currentTab === "output" ? "active" : ""}`}
          onClick={() => setActiveTab("output")}
          disabled={!selectedOutputId}
        >
          Output
        </button>
        <button
          className={`tab ${currentTab === "branding" ? "active" : ""}`}
          onClick={() => setActiveTab("branding")}
        >
          Branding
        </button>
      </div>

      <div className="inspector-content">
        <h3 className="inspector-title">{getEditorTitle()}</h3>

        {currentTab === "field" && selectedFieldId && <FieldEditor />}
        {currentTab === "logic" && selectedLogicBlockId && <LogicBlockEditor />}
        {currentTab === "output" && selectedOutputId && <OutputBlockEditor />}
        {currentTab === "branding" && <BrandingEditor />}
      </div>
    </div>
  );
};
