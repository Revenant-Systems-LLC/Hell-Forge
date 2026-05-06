import express, { Router, Request, Response } from "express";
import { getPool } from "../db.js";
import { Tool, ExecuteToolRequest, ExecuteToolResponse } from "../../shared/types.js";
import { executeToolLogic } from "../logic-engine.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// POST /api/tools - Create new tool
router.post("/", async (req: Request, res: Response) => {
  try {
    const { creatorId, name, slug, description, icon, category, branding, monetization } = req.body;

    if (!creatorId || !name || !slug) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = uuidv4();
    const pool = getPool();

    const result = await pool.query(
      `INSERT INTO tools (id, creator_id, name, slug, description, icon, category, config, branding, monetization)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        id,
        creatorId,
        name,
        slug,
        description || "",
        icon || "hammer",
        category || "custom",
        JSON.stringify({ fields: [], logic: [], outputs: [] }),
        JSON.stringify(branding || { primaryColor: "#F59E0B", secondaryColor: "#10B981", fontFamily: "Inter" }),
        JSON.stringify(monetization || { type: "free" }),
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Create tool error:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Slug already exists" });
    }
    res.status(500).json({ error: "Failed to create tool" });
  }
});

// GET /api/tools/:id - Fetch tool by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const result = await pool.query("SELECT * FROM tools WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fetch tool error:", error);
    res.status(500).json({ error: "Failed to fetch tool" });
  }
});

// PUT /api/tools/:id - Update tool
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon, category, config, branding, monetization } = req.body;

    const pool = getPool();

    const result = await pool.query(
      `UPDATE tools
       SET name = COALESCE($2, name),
           slug = COALESCE($3, slug),
           description = COALESCE($4, description),
           icon = COALESCE($5, icon),
           category = COALESCE($6, category),
           config = COALESCE($7, config),
           branding = COALESCE($8, branding),
           monetization = COALESCE($9, monetization),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [
        id,
        name,
        slug,
        description,
        icon,
        category,
        config ? JSON.stringify(config) : null,
        branding ? JSON.stringify(branding) : null,
        monetization ? JSON.stringify(monetization) : null,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error("Update tool error:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Slug already exists" });
    }
    res.status(500).json({ error: "Failed to update tool" });
  }
});

// DELETE /api/tools/:id - Delete tool
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const result = await pool.query("DELETE FROM tools WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    res.json({ success: true, id });
  } catch (error) {
    console.error("Delete tool error:", error);
    res.status(500).json({ error: "Failed to delete tool" });
  }
});

// GET /api/creators/:creatorId/tools - List creator's tools
router.get("/creator/:creatorId", async (req: Request, res: Response) => {
  try {
    const { creatorId } = req.params;
    const pool = getPool();

    const result = await pool.query("SELECT * FROM tools WHERE creator_id = $1 ORDER BY updated_at DESC", [creatorId]);

    res.json(result.rows);
  } catch (error) {
    console.error("List tools error:", error);
    res.status(500).json({ error: "Failed to fetch tools" });
  }
});

// POST /api/tools/:id/publish - Publish tool
router.post("/:id/publish", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const tool = await pool.query("SELECT slug FROM tools WHERE id = $1", [id]);
    if (tool.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    const publishedUrl = `/tools/${tool.rows[0].slug}`;

    const result = await pool.query(
      `UPDATE tools
       SET is_published = true, published_url = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id, publishedUrl]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Publish tool error:", error);
    res.status(500).json({ error: "Failed to publish tool" });
  }
});

// POST /api/tools/:id/execute - Execute tool with user input
router.post("/:id/execute", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fieldValues } = req.body as ExecuteToolRequest;

    const pool = getPool();

    const toolResult = await pool.query("SELECT * FROM tools WHERE id = $1", [id]);
    if (toolResult.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    const tool = toolResult.rows[0];
    const response = executeToolLogic(tool.config, fieldValues);

    // Increment views
    await pool.query("UPDATE tools SET views = views + 1 WHERE id = $1", [id]);

    res.json(response);
  } catch (error: any) {
    console.error("Execute tool error:", error);
    res.status(500).json({ error: error.message || "Failed to execute tool" });
  }
});

// GET /api/tools/public/:slug - Fetch published tool by slug
router.get("/public/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const pool = getPool();

    const result = await pool.query("SELECT * FROM tools WHERE slug = $1 AND is_published = true", [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fetch public tool error:", error);
    res.status(500).json({ error: "Failed to fetch tool" });
  }
});

// POST /api/tools/:id/submit - Record submission
router.post("/:id/submit", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, email } = req.body;

    const pool = getPool();

    const result = await pool.query(
      `INSERT INTO tool_submissions (tool_id, data, email)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, JSON.stringify(data), email || null]
    );

    // Increment submissions count
    await pool.query("UPDATE tools SET submissions = submissions + 1 WHERE id = $1", [id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Submit tool error:", error);
    res.status(500).json({ error: "Failed to record submission" });
  }
});

// GET /api/tools/:id/analytics - Get tool stats
router.get("/:id/analytics", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const toolResult = await pool.query(
      "SELECT views, submissions FROM tools WHERE id = $1",
      [id]
    );

    if (toolResult.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    const submissionsResult = await pool.query(
      "SELECT COUNT(*) as count FROM tool_submissions WHERE tool_id = $1",
      [id]
    );

    res.json({
      views: toolResult.rows[0].views,
      submissions: toolResult.rows[0].submissions,
      recentSubmissions: submissionsResult.rows[0].count,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
