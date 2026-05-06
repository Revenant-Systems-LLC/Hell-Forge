import { create } from "zustand";
import { Tool, Field, LogicBlock, OutputBlock } from "../../shared/types.js";
import { v4 as uuidv4 } from "uuid";

export interface BuilderState {
  tool: Tool;
  isLoading: boolean;
  isSaving: boolean;
  isDirty: boolean;
  selectedFieldId?: string;
  selectedLogicBlockId?: string;
  selectedOutputId?: string;
  previewMode: boolean;
  previewData: Record<string, any>;
  previewResults?: any;

  // Tool operations
  loadTool: (tool: Tool) => void;
  setTool: (tool: Partial<Tool>) => void;
  markDirty: () => void;
  markClean: () => void;

  // Field operations
  addField: (field?: Partial<Field>) => void;
  updateField: (fieldId: string, updates: Partial<Field>) => void;
  deleteField: (fieldId: string) => void;
  selectField: (fieldId?: string) => void;

  // Logic block operations
  addLogicBlock: (block?: Partial<LogicBlock>) => void;
  updateLogicBlock: (blockId: string, updates: Partial<LogicBlock>) => void;
  deleteLogicBlock: (blockId: string) => void;
  selectLogicBlock: (blockId?: string) => void;

  // Output operations
  addOutput: (output?: Partial<OutputBlock>) => void;
  updateOutput: (outputId: string, updates: Partial<OutputBlock>) => void;
  deleteOutput: (outputId: string) => void;
  selectOutput: (outputId?: string) => void;

  // Preview operations
  setPreviewMode: (enabled: boolean) => void;
  setPreviewData: (data: Record<string, any>) => void;
  setPreviewResults: (results: any) => void;

  // Save operations
  setSaving: (saving: boolean) => void;
}

const defaultTool: Tool = {
  id: uuidv4(),
  creatorId: "",
  name: "Untitled Tool",
  slug: "untitled-tool",
  description: "",
  icon: "hammer",
  category: "custom",
  config: { fields: [], logic: [], outputs: [] },
  branding: {
    primaryColor: "#F59E0B",
    secondaryColor: "#10B981",
    fontFamily: "Inter",
  },
  monetization: { type: "free" },
  isPublished: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  views: 0,
  submissions: 0,
};

export const useBuilderStore = create<BuilderState>((set) => ({
  tool: defaultTool,
  isLoading: false,
  isSaving: false,
  isDirty: false,
  selectedFieldId: undefined,
  selectedLogicBlockId: undefined,
  selectedOutputId: undefined,
  previewMode: false,
  previewData: {},
  previewResults: undefined,

  loadTool: (tool) => set({ tool, isDirty: false, isLoading: false }),

  setTool: (updates) =>
    set((state) => ({
      tool: { ...state.tool, ...updates },
      isDirty: true,
      updatedAt: new Date(),
    })),

  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),

  addField: (fieldDefaults) =>
    set((state) => {
      const newField: Field = {
        id: uuidv4(),
        type: "text",
        label: "New Field",
        placeholder: "",
        required: false,
        ...fieldDefaults,
      };
      return {
        tool: {
          ...state.tool,
          config: {
            ...state.tool.config,
            fields: [...state.tool.config.fields, newField],
          },
        },
        isDirty: true,
        selectedFieldId: newField.id,
      };
    }),

  updateField: (fieldId, updates) =>
    set((state) => ({
      tool: {
        ...state.tool,
        config: {
          ...state.tool.config,
          fields: state.tool.config.fields.map((f) =>
            f.id === fieldId ? { ...f, ...updates } : f
          ),
        },
      },
      isDirty: true,
    })),

  deleteField: (fieldId) =>
    set((state) => ({
      tool: {
        ...state.tool,
        config: {
          ...state.tool.config,
          fields: state.tool.config.fields.filter((f) => f.id !== fieldId),
        },
      },
      isDirty: true,
      selectedFieldId: undefined,
    })),

  selectField: (fieldId) => set({ selectedFieldId: fieldId }),

  addLogicBlock: (blockDefaults) =>
    set((state) => {
      const newBlock: LogicBlock = {
        id: uuidv4(),
        type: "calculation",
        name: "New Logic Block",
        inputFieldIds: [],
        operation: "add",
        outputVariableName: "result",
        ...blockDefaults,
      };
      return {
        tool: {
          ...state.tool,
          config: {
            ...state.tool.config,
            logic: [...state.tool.config.logic, newBlock],
          },
        },
        isDirty: true,
        selectedLogicBlockId: newBlock.id,
      };
    }),

  updateLogicBlock: (blockId, updates) =>
    set((state) => ({
      tool: {
        ...state.tool,
        config: {
          ...state.tool.config,
          logic: state.tool.config.logic.map((b) =>
            b.id === blockId ? { ...b, ...updates } : b
          ),
        },
      },
      isDirty: true,
    })),

  deleteLogicBlock: (blockId) =>
    set((state) => ({
      tool: {
        ...state.tool,
        config: {
          ...state.tool.config,
          logic: state.tool.config.logic.filter((b) => b.id !== blockId),
        },
      },
      isDirty: true,
      selectedLogicBlockId: undefined,
    })),

  selectLogicBlock: (blockId) => set({ selectedLogicBlockId: blockId }),

  addOutput: (outputDefaults) =>
    set((state) => {
      const newOutput: OutputBlock = {
        id: uuidv4(),
        type: "result",
        label: "Result",
        content: "Your result: {{result}}",
        ...outputDefaults,
      };
      return {
        tool: {
          ...state.tool,
          config: {
            ...state.tool.config,
            outputs: [...state.tool.config.outputs, newOutput],
          },
        },
        isDirty: true,
        selectedOutputId: newOutput.id,
      };
    }),

  updateOutput: (outputId, updates) =>
    set((state) => ({
      tool: {
        ...state.tool,
        config: {
          ...state.tool.config,
          outputs: state.tool.config.outputs.map((o) =>
            o.id === outputId ? { ...o, ...updates } : o
          ),
        },
      },
      isDirty: true,
    })),

  deleteOutput: (outputId) =>
    set((state) => ({
      tool: {
        ...state.tool,
        config: {
          ...state.tool.config,
          outputs: state.tool.config.outputs.filter((o) => o.id !== outputId),
        },
      },
      isDirty: true,
      selectedOutputId: undefined,
    })),

  selectOutput: (outputId) => set({ selectedOutputId: outputId }),

  setPreviewMode: (enabled) => set({ previewMode: enabled }),
  setPreviewData: (data) => set({ previewData: data }),
  setPreviewResults: (results) => set({ previewResults: results }),
  setSaving: (saving) => set({ isSaving: saving }),
}));
