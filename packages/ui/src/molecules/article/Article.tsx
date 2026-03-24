import { twMerge } from 'tailwind-merge';
import { BlinkDot } from '../../atoms/blink-dot';
import { ArticleProps } from './Article.types';

export const Article = (props: ArticleProps) => {
  const { title, content, children, date, className, description, loading } = props;

  return (
    <div className={twMerge('relative', className)}>
      <div className="mb-32 leading-none">
        <span className="text-2xl mb-2 inline-block text-content-primary">{title}</span>
        {loading && title && <BlinkDot status="blink" className="ml-2" />}
        {date && (
          <div className="pb-0 text-content-secondary">
            <small>{date}</small>
          </div>
        )}
      </div>
      {description && <div className="mb-8 text-content-secondary">{description}</div>}
      <div className="text-content-primary! relative">{children || content}</div>
    </div>
  );
};

Article.displayName = 'Article';
