import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";
import { OutputBlock } from "../../../shared/types.js";

export const OutputBlockEditor: React.FC = () => {
  const { tool, selectedOutputId, updateOutput } = useBuilderStore();

  const output = tool.config.outputs.find((o) => o.id === selectedOutputId);

  if (!output) return <p>Select an output to edit.</p>;

  const handleChange = (updates: Partial<OutputBlock>) => {
    updateOutput(output.id, updates);
  };

  const outputTypes = ["result", "recommendation", "download", "lead-form"];

  return (
    <div className="output-block-editor">
      <div className="editor-group">
        <label>Label</label>
        <input
          type="text"
          value={output.label}
          onChange={(e) => handleChange({ label: e.target.value })}
          placeholder="e.g., Your Results"
        />
      </div>

      <div className="editor-group">
        <label>Type</label>
        <select
          value={output.type}
          onChange={(e) => handleChange({ type: e.target.value as any })}
        >
          {outputTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-group">
        <label>Content</label>
        <textarea
          value={output.content}
          onChange={(e) => handleChange({ content: e.target.value })}
          placeholder="Use {{variableName}} for dynamic values&#10;e.g., Your total is {{total}}"
          rows={6}
        />
      </div>

      <div className="editor-group">
        <label>Condition (Optional)</label>
        <textarea
          value={output.condition || ""}
          onChange={(e) => handleChange({ condition: e.target.value || undefined })}
          placeholder="Show only if condition is met&#10;e.g., score > 80"
          rows={3}
        />
      </div>
    </div>
  );
};
