import { twMerge } from 'tailwind-merge';
import { Link } from '@/atoms/link';
import { TagProps, TagsProps } from './Tag.types';

export const Tag = (props: TagProps) => {
  const { prefix, children, ...rest } = props;

  return (
    <Link {...rest} variant="muted">
      <span className="text-xs">
        {prefix || '#'}
        {children}
      </span>
    </Link>
  );
};

Tag.displayName = 'Tag';

export const Tags = (props: TagsProps) => {
  const { tags, className } = props;

  return (
    <div className={twMerge('inline-block', className)}>
      {tags.map((tag, index) => {
        const isLast = index === tags.length - 1;
        return (
          <Tag
            {...tag}
            key={tag.to || index}
            className={twMerge(!isLast && 'mr-2', tag.className)}
          />
        );
      })}
    </div>
  );
};

Tags.displayName = 'Tags';
