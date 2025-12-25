# 🚀 Project: Personal Portfolio

**Purpose:** Personal space and portfolio for my projects and experiences. My social handles and blogs for any interested parties.
**Framework:** TanStack Start
**Deployment:** Cloudflare workers
**Database:** Cloudflare D1 + Drizzle ORM

---

## 🛠 Tech Stack

| Layer                    | Technology                                                    | Purpose                                                                                           |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Meta-Framework**       | [TanStack Start](https://tanstack.com/start)                  | Full-stack React with type-safe routing and SSR.                                                  |
| **Styling**              | [Shadcn UI](https://ui.shadcn.com/) + Tailwind CSS            | Accessible, themed components.                                                                    |
| **Database**             | [Cloudflare D1](https://developers.cloudflare.com/d1/)        | Serverless SQL database (SQLite-based).                                                           |
| **Image hosting**        | [Cloudflare R2 Bucket](https://developers.cloudflare.com/r2/) | Image hosting with R2 Bucket.                                                                     |
| **ORM**                  | [Drizzle ORM](https://orm.drizzle.team/)                      | Type-safe database queries and migrations.                                                        |
| **Internationalization** | `i18next` + `react-i18next`                                   | Multi-language support (EN/FR/etc).                                                               |
| **Deployment**           | Cloudflare workers                                            | Edge-first hosting and functions.                                                                 |
| **Runtime**              | Bun                                                           | Fastest runtime for Cloudflare Workers.                                                           |
| **Authentication**       | [Better-auth](https://github.com/BetterAuth/better-auth)      | Authentication with better-auth client that will fetch infos from auth.minim.ml my other project. |

---

## 🏗 Architecture & Data Flow

### 1. Database Schema (Drizzle)

The database is structured to handle dynamic project data and social metadata, allowing you to update your portfolio without redeploying code.

```typescript
// schema.ts example
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(), // i18n key or raw text
  url: text("url"),
  github: text("github"),
  image: text("image_url"),
  stack: text("stack"), // JSON string or comma-separated
  isOnline: integer("is_online", { mode: "boolean" }).default(false),
});

export const socials = sqliteTable("socials", {
  id: integer("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon_name"),
});
```

### 2. Internationalization (i18n)

- **Strategy:** Browser language detection with a persistent cookie/localStorage.
- **Structure:** : using a hook to detect the language and provide the en and fr locales text. use-trans

---

## 🎯 Key Features

- **[ ] Dynamic Project Gallery:** Fetches project data from D1 via TanStack Start `createCallback` or `createServerFn`.
- **[ ] Server-Side Rendering (SSR):** Optimized SEO for your bio and project pages.
- **[ ] Dark/Light Mode:** Integrated via Shadcn/Tailwind.
- **[ ] Admin Dashboard (Hidden):** A simple route to add/edit projects directly in the D1 database and change simple stuff.
- **[ ] Type-Safe API:** Using TanStack Start’s loaders to bridge the gap between D1 and the UI.

---

## 📅 Roadmap

### Phase 1: Core Setup

- [ ] Initialize TanStack Start with Cloudflare adapter.
- [ ] Configure `wrangler.toml` for D1 binding.
- [ ] Set up Drizzle ORM and push initial schema to D1.

### Phase 2: UI & UX

- [ ] Implement Shadcn UI components (Card, Button, Navigation Menu).
- [ ] Setup `i18next` provider and language switcher.
- [ ] Create responsive layout with Tailwind.

### Phase 3: Content & Data

- [ ] Seed D1 with initial project data and social handles.
- [ ] Build the "Projects" page with filtering (Online vs. Archived).
- [ ] Create the "About Me" section with i18n support.

### Phase 4: Deployment

- [ ] Configure Cloudflare Pages CI/CD.
- [ ] Domain setup and SSL.
- [ ] Final Lighthouse audit (Target: 95+ for Performance/SEO).

---

## 💻 Development Commands

- `bunx run dev`: Start TanStack Start dev server.
- `bunx drizzle-kit generate:sqlite`: Generate migration files.
- `bun run build`: Build for Cloudflare Pages.

---
