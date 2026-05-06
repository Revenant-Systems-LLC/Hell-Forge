import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function initializeDatabase(): Promise<void> {
  const client = getPool();

  try {
    // Create tools table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        creator_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        icon VARCHAR(255),
        category VARCHAR(50),
        config JSONB NOT NULL,
        branding JSONB NOT NULL,
        monetization JSONB NOT NULL,
        is_published BOOLEAN DEFAULT FALSE,
        published_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        views INTEGER DEFAULT 0,
        submissions INTEGER DEFAULT 0
      );
    `);

    // Create index on creator_id for faster queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tools_creator_id ON tools(creator_id);
    `);

    // Create index on slug for public tool lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
    `);

    // Create tool_submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tool_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
        data JSONB NOT NULL,
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index on tool_id for analytics queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tool_submissions_tool_id ON tool_submissions(tool_id);
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
