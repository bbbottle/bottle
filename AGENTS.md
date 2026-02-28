# bbki.ng Project Overview

This is a monorepo for the personal blog and related projects at [bbki.ng](https://bbki.ng). The project uses pnpm workspaces with Turborepo for build orchestration.

## Project Structure

```
packages/
├── site/           # @bbki.ng/site - Main blog website (React + Vite + TypeScript)
├── components/     # @bbki.ng/components - React component library
├── backend/        # @bbki.ng/backend - Cloudflare Workers API (Hono + WebAuthn)
├── tiny-garden/    # @bbki.ng/tiny-garden - Phaser.js game
├── stylebase/      # @bbki.ng/stylebase - TailwindCSS v4 configuration
├── eslint-config/  # @bbki.ng/eslint-config - ESLint configuration
└── config/         # @bbki.ng/config - Shared configuration placeholder
```

## Technology Stack

- **Package Manager**: pnpm v7
- **Monorepo**: Turborepo with workspace protocol
- **Frontend**: React 18/19, TypeScript 4/5, Vite 5/6
- **Styling**: TailwindCSS v4 with custom theme configuration
- **Backend**: Hono framework on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Authentication**: WebAuthn/Passkeys via @simplewebauthn/server
- **Game Engine**: Phaser 3 with bitecs (ECS)
- **Versioning**: Changesets for automated versioning and publishing
- **CI/CD**: GitHub Actions
- **Code Quality**: Prettier, ESLint, Husky pre-commit hooks

## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Start development mode for all packages
pnpm dev

# Build all packages
pnpm build

# Create a changeset for versioning
pnpm changeset

# Version and publish packages
pnpm release
```

### Package-specific Commands

```bash
# Site package
cd packages/site
pnpm dev      # Start Vite dev server
pnpm build    # Build for production
pnpm test     # Run Jest tests

# Backend package
cd packages/backend
pnpm dev      # Start Wrangler dev server
pnpm deploy   # Deploy to Cloudflare Workers

# Components package
cd packages/components
pnpm dev      # Start Vite dev server
pnpm build    # Build library

# Tiny Garden game
cd packages/tiny-garden
pnpm dev      # Start dev server
pnpm build    # Build production bundle
```

## Code Organization

### Site Package (@bbki.ng/site)

The main blog application with the following structure:

- `src/blog/app.tsx` - Main application component with React Router routes
- `src/blog/pages/` - Page components (Cover, Tags, Login, Extensions)
- `src/blog/components/` - Application-specific React components
- `src/blog/hooks/` - Custom React hooks (SWR, authentication, clipboard, etc.)
- `src/blog/articles/` - MDX blog posts with frontmatter
- `src/blog/context/` - React context providers
- `src/blog/utils/` - Utility functions
- `src/blog/types/` - TypeScript type definitions
- `src/blog/__test__/` - Jest unit tests

Key features:
- MDX-based blog posts with syntax highlighting
- Progressive Web App (PWA) with service worker
- Image optimization with OSS (Aliyun) integration
- Web Share API target for receiving shared content
- Keyboard navigation shortcuts
- Dynamic shader effects layer

### Components Package (@bbki.ng/components)

Reusable React component library:

- Components are in `lib/` directory with co-located stories
- Uses Radix UI primitives for accessibility
- Exports both development and production builds
- Peer dependencies: React 18, React DOM 18, React Router DOM 6

### Backend Package (@bbki.ng/backend)

Cloudflare Workers API:

- `src/config/app.config.ts` - Hono app configuration with CORS
- `src/routes/` - API route definitions
- `src/controllers/` - Request handlers for auth and comments
- `src/types/` - TypeScript interfaces for User and Passkey

Features:
- WebAuthn registration and verification
- Comment system with D1 database
- KV storage for challenge tokens

### Tiny Garden Package (@bbki.ng/tiny-garden)

Phaser.js game built with React:

- `src/game/core/` - Phaser scenes and game logic
- `src/game/ecs/` - Entity Component System using bitecs
- `src/app/` - React UI layer

### Stylebase Package (@bbki.ng/stylebase)

TailwindCSS v4 configuration:

- `style.css` - Main CSS file with @theme, @utility, and @layer directives
- Custom color palette and spacing scale
- Typography plugin configuration
- Syntax highlighting styles for code blocks

## Testing Strategy

- **Unit Tests**: Jest for the site package (`pnpm test`)
- Test files are co-located with source files in `__test__/` directories
- Test utilities and mocks are available for React components

## CI/CD Pipeline

### Release Workflow (`.github/workflows/release.yml`)

Triggered on push to `main` branch:

1. Install dependencies using pnpm
2. Run Changesets action to:
   - Create version PR if changesets exist
   - Publish packages to npm if version PR was merged
3. Build the site package
4. Deploy to Cloudflare Pages

### Auto Release Workflow (`.github/workflows/autorelease.yml`)

Triggered on push to `autorelease` branch:

- Automatically creates and merges a PR from `autorelease` to `main`

### GitHub Actions

- `install-dependencies` - Reusable action to setup pnpm and install deps
- `changesets` - Wrapper around changesets/action with custom outputs
- `merge-version-pr` - Merges version bump PRs automatically

## Development Conventions

### Code Style

- **Formatting**: Prettier with pretty-quick for staged files
- **Linting**: ESLint with custom configuration from @bbki.ng/eslint-config
- **Pre-commit**: Husky runs `pnpm pretty-quick --staged`

### Import Aliases

- Site package: `@/` maps to `src/blog/`
- Components: Direct imports from package exports

### Module System

- All packages use ES modules (`"type": "module"`)
- Tree-shaking enabled for production builds

### CSS Conventions

- TailwindCSS v4 with custom `@utility` definitions
- Custom theme variables in `@theme` block
- Component styles use `class-variance-authority` for variants

## Deployment

### Site Deployment

- **Platform**: Cloudflare Pages
- **Build Output**: `packages/site/dist`
- **Command**: `wrangler pages deploy`

### Backend Deployment

- **Platform**: Cloudflare Workers
- **Command**: `wrangler deploy --minify`
- **Database**: D1 bindings configured in wrangler.toml

### NPM Publishing

- Packages are published to npm registry via Changesets
- Scoped under `@bbki.ng` organization
- Access is public for published packages

## Environment Variables

Required secrets for CI/CD:

- `NPM_TOKEN` - For publishing packages
- `CLOUDFLARE_API_TOKEN` - For Pages deployment
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account identifier
- `GH_PAT` - GitHub personal access token for PR merging
- `TURBO_TOKEN` / `TURBO_TEAM` - Turborepo remote caching
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHANNEL_ID` - For notifications

## Security Considerations

- WebAuthn/Passkey authentication for admin functions
- CORS restricted to `https://bbki.ng` origin in production
- Challenge tokens expire after 5 minutes
- OSS image URLs use signed processing styles
- Service worker implements cache-first strategy for static assets
