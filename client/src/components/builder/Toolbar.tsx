import React from "react";
import { useBuilderStore } from "../../store/builderStore.js";
import { useParams, useNavigate } from "react-router-dom";

interface ToolbarProps {
  saveError?: string | null;
  isSaving: boolean;
  isDirty: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ saveError, isSaving, isDirty }) => {
  const navigate = useNavigate();
  const { tool } = useBuilderStore();

  const handlePublish = async () => {
    try {
      const response = await fetch(`/api/tools/${tool.id}/publish`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to publish tool");
      const { publishedUrl } = await response.json();
      alert(`Tool published at: ${publishedUrl}`);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Failed to publish"}`);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button onClick={() => navigate(-1)} className="btn-secondary">
          ← Back
        </button>
        <h1>{tool.name || "Untitled Tool"}</h1>
      </div>

      <div className="toolbar-right">
        {saveError && <div className="error-message">{saveError}</div>}
        {isDirty && !isSaving && <span className="status-badge unsaved">Unsaved changes</span>}
        {isSaving && <span className="status-badge saving">Saving...</span>}
        {!isDirty && !isSaving && <span className="status-badge saved">All changes saved</span>}

        <button onClick={handlePublish} className="btn-primary">
          {tool.isPublished ? "Update & Publish" : "Publish Tool"}
        </button>
      </div>
    </div>
  );
};
