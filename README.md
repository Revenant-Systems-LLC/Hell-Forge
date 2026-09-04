# Forge by Revenant Systems

A creator-native micro-app builder. Build a small branded, interactive tool for your audience (a calculator, a quiz, a configurator) from a visual builder, publish it under a slug, and let visitors run it. No code required on the creator's side.

Status: foundation. The marketing site, the builder UI, the tool execution API, and the Postgres schema are in place. Auth, payments, and hosting are not.

## Stack

- Client: React 19, Vite, TypeScript, Tailwind CSS 4, shadcn/ui (Radix), wouter for routing.
- Server: Express 4 on Node, PostgreSQL via `pg`.
- Shared: `shared/types.ts` defines the tool model (fields, logic blocks, outputs, branding, monetization) used on both sides.

## Layout

```
client/
  src/pages/            Home (marketing site) and NotFound
  src/components/       landing sections, builder (Sidebar, Inspector, Toolbar, ToolPreview, editors, lists), ui (shadcn)
  src/hooks/            client hooks
server/
  index.ts              Express app, static file serving, SPA fallback
  db.ts                 pg pool and schema bootstrap (tools table)
  logic-engine.ts       runs a tool's logic blocks against submitted field values
  routes/tools.ts       REST API for tools
shared/
  types.ts, const.ts    types and constants shared by client and server
patches/                pnpm patches (wouter)
```

## API

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/tools` | create a tool |
| GET | `/api/tools/:id` | fetch a tool |
| PUT | `/api/tools/:id` | update a tool's config |
| DELETE | `/api/tools/:id` | delete a tool |
| GET | `/api/tools/creator/:creatorId` | list a creator's tools |
| POST | `/api/tools/:id/publish` | publish a tool under its slug |
| GET | `/api/tools/public/:slug` | fetch a published tool by slug |
| POST | `/api/tools/:id/execute` | run a tool with field values, get outputs |
| POST | `/api/tools/:id/submit` | record a visitor submission |
| GET | `/api/tools/:id/analytics` | submission counts for a tool |

Field types, logic block types (`calculation`, `condition`, `transform`), and output blocks are defined in `shared/types.ts`.

## Running it

Requires Node 20+, pnpm, and a PostgreSQL database.

```
pnpm install
cp .env.example .env      # set DATABASE_URL
pnpm dev                  # Vite dev server for the client
pnpm check                # tsc --noEmit
pnpm build                # client to dist/public, server to dist/index.js
pnpm start                # NODE_ENV=production node dist/index.js
```

The server creates the `tools` table on first start.

## License

MIT. See [LICENSE](LICENSE).
