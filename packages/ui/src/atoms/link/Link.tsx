import React from 'react';
import { Link as BaseLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { linkVariants } from './Link.variants';
import { LinkProps } from './Link.types';
import { BlinkDot } from '../blink-dot';

/**
 * Link 组件
 *
 * 支持内部路由链接、外部链接和只读模式。
 * 使用语义化颜色 token，自动适配 light/dark 主题。
 *
 * @example
 * <Link to="/about">About Page</Link>
 * <Link to="https://example.com" external>External Link</Link>
 * <Link to="/" readonly>Read Only</Link>
 */
export const Link: React.FC<LinkProps> = ({
  to,
  variant = 'default',
  external,
  className,
  children,
  status,
  readonly,
  ...rest
}) => {
  // 特殊逻辑：如果内容包含 "小乌鸦"，使用 danger 样式
  const isSpecialContent = typeof children === 'string' && children.includes('小乌鸦');
  const effectiveVariant = isSpecialContent ? 'special' : variant;

  const linkCls = twMerge(linkVariants({ variant: effectiveVariant }), className);

  // 只读模式：显示为静态文本
  if (readonly) {
    const isNonEnName = typeof children === 'string' && !/^[a-zA-Z~]+$/.test(children);
    const offsetCls = isNonEnName ? 'relative top-[2px]' : '';
    return (
      <>
        <span className={twMerge('text-content-secondary', 'inline-block', offsetCls, 'p-2')}>
          {children}
        </span>
        <BlinkDot status={status} />
      </>
    );
  }

  // 外部链接：使用 <a> 标签
  if (external) {
    return (
      <a href={to} className={linkCls} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  // 内部链接：使用 react-router-dom 的 Link
  return (
    <>
      <BaseLink to={to} className={linkCls} {...rest}>
        {children}
        <BlinkDot status={status} />
      </BaseLink>
    </>
  );
};

Link.displayName = 'Link';
