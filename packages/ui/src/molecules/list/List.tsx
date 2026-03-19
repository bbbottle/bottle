import { twMerge } from 'tailwind-merge';
import { Link, LinkProps } from '../../atoms/link';
import { Article } from '../article';
import { ListProps, TitledListProps, LinkListProps } from './List.types';

export const List = (props: ListProps) => {
  const { items, itemRenderer, className, horizontal, compact, footer, spaceBetween } = props;

  const spaceCls = compact ? '' : horizontal ? 'mr-3' : 'mb-4';

  return (
    <ul
      className={twMerge(
        'list-none',
        horizontal && 'flex items-center',
        !horizontal && footer && spaceBetween && 'flex flex-col justify-between',
        className
      )}
    >
      {items.map((item, index) => {
        return (
          <li
            key={item.id || index}
            className={twMerge('shrink-0', spaceCls, horizontal && 'my-0')}
          >
            {itemRenderer(item, index)}
          </li>
        );
      })}
      {footer && (
        <li key="footer" className={twMerge('shrink-0', horizontal && 'my-0')}>
          {footer}
        </li>
      )}
    </ul>
  );
};

List.displayName = 'List';

export const TitledList = (props: TitledListProps) => {
  const { title, description, ...rest } = props;

  if (!title) {
    return <List {...rest} />;
  }

  return (
    <Article title={title} description={description} className="w-fit">
      <List {...rest} />
    </Article>
  );
};

TitledList.displayName = 'TitledList';

export const LinkList = (props: LinkListProps) => {
  const { title, description, links, ...rest } = props;

  const renderLink = ({ children, to, external, ...linkRest }: LinkProps) => {
    return (
      <Link to={to || ''} external={external} {...linkRest}>
        {children}
      </Link>
    );
  };

  return (
    <TitledList
      title={title}
      description={description}
      items={links}
      itemRenderer={renderLink}
      {...rest}
    />
  );
};

LinkList.displayName = 'LinkList';
