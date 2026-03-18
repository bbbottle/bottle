import React from 'react';
import { ButtonVariants } from './Button.variants';

/**
 * Button 组件 Props
 * 继承原生 button 属性，避免破坏原生行为
 */
export interface ButtonProps
  extends ButtonVariants, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** 按钮内容 */
  children: React.ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
}
