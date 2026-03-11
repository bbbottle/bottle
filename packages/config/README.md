# @bbki.ng/config

Shared configuration for bbki.ng monorepo.

## ESLint Configurations

### Web (React + TypeScript)

```javascript
// eslint.config.js
import webConfig from '@bbki.ng/config/eslint/web';

export default webConfig;
```

### Node.js

```javascript
// eslint.config.js
import nodeConfig from '@bbki.ng/config/eslint/node';

export default nodeConfig;
```

### Cloudflare Workers

```javascript
// eslint.config.js
import cloudflareConfig from '@bbki.ng/config/eslint/cloudflare';

export default cloudflareConfig;
```

## Prettier Configuration

```json
// .prettierrc.json
"@bbki.ng/config/prettier"
```
