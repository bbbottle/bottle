import type { LinkVariants } from './Link.variants';

/**
 * Link status for BlinkDot indicator
 */
export type LinkStatus = 'blink' | 'still' | 'hidden';

/**
 * Link component Props
 * 继承 react-router-dom 的 Link 属性
 */
export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, LinkVariants {
  /** 链接地址 */
  to: string;
  /** 自定义类名 */
  className?: string;
  /** 是否外部链接 */
  external?: boolean;
  /** 是否只读模式（不显示为链接） */
  readonly?: boolean;
  /** BlinkDot 状态 */
  status?: LinkStatus;
  /** 链接内容 */
  children?: React.ReactNode;
}
