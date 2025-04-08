# Fresh Project Template

📋 Welcome, team, to our standardized **Fresh Project Template** built with
Deno! This repository serves as a robust foundation for initiating new projects
efficiently. Designed with scalability and flexibility in mind, it provides
essential features and a well-organized structure to streamline development.
Below, you’ll find a comprehensive overview to help you get started and leverage
this template effectively.

## Project Overview

ℹ️ This template is a **Deno Fresh-based framework** tailored for rapid project
bootstrapping. It integrates modern tools and libraries to support a variety of
use cases, from administrative interfaces to API-driven applications. Key
technologies include:

- **Core Framework**: Deno 🦕, Fresh 🍋
- **API Layer**: Hono ⚙️
- **Styling**: Tailwind CSS 🎨
- **Database**: Deno KV 📦
- **Initiation Date**: April 4, 2025 🗓️

The template is pre-configured with an admin dashboard, image upload
functionality, a documented API, and secure authentication mechanisms, making it
an ideal starting point for our team’s projects.

## Getting Started

🛠️ ### Prerequisites

Ensure Deno is installed on your system. Installation instructions are available
at:
[Deno Installation Guide](https://deno.land/manual/getting_started/installation).

### Running the Project

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Launch the development server with:
   ```bash
   deno task start
   ```
   This command starts the server, enables hot reloading for `static/` and
   `routes/`, and monitors file changes for seamless development.

## Features and Capabilities

🌟 This template is equipped with the following features to accelerate
development:

- **Admin Dashboard** 👩‍💼: Access a secure admin panel at `/admin__/login`.
  Features include image uploads at `/admin__/image-upload`, protected by
  token-based authentication.
- **API Endpoints** 🌐: A Hono-powered API is available at `/api/v1/`. Explore
  the OpenAPI specification at `/api/v1/docs`. Key routes include
  `/api/v1/image/upload` for image processing and `/api/v1/status` for server
  health checks.
- **Image Processing** 🖼️: Uploads are hashed using `xxhash64`, converted to
  WebP with Sharp (70% quality), and stored in `static/image/` for optimized
  delivery.
- **Deno KV Integration** 📊: A lightweight key-value store with backup
  (`deno task db:dump`) and restore (`deno task db:restore`) capabilities.
- **Frontend Components** 🎨: Preact-based islands (e.g., `Counter.tsx`) and
  reusable components (e.g., `Button.tsx`) styled with Tailwind CSS.
- **HTTPS Support** 🔐: Local development uses self-signed certificates in
  `certs/` for secure connections.

## Project Structure

📂 The repository is organized as follows:

- **`routes/`**: Contains server-rendered pages (e.g., `index.tsx`) and API
  routes (e.g., `api/v1/[...path].ts`).
- **`islands/`**: Houses interactive Preact components (e.g., `Counter.tsx`) for
  client-side functionality.
- **`components/`**: Stores reusable UI elements (e.g., `Button.tsx`).
- **`static/`**: Holds static assets like images, CSS, and the project logo.
- **`api/`**: Defines Hono-based API routes (e.g., `image.ts`, `status.ts`).
- **`db/`**: Provides Deno KV utilities for database operations.
- **`utils/`**: Includes helper functions for cookies, environment variables,
  and constants.

## Command Reference

📟 Here are the essential Deno tasks available:

```bash
deno task start          # Launches the development server with live reloading
deno task build          # Compiles the project for production deployment
deno task preview        # Previews the production build locally
deno task db:dump        # Exports KV data to `backup.json`
deno task db:restore     # Imports KV data from a backup file
deno task db:reset       # Resets the KV database (use with caution)
deno task check          # Runs formatting, linting, and type checking
```

## Configuration and Customization

⚙️

- **Environment Variables**: Defined in `utils/env.ts`. Update `.env` with
  project-specific values (e.g., `ADMIN_SECURE_KEY`, `SERVER_URL`).
- **Server Settings**: Modify `fresh.config.ts` to adjust port, SSL
  certificates, or plugins.
- **Extending Functionality**: Add new routes in `routes/`, API endpoints in
  `api/`, or components in `islands/` and `components/`.

### Security Note

Replace the default `ADMIN_SECURE_KEY` (`replaceme`) in `.env` with a secure,
unique value to ensure admin access remains protected.

## Development Guidelines

📝

- **API Development**: Extend `/api/v1/[...path].ts` with new Hono routes as
  needed. The OpenAPI spec auto-updates at `/api/v1/openapi`.
- **Frontend Updates**: Use `routes/` for pages and `islands/` for interactive
  elements. Leverage Tailwind for consistent styling.
- **Database Management**: Utilize `db/mod.ts` for KV operations. Backup
  regularly with `deno task db:dump`.
- **Logging**: Middleware in `middleware/logger.ts` supports Common and Apache
  Combined formats for request tracking.

## Resources for Further Learning

📚

- [Fresh Documentation](https://fresh.deno.dev/docs/getting-started) 🍋
- [Deno Manual](https://deno.land/manual) 🦕
- [Hono Documentation](https://hono.dev) ⚙️
- [Tailwind CSS Docs](https://tailwindcss.com/docs) 🎨

## Team Collaboration

🤝 This template is designed for our collective use. To enhance it:

- **Feedback**: Share suggestions via team channels or pull requests.
- **Contributions**: Add features, fix bugs, or refine documentation as we adapt
  it to our needs.
- **Ownership**: Treat this as our shared resource—let’s keep it robust and
  up-to-date.

Thank you for adopting this template. Let’s build exceptional projects together!
🙌

---

This `README.md` provides a detailed yet accessible guide for your team,
covering setup, features, structure, and guidelines. It’s formal enough for
professional use while retaining a collaborative tone. Let me know if you’d like
to tweak anything further!
