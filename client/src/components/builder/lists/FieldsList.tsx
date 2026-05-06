import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";

export const FieldsList: React.FC = () => {
  const { tool, selectedFieldId, addField, deleteField, selectField } =
    useBuilderStore();

  return (
    <div className="fields-list">
      <button className="add-btn" onClick={() => addField()}>
        + Add Field
      </button>

      <div className="list-items">
        {tool.config.fields.map((field) => (
          <div
            key={field.id}
            className={`list-item ${selectedFieldId === field.id ? "active" : ""}`}
            onClick={() => selectField(field.id)}
          >
            <div className="item-header">
              <span className="item-label">{field.label}</span>
              <span className="item-type">{field.type}</span>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteField(field.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {tool.config.fields.length === 0 && (
        <p className="empty-state">No fields yet. Click "Add Field" to start.</p>
      )}
    </div>
  );
};
