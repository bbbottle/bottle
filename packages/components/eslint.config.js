import webConfig from '@bbki.ng/config/eslint/web';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  includeIgnoreFile(path.resolve(__dirname, '.gitignore')),
  ...webConfig,
];
