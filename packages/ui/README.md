# @bbki.ng/ui

设计系统组件库 - 基于原子设计方法论和 CSS 变量的主题系统。

## 架构特点

- **设计令牌层**: W3C DTCG 格式的 JSON 令牌，作为单一真相源
- **CSS 变量主题**: 通过 CSS 变量实现动态主题切换，支持 light/dark/system
- **原子设计分层**: Atoms → Layout，强制依赖方向
- **Tree-shaking**: 独立模块输出，按需导入

## 安装

```bash
pnpm add @bbki.ng/ui
```

## 使用

### 基础用法

```tsx
import { ThemeProvider, Button, Container } from '@bbki.ng/ui';
import '@bbki.ng/ui/styles';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Container maxWidth="lg">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Container>
    </ThemeProvider>
  );
}
```

### 主题切换

```tsx
import { useTheme } from '@bbki.ng/ui';

function ThemeToggle() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

## 组件

### Button

```tsx
<Button variant="default" size="md">
  Click me
</Button>
```

Props:

- `variant`: 'default' | 'secondary' | 'ghost' | 'destructive' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean

### Container

```tsx
<Container maxWidth="lg" padding="md" centered>
  Content
</Container>
```

### Grid

```tsx
// 标准网格
<Grid cols={3} gap="md">...items...</Grid>

// 三栏布局
<Grid leftAside={...} rightAside={...}>
  Main content
</Grid>
```

## 开发

```bash
# 开发模式
pnpm dev

# 构建令牌
pnpm build:tokens

# 构建包
pnpm build

# 启动 Storybook
pnpm storybook

# 类型检查
pnpm typecheck
```

## 设计令牌

令牌存储在 `tokens/` 目录下：

- `tokens/base/`: 基础令牌（颜色、间距、字体、阴影）
- `tokens/semantic/`: 语义令牌（light/dark 主题映射）

修改令牌后运行 `pnpm build:tokens` 生成 CSS 变量。

## 设计原则

1. **Token 优先**: 所有数值来自设计令牌，禁止组件内硬编码
2. **CSS 变量主题**: 通过 CSS 变量切换主题，而非 Tailwind 的 dark: 前缀
3. **类型安全**: Props 继承原生 HTML 属性
4. **Tree-shaking**: 按需导入，不使用的组件不会打包
