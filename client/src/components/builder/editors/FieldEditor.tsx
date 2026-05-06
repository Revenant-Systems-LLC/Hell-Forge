import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";
import { Field } from "../../../shared/types.js";

export const FieldEditor: React.FC = () => {
  const { tool, selectedFieldId, updateField } = useBuilderStore();

  const field = tool.config.fields.find((f) => f.id === selectedFieldId);

  if (!field) return <p>Select a field to edit.</p>;

  const handleChange = (updates: Partial<Field>) => {
    updateField(field.id, updates);
  };

  const fieldTypes = [
    "text",
    "number",
    "email",
    "date",
    "checkbox",
    "select",
  ];

  return (
    <div className="field-editor">
      <div className="editor-group">
        <label>Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleChange({ label: e.target.value })}
          placeholder="Field label"
        />
      </div>

      <div className="editor-group">
        <label>Type</label>
        <select
          value={field.type}
          onChange={(e) => handleChange({ type: e.target.value as any })}
        >
          {fieldTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-group">
        <label>Placeholder</label>
        <input
          type="text"
          value={field.placeholder || ""}
          onChange={(e) => handleChange({ placeholder: e.target.value })}
          placeholder="Placeholder text"
        />
      </div>

      <div className="editor-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleChange({ required: e.target.checked })}
          />
          Required
        </label>
      </div>

      {field.type === "number" && (
        <>
          <div className="editor-group">
            <label>Min Value</label>
            <input
              type="number"
              value={field.validation?.min || ""}
              onChange={(e) =>
                handleChange({
                  validation: {
                    ...field.validation,
                    min: e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              placeholder="Minimum"
            />
          </div>

          <div className="editor-group">
            <label>Max Value</label>
            <input
              type="number"
              value={field.validation?.max || ""}
              onChange={(e) =>
                handleChange({
                  validation: {
                    ...field.validation,
                    max: e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              placeholder="Maximum"
            />
          </div>
        </>
      )}

      {field.type === "text" && (
        <div className="editor-group">
          <label>Pattern (Regex)</label>
          <input
            type="text"
            value={field.validation?.pattern || ""}
            onChange={(e) =>
              handleChange({
                validation: {
                  ...field.validation,
                  pattern: e.target.value || undefined,
                },
              })
            }
            placeholder="e.g. ^[a-z]+$"
          />
        </div>
      )}
    </div>
  );
};
