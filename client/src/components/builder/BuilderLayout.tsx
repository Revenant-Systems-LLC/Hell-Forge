import React, { useEffect, useState } from "react";
import { useBuilderStore } from "../../store/builderStore.js";
import { ToolPreview } from "./ToolPreview.js";
import { Sidebar } from "./Sidebar.js";
import { Inspector } from "./Inspector.js";
import { Toolbar } from "./Toolbar.js";
import { useParams } from "react-router-dom";
import "../styles/builder.css";

export const BuilderLayout: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const {
    tool,
    isDirty,
    isSaving,
    isLoading,
    loadTool,
    setSaving,
    markClean,
  } = useBuilderStore();
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load tool on mount
  useEffect(() => {
    const fetchTool = async () => {
      if (!toolId) return;
      try {
        const response = await fetch(`/api/tools/${toolId}`);
        if (!response.ok) throw new Error("Failed to load tool");
        const data = await response.json();
        loadTool(data);
      } catch (error) {
        setSaveError(
          error instanceof Error ? error.message : "Failed to load tool"
        );
      }
    };
    fetchTool();
  }, [toolId, loadTool]);

  // Auto-save on dirty changes
  useEffect(() => {
    if (!isDirty || !toolId) return;

    const saveTimer = setTimeout(async () => {
      setSaving(true);
      setSaveError(null);
      try {
        const response = await fetch(`/api/tools/${toolId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: tool.name,
            slug: tool.slug,
            description: tool.description,
            icon: tool.icon,
            category: tool.category,
            config: tool.config,
            branding: tool.branding,
            monetization: tool.monetization,
          }),
        });

        if (!response.ok) throw new Error("Failed to save tool");
        markClean();
      } catch (error) {
        setSaveError(
          error instanceof Error ? error.message : "Failed to save tool"
        );
      } finally {
        setSaving(false);
      }
    }, 2000); // Debounce saves by 2 seconds

    return () => clearTimeout(saveTimer);
  }, [isDirty, tool, toolId, setSaving, markClean]);

  if (isLoading) {
    return (
      <div className="builder-loading">
        <p>Loading tool...</p>
      </div>
    );
  }

  return (
    <div className="builder-layout">
      <Toolbar saveError={saveError} isSaving={isSaving} isDirty={isDirty} />

      <div className="builder-workspace">
        <Sidebar />
        <ToolPreview />
        <Inspector />
      </div>
    </div>
  );
};
