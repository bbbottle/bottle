import React from 'react';
import { ArticlePage } from '@/components/article';

/**
 * Login page
 * Note: OAuth authentication has been removed. Authentication is now handled
 * via API keys in the CLI tool. Frontend authentication may be re-implemented
 * in the future.
 */
export const Login = () => {
  return (
    <ArticlePage title="登录">
      <div className="prose dark:prose-invert">
        <p className="text-gray-600 dark:text-gray-400">网页登录功能已暂时禁用。</p>
        <p className="text-gray-600 dark:text-gray-400">
          如需管理内容，请使用 CLI 工具并通过 API Key 进行认证：
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <code>bbking login</code>
        </pre>
      </div>
    </ArticlePage>
  );
};
