#!/usr/bin/env node
import StyleDictionary from 'style-dictionary';
import type { Config, TransformedToken, Dictionary } from 'style-dictionary';
import { promises as fs } from 'fs';
import path from 'path';

// 获取 token 引用的实际值
function getTokenValue(token: TransformedToken, dictionary: Dictionary): string {
  // 如果已经是解析后的值，直接返回
  if (typeof token.value === 'string' && !token.value.startsWith('{')) {
    return token.value;
  }

  // 处理引用格式 {color.gray.50}
  if (typeof token.value === 'string' && token.value.startsWith('{')) {
    const refPath = token.value.replace(/[{}]/g, '').split('.');
    const refToken = dictionary.tokens;

    // 递归查找引用的 token
    let current: unknown = refToken;
    for (const key of refPath) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return token.value; // 找不到引用，返回原值
      }
    }

    // 如果找到的是 token 对象，获取其 value
    if (current && typeof current === 'object' && current !== null) {
      const tokenObj = current as { value?: string };
      if (tokenObj.value) {
        return tokenObj.value;
      }
    }
  }

  return token.value;
}

// 自定义格式：生成 CSS 变量，解析所有引用
StyleDictionary.registerFormat({
  name: 'css/variables-resolved',
  format: ({ dictionary }) => {
    const variables = dictionary.allTokens
      .map((token: TransformedToken) => {
        const value = getTokenValue(token, dictionary);
        return `  --${token.name}: ${value};`;
      })
      .join('\n');

    return `:root {\n${variables}\n}`;
  },
});

// 自定义格式：生成 TypeScript 配置
StyleDictionary.registerFormat({
  name: 'typescript/theme-config',
  format: ({ dictionary }) => {
    const semanticColors = dictionary.allTokens
      .filter((t: TransformedToken) => t.path[0] === 'semantic' && t.path[1] === 'color')
      .reduce(
        (acc: Record<string, string>, token: TransformedToken) => {
          const name = token.path.slice(2).join('-');
          acc[name] = `var(--${token.name})`;
          return acc;
        },
        {} as Record<string, string>
      );

    const baseTokens = dictionary.allTokens
      .filter((t: TransformedToken) => t.path[0] !== 'semantic')
      .reduce(
        (acc: Record<string, Record<string, string>>, token: TransformedToken) => {
          const category = token.path[0] as string;
          const name = token.path.slice(1).join('-');
          if (!acc[category]) acc[category] = {};
          acc[category][name] = `var(--${token.name})`;
          return acc;
        },
        {} as Record<string, Record<string, string>>
      );

    return `/**
 * Auto-generated from design tokens
 * Do not edit manually
 */
export const tokens = {
  colors: ${JSON.stringify(semanticColors, null, 2).replace(/"/g, "'")},
  base: ${JSON.stringify(baseTokens, null, 2).replace(/"/g, "'")},
} as const;

export type ThemeTokens = typeof tokens;
`;
  },
});

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function build() {
  const basePath = process.cwd();
  const srcTokensPath = path.join(basePath, 'src', 'tokens');
  const cssPath = path.join(srcTokensPath, 'css');

  await ensureDir(cssPath);

  // Light theme config - 解析所有引用
  const lightConfig: Config = {
    log: { verbosity: 'verbose' },
    source: ['tokens/base/**/*.json', 'tokens/semantic/light.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: 'src/tokens/css/',
        files: [
          {
            destination: 'light.css',
            format: 'css/variables-resolved',
          },
        ],
      },
      typescript: {
        transformGroup: 'js',
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: 'src/tokens/',
        files: [
          {
            destination: 'index.ts',
            format: 'typescript/theme-config',
          },
        ],
      },
    },
  };

  // Dark theme config - 解析所有引用
  const darkConfig: Config = {
    log: { verbosity: 'verbose' },
    source: ['tokens/base/**/*.json', 'tokens/semantic/dark.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: 'src/tokens/css/',
        files: [
          {
            destination: 'dark.css',
            format: 'css/variables-resolved',
          },
        ],
      },
    },
  };

  const sd = new StyleDictionary(lightConfig);
  await sd.buildAllPlatforms();

  const sdDark = new StyleDictionary(darkConfig);
  await sdDark.buildAllPlatforms();

  console.log('✅ Tokens built successfully');
}

build().catch(error => {
  console.error('❌ Token build failed:', error);
  process.exit(1);
});
