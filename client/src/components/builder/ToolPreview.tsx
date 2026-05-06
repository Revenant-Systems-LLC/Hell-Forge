import React, { useState } from "react";
import { useBuilderStore } from "../../store/builderStore.js";
import { executeToolLogic } from "../../logic-engine.js";

export const ToolPreview: React.FC = () => {
  const { tool, setPreviewData, setPreviewResults, previewData, previewResults } = useBuilderStore();
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (fieldId: string, value: any) => {
    setPreviewData({ ...previewData, [fieldId]: value });
  };

  const handleExecute = () => {
    try {
      setErrors([]);
      const result = executeToolLogic(tool.config, previewData);
      setPreviewResults(result);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "Execution failed"]);
    }
  };

  return (
    <div className="tool-preview" style={getPreviewStyle(tool.branding)}>
      <div className="preview-header">
        <h2>{tool.name}</h2>
        <p className="preview-description">{tool.description}</p>
      </div>

      <div className="preview-content">
        {/* Input Fields */}
        <div className="input-section">
          <h3>Inputs</h3>
          {tool.config.fields.map((field) => (
            <div key={field.id} className="input-group">
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {field.type === "text" && (
                <input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  value={previewData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}
              {field.type === "number" && (
                <input
                  id={field.id}
                  type="number"
                  placeholder={field.placeholder}
                  value={previewData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value))}
                />
              )}
              {field.type === "email" && (
                <input
                  id={field.id}
                  type="email"
                  placeholder={field.placeholder}
                  value={previewData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}
              {field.type === "date" && (
                <input
                  id={field.id}
                  type="date"
                  value={previewData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}
              {field.type === "checkbox" && (
                <input
                  id={field.id}
                  type="checkbox"
                  checked={previewData[field.id] || false}
                  onChange={(e) => handleInputChange(field.id, e.target.checked)}
                />
              )}
              {field.type === "select" && (
                <select
                  id={field.id}
                  value={previewData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                >
                  <option value="">Select...</option>
                </select>
              )}
            </div>
          ))}
        </div>

        {/* Execute Button */}
        <button onClick={handleExecute} className="btn-execute">
          Execute
        </button>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="error-section">
            {errors.map((error, i) => (
              <div key={i} className="error-item">
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {previewResults && (
          <div className="output-section">
            <h3>Results</h3>
            {previewResults.outputs.map((output) => (
              output.visible && (
                <div key={output.id} className="output-block">
                  <strong>{output.label}</strong>
                  <p>{output.content}</p>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function getPreviewStyle(branding: any) {
  return {
    "--primary-color": branding.primaryColor,
    "--secondary-color": branding.secondaryColor,
    fontFamily: branding.fontFamily,
  } as React.CSSProperties;
}
