import React from 'react';
import classNames from 'classnames';
import { Link } from '../../atoms/link';
import { BreadcrumbProps } from './Breadcrumb.types';

/**
 * Breadcrumb component for displaying navigation hierarchy
 *
 * Uses semantic color tokens and supports loading states.
 * Automatically adjusts vertical offset for non-English characters.
 *
 * @example
 * <Breadcrumb paths={[{ name: '~', path: '/' }, { name: 'ext', path: '/ext' }, { name: 'txt' }]} />
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths, loading }) => {
  const PathElements = paths.map(({ path, name }, index) => {
    // Separator slash between segments
    const slash = index === 0 ? null : <span className="text-content-disabled">/</span>;

    // Check if name contains non-English characters
    const isNonEnName = !/^[a-zA-Z~]+$/.test(name);
    const offsetCls = classNames({ 'relative top-[2px]': isNonEnName });

    // Determine if this is the last segment
    const isLast = index === paths.length - 1;

    // Set status for loading indicator on the last segment
    const status = loading && isLast ? 'blink' : 'hidden';

    return (
      <span key={path || name}>
        {slash}
        <Link to={path ?? ''} className={offsetCls} readonly={!path} status={status}>
          {name}
        </Link>
      </span>
    );
  });

  return <div className="breadcrumb">{PathElements}</div>;
};

Breadcrumb.displayName = 'Breadcrumb';
