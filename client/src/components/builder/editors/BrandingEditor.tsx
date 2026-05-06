import React from "react";
import { useBuilderStore } from "../../../store/builderStore.js";

export const BrandingEditor: React.FC = () => {
  const { tool, updateTool } = useBuilderStore();

  const handleBrandingChange = (updates: Partial<typeof tool.branding>) => {
    updateTool({
      ...tool,
      branding: { ...tool.branding, ...updates },
    });
  };

  const fontFamilies = [
    "Inter",
    "Roboto",
    "Poppins",
    "Open Sans",
    "Lato",
    "Playfair Display",
  ];

  return (
    <div className="branding-editor">
      <div className="editor-group">
        <label>Tool Name</label>
        <input
          type="text"
          value={tool.name}
          onChange={(e) =>
            updateTool({ ...tool, name: e.target.value })
          }
          placeholder="Tool name"
        />
      </div>

      <div className="editor-group">
        <label>Description</label>
        <textarea
          value={tool.description}
          onChange={(e) =>
            updateTool({ ...tool, description: e.target.value })
          }
          placeholder="Brief description of your tool"
          rows={3}
        />
      </div>

      <div className="editor-group">
        <label>Primary Color</label>
        <div className="color-input-group">
          <input
            type="color"
            value={tool.branding.primaryColor}
            onChange={(e) =>
              handleBrandingChange({ primaryColor: e.target.value })
            }
          />
          <input
            type="text"
            value={tool.branding.primaryColor}
            onChange={(e) =>
              handleBrandingChange({ primaryColor: e.target.value })
            }
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="editor-group">
        <label>Secondary Color</label>
        <div className="color-input-group">
          <input
            type="color"
            value={tool.branding.secondaryColor}
            onChange={(e) =>
              handleBrandingChange({ secondaryColor: e.target.value })
            }
          />
          <input
            type="text"
            value={tool.branding.secondaryColor}
            onChange={(e) =>
              handleBrandingChange({ secondaryColor: e.target.value })
            }
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="editor-group">
        <label>Font Family</label>
        <select
          value={tool.branding.fontFamily}
          onChange={(e) =>
            handleBrandingChange({ fontFamily: e.target.value })
          }
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-group">
        <label>Logo URL (Optional)</label>
        <input
          type="url"
          value={tool.branding.logoUrl || ""}
          onChange={(e) =>
            handleBrandingChange({ logoUrl: e.target.value || undefined })
          }
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div className="editor-group">
        <label>Custom CSS (Optional)</label>
        <textarea
          value={tool.branding.customCss || ""}
          onChange={(e) =>
            handleBrandingChange({ customCss: e.target.value || undefined })
          }
          placeholder=".my-class { color: red; }"
          rows={4}
        />
      </div>
    </div>
  );
};
