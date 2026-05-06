import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";
import { LogicBlock } from "../../../shared/types.js";

export const LogicBlockEditor: React.FC = () => {
  const { tool, selectedLogicBlockId, updateLogicBlock } = useBuilderStore();

  const block = tool.config.logic.find((b) => b.id === selectedLogicBlockId);

  if (!block) return <p>Select a logic block to edit.</p>;

  const handleChange = (updates: Partial<LogicBlock>) => {
    updateLogicBlock(block.id, updates);
  };

  const blockTypes = ["calculation", "condition", "transform"];

  const operationsByType: Record<string, string[]> = {
    calculation: ["add", "subtract", "multiply", "divide", "average", "sum"],
    condition: ["if-then-else", "equals", "greater-than", "less-than"],
    transform: ["concat", "uppercase", "lowercase", "round", "format"],
  };

  const availableOperations = operationsByType[block.type] || [];

  return (
    <div className="logic-block-editor">
      <div className="editor-group">
        <label>Name</label>
        <input
          type="text"
          value={block.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          placeholder="e.g., Calculate Total"
        />
      </div>

      <div className="editor-group">
        <label>Type</label>
        <select
          value={block.type}
          onChange={(e) => handleChange({ type: e.target.value as any })}
        >
          {blockTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-group">
        <label>Operation</label>
        <select
          value={block.operation}
          onChange={(e) => handleChange({ operation: e.target.value })}
        >
          <option value="">Select an operation</option>
          {availableOperations.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-group">
        <label>Input Fields</label>
        <div className="checkbox-group">
          {tool.config.fields.map((field) => (
            <label key={field.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={block.inputFieldIds.includes(field.id)}
                onChange={(e) => {
                  const newIds = e.target.checked
                    ? [...block.inputFieldIds, field.id]
                    : block.inputFieldIds.filter((id) => id !== field.id);
                  handleChange({ inputFieldIds: newIds });
                }}
              />
              {field.label}
            </label>
          ))}
        </div>
      </div>

      <div className="editor-group">
        <label>Output Variable Name</label>
        <input
          type="text"
          value={block.outputVariableName}
          onChange={(e) => handleChange({ outputVariableName: e.target.value })}
          placeholder="e.g., totalPrice"
        />
      </div>
    </div>
  );
};
