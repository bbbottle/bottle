import React from 'react';
import { ButtonVariants } from './Button.variants';

/**
 * Button 组件 Props
 * 继承原生 button 属性，避免破坏原生行为
 */
export interface ButtonProps
  extends
    Omit<ButtonVariants, 'transparent'>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** 按钮内容 */
  children: React.ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 透明模式（无阴影） */
  transparent?: boolean;
}
