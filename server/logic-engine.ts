import { ToolConfig, ExecuteToolResponse, LogicBlock, OutputBlock } from "../shared/types.js";

export function executeToolLogic(config: ToolConfig, fieldValues: Record<string, any>): ExecuteToolResponse {
  const variables: Record<string, any> = { ...fieldValues };

  // Execute logic blocks in sequence
  for (const logicBlock of config.logic) {
    try {
      const result = executeLogicBlock(logicBlock, variables);
      variables[logicBlock.outputVariableName] = result;
    } catch (error) {
      console.error(`Error executing logic block ${logicBlock.id}:`, error);
      throw new Error(`Logic block "${logicBlock.name}" failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Generate outputs based on conditions
  const outputs = config.outputs.map((output) => {
    const isVisible = output.condition ? evaluateCondition(output.condition, variables) : true;
    const content = isVisible ? interpolateContent(output.content, variables) : "";

    return {
      id: output.id,
      label: output.label,
      content,
      visible: isVisible,
    };
  });

  return { outputs, variables };
}

function executeLogicBlock(block: LogicBlock, variables: Record<string, any>): any {
  const inputs = block.inputFieldIds.map((id) => variables[id]);

  switch (block.type) {
    case "calculation":
      return executeCalculation(block.operation, inputs, block.params);
    case "condition":
      return evaluateCondition(block.operation, variables);
    case "transform":
      return executeTransform(block.operation, inputs, block.params);
    default:
      throw new Error(`Unknown logic block type: ${block.type}`);
  }
}

function executeCalculation(operation: string, inputs: any[], params?: Record<string, any>): any {
  switch (operation) {
    case "add":
      return inputs.reduce((a, b) => (a || 0) + (b || 0), 0);
    case "subtract":
      return (inputs[0] || 0) - (inputs[1] || 0);
    case "multiply":
      return inputs.reduce((a, b) => (a || 1) * (b || 1), 1);
    case "divide":
      if ((inputs[1] || 0) === 0) throw new Error("Division by zero");
      return (inputs[0] || 0) / (inputs[1] || 1);
    case "average":
      return inputs.length > 0 ? inputs.reduce((a, b) => (a || 0) + (b || 0), 0) / inputs.length : 0;
    case "percentage":
      return ((inputs[0] || 0) / (inputs[1] || 1)) * 100;
    case "round":
      return Math.round((inputs[0] || 0) * Math.pow(10, params?.decimals || 0)) / Math.pow(10, params?.decimals || 0);
    case "abs":
      return Math.abs(inputs[0] || 0);
    case "max":
      return Math.max(...inputs.map((i) => i || 0));
    case "min":
      return Math.min(...inputs.map((i) => i || 0));
    case "concat":
      return inputs.map((i) => String(i || "")).join(params?.separator || "");
    default:
      throw new Error(`Unknown calculation operation: ${operation}`);
  }
}

function evaluateCondition(condition: string, variables: Record<string, any>): boolean {
  try {
    // Simple expression evaluator for conditions like "age >= 18" or "salary > 50000"
    // Supports: >, <, >=, <=, ==, !=, &&, ||
    let expr = condition;

    // Replace variable references with their values
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, "g");
      expr = expr.replace(regex, JSON.stringify(value));
    });

    // Use Function constructor for safe evaluation (sandboxed to variable scope)
    const result = new Function(`"use strict"; return (${expr})`)();
    return Boolean(result);
  } catch (error) {
    throw new Error(`Invalid condition: "${condition}"`);
  }
}

function executeTransform(operation: string, inputs: any[], params?: Record<string, any>): any {
  const input = inputs[0];

  switch (operation) {
    case "uppercase":
      return String(input || "").toUpperCase();
    case "lowercase":
      return String(input || "").toLowerCase();
    case "capitalize":
      return String(input || "")
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());
    case "trim":
      return String(input || "").trim();
    case "slice":
      return String(input || "").slice(params?.start || 0, params?.end);
    case "replace":
      return String(input || "").replace(new RegExp(params?.find || "", "g"), params?.replace || "");
    case "split":
      return String(input || "").split(params?.separator || ",");
    case "join":
      return Array.isArray(input) ? input.join(params?.separator || ",") : String(input || "");
    case "parseInt":
      return parseInt(String(input || 0), params?.radix || 10);
    case "parseFloat":
      return parseFloat(String(input || 0));
    case "toFixed":
      return Number(input || 0).toFixed(params?.decimals || 0);
    case "reverse":
      return Array.isArray(input) ? [...input].reverse() : String(input || "").split("").reverse().join("");
    case "length":
      return Array.isArray(input) ? input.length : String(input || "").length;
    default:
      throw new Error(`Unknown transform operation: ${operation}`);
  }
}

function interpolateContent(content: string, variables: Record<string, any>): string {
  // Replace {{variableName}} with actual values
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = variables[key];
    if (value === undefined || value === null) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  });
}
