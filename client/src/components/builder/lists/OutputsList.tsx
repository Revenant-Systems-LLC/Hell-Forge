import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";

export const OutputsList: React.FC = () => {
  const {
    tool,
    selectedOutputId,
    addOutput,
    deleteOutput,
    selectOutput,
  } = useBuilderStore();

  return (
    <div className="outputs-list">
      <button className="add-btn" onClick={() => addOutput()}>
        + Add Output
      </button>

      <div className="list-items">
        {tool.config.outputs.map((output) => (
          <div
            key={output.id}
            className={`list-item ${selectedOutputId === output.id ? "active" : ""}`}
            onClick={() => selectOutput(output.id)}
          >
            <div className="item-header">
              <span className="item-label">{output.label}</span>
              <span className="item-type">{output.type}</span>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteOutput(output.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {tool.config.outputs.length === 0 && (
        <p className="empty-state">
          No outputs yet. Click "Add Output" to start.
        </p>
      )}
    </div>
  );
};
