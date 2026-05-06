import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";

export const LogicBlocksList: React.FC = () => {
  const {
    tool,
    selectedLogicBlockId,
    addLogicBlock,
    deleteLogicBlock,
    selectLogicBlock,
  } = useBuilderStore();

  return (
    <div className="logic-blocks-list">
      <button className="add-btn" onClick={() => addLogicBlock()}>
        + Add Logic Block
      </button>

      <div className="list-items">
        {tool.config.logic.map((block) => (
          <div
            key={block.id}
            className={`list-item ${selectedLogicBlockId === block.id ? "active" : ""}`}
            onClick={() => selectLogicBlock(block.id)}
          >
            <div className="item-header">
              <span className="item-label">{block.name}</span>
              <span className="item-type">{block.type}</span>
            </div>
            <div className="item-meta">
              <span className="operation">{block.operation}</span>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteLogicBlock(block.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {tool.config.logic.length === 0 && (
        <p className="empty-state">
          No logic blocks yet. Click "Add Logic Block" to start.
        </p>
      )}
    </div>
  );
};
