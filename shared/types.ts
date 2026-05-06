// Tool builder types - shared between client and server

export interface Field {
  id: string;
  type: "text" | "number" | "select" | "date" | "checkbox" | "email";
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  options?: Array<{ label: string; value: string }>;
}

export interface LogicBlock {
  id: string;
  type: "calculation" | "condition" | "transform";
  name: string;
  inputFieldIds: string[];
  operation: string;
  outputVariableName: string;
  params?: Record<string, any>;
}

export interface OutputBlock {
  id: string;
  type: "result" | "recommendation" | "download" | "lead-form";
  label: string;
  content: string;
  condition?: string;
}

export interface ToolConfig {
  fields: Field[];
  logic: LogicBlock[];
  outputs: OutputBlock[];
}

export interface ToolBranding {
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  fontFamily: string;
  customCss?: string;
}

export interface ToolMonetization {
  type: "free" | "lead-magnet" | "paywall" | "community";
  emailCapture?: boolean;
  paymentRequired?: boolean;
  price?: number;
}

export interface Tool {
  id: string;
  creatorId: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: "calculator" | "tracker" | "assessment" | "generator" | "custom";
  config: ToolConfig;
  branding: ToolBranding;
  monetization: ToolMonetization;
  isPublished: boolean;
  publishedUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  submissions: number;
}

export interface ToolSubmission {
  id: string;
  toolId: string;
  data: Record<string, any>;
  email?: string;
  createdAt: Date;
}

export interface ExecuteToolRequest {
  fieldValues: Record<string, any>;
}

export interface ExecuteToolResponse {
  outputs: Array<{
    id: string;
    label: string;
    content: string;
    visible: boolean;
  }>;
  variables: Record<string, any>;
}
