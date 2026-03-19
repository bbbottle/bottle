import { LinkProps } from '@/atoms/link';

export interface TagProps extends Pick<
  LinkProps,
  'to' | 'children' | 'className' | 'external' | 'status' | 'readonly'
> {
  prefix?: string;
  name?: string;
}

export interface TagsProps {
  tags: TagProps[];
  className?: string;
}
