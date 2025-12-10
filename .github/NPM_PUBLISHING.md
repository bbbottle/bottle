# NPM Publishing Configuration

## Current Status

NPM publishing has been temporarily disabled in the CI workflow due to a revoked NPM_TOKEN.

## Changes Made

1. **Private Packages**: The following packages are now marked as `"private": true` and will never be published to npm:
   - `@bbki.ng/backend` - Backend service (not meant for npm)
   - `@bbki.ng/config` - Internal configuration
   - `@bbki.ng/site` - Website package (not meant for npm)

2. **Public Packages**: The following packages remain public and can be published to npm:
   - `@bbki.ng/components` - React component library (already published with 166 versions)
   - `@bbki.ng/stylebase` - CSS/styling package (already published with 52 versions)

3. **CI Configuration**: The changesets action (`.github/actions/changesets/action.yml`) has been modified to:
   - Only run version management (creating version PRs)
   - Skip publishing to npm (no `publish` parameter)
   - No longer requires `NPM_TOKEN` environment variable

## How to Restore NPM Publishing

When you have a new valid NPM_TOKEN:

1. **Add the token to repository secrets**:
   - Go to GitHub repository settings → Secrets and variables → Actions
   - Update or create the `NPM_TOKEN` secret with your new npm token
   - Get a token from: https://www.npmjs.com/settings/[username]/tokens

2. **Update the changesets action** (`.github/actions/changesets/action.yml`):
   ```yaml
   - name: Create Release Pull Request or Publish to npm
     id: changesets
     uses: changesets/action@v1
     with:
       version: pnpm changeset version
       publish: pnpm release  # Add this line back
     env:
       GITHUB_TOKEN: ${{ env.GITHUB_TOKEN }}
       NPM_TOKEN: ${{ env.NPM_TOKEN }}  # Add this line back
   ```

3. **Verify your npm account has permissions**:
   - Make sure your npm account has publish access to `@bbki.ng/components` and `@bbki.ng/stylebase`
   - The packages are scoped (`@bbki.ng`) so you need organization access
   - Check your access with: `npm access ls-packages @bbki.ng`
   - If you don't have access, contact the organization owner to grant permissions

## Manual Publishing

If you need to publish manually without CI:

```bash
# Login to npm
npm login

# Run the full release script (versions AND publishes in one command)
# Note: This will version packages AND publish them immediately
pnpm release

# Or do it step by step (recommended for more control):
pnpm changeset version  # Update versions based on changesets
pnpm changeset publish  # Publish packages with updated versions to npm
```

**Important**: When CI is configured to only version (as it currently is), manual publishing with `pnpm changeset publish` will publish the already-versioned packages without creating new versions.

## Notes

- The changesets workflow will continue to work for version management
- Version PRs will still be created automatically
- Only the actual publishing to npm registry is disabled
- Private packages (backend, config, site) will never be published even if you restore publishing
