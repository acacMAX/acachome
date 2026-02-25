# 部署指南

## Cloudflare Pages 部署

这是一个纯静态网站项目，推荐使用 **Cloudflare Pages** 进行部署，而不是 Cloudflare Workers。

### 方法一：通过 Cloudflare Dashboard 部署（推荐）

1. **登录 Cloudflare**
   - 访问 https://dash.cloudflare.com/
   - 登录你的账户

2. **创建 Pages 项目**
   - 点击左侧菜单的 **Workers & Pages**
   - 点击 **Create application**
   - 选择 **Pages** 标签
   - 点击 **Create a project**

3. **上传文件**
   - 选择 **Upload assets**
   - 点击 **Browse** 选择项目文件夹（D:\cxs\acaczy）
   - 确保包含以下文件：
     - `index.html`
     - `style.css`
     - `script.js`
     - `b_c3713eece141586c73c0a70a24e1f831.jpg`（头像图片）

4. **部署**
   - 点击 **Deploy site**
   - 等待部署完成（通常几秒钟）
   - 获得部署URL（例如：https://your-project.pages.dev）

5. **配置自定义域名**（可选）
   - 在项目设置中点击 **Custom domains**
   - 点击 **Set up a custom domain**
   - 输入你的域名并按照指引配置DNS

---

### 方法二：通过 Wrangler CLI 部署

1. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **初始化 Pages 项目**
   在项目目录下创建 `_headers` 文件用于性能优化：

   ```http
   /*
     X-Content-Type-Options: nosniff
     X-Frame-Options: DENY
     X-XSS-Protection: 1; mode=block
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: geolocation=(), microphone=(), camera=()

     # 缓存策略
     Cache-Control: public, max-age=31536000, immutable

   index.html
     Cache-Control: public, max-age=0, must-revalidate

   /*.jpg
     Cache-Control: public, max-age=31536000, immutable

   /*.css
     Cache-Control: public, max-age=31536000, immutable

   /*.js
     Cache-Control: public, max-age=31536000, immutable
   ```

4. **创建 `_redirects` 文件**（可选，用于重定向）
   ```http
   /* /index.html 200
   ```

5. **部署**
   ```bash
   cd D:\cxs\acaczy
   wrangler pages deploy .
   ```

6. **首次部署需要配置**
   - Wrangler 会询问项目名称
   - 输入：`acac-personal-homepage`
   - 选择创建新项目

---

### 方法三：通过 Git 仓库部署（自动部署）

1. **推送代码到 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **在 Cloudflare Pages 连接仓库**
   - 创建 Pages 项目时选择 **Connect to Git**
   - 选择你的 Git 提供商（GitHub/GitLab/Bitbucket）
   - 授权并选择仓库
   - 配置构建设置（留空即可，因为无需构建）

3. **配置自动部署**
   - 每次推送到主分支会自动触发部署
   - 可在预览 URL 查看部署效果

---

## 性能优化说明

已实施的优化措施：

1. **JavaScript 性能优化**
   - 使用对象池复用 DOM 元素
   - 使用 `requestAnimationFrame` 优化动画
   - 减少 DOM 操作频率
   - 使用文档片段批量添加元素
   - 使用 `will-change` 提示浏览器优化

2. **CSS 性能优化**
   - 所有动画使用 `transform` 和 `opacity`（GPU加速）
   - 使用 CSS 变量减少 JavaScript 操作
   - 避免布局抖动

3. **资源优化**
   - 图片建议使用 WebP 格式
   - 启用 gzip/brotli 压缩（Cloudflare 自动处理）
   - 设置适当的缓存头

4. **懒加载**
   - 非关键功能延迟初始化
   - 使用 `requestAnimationFrame` 确保首屏渲染

---

## 自定义配置

### 修改配色方案

编辑 `style.css` 中的 CSS 变量：

```css
:root {
    --primary-cyan: #00E5E5;  /* 主色调 - 青色 */
    --primary-pink: #FF6EC7;  /* 辅助色 - 粉色 */
    --bg-dark: #0D0D12;       /* 背景色 */
    --bg-card: #1A1A24;       /* 卡片背景 */
    /* ... */
}
```

### 修改个人信息

编辑 `index.html`：

- **头像**：修改 `<img src="...">` 的 src 属性
- **名字**：修改 `<h1 class="name">` 中的内容
- **标题**：修改 `<p class="title">` 中的内容
- **项目链接**：修改 `.project-links` 中的链接和文本
- **社交媒体**：修改 `.social-links` 中的链接

---

## 故障排除

### 部署后页面空白
- 检查控制台是否有 JavaScript 错误
- 确认所有文件都已上传
- 检查文件路径是否正确

### 动画卡顿
- 确保使用现代浏览器（Chrome 80+, Firefox 75+, Safari 13+）
- 关闭不必要的浏览器扩展
- 检查系统资源使用情况

### 图片不显示
- 确认图片文件名正确
- 检查图片格式是否支持（JPG, PNG, GIF, WebP）
- 确认图片文件已上传

---

## 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 动画和样式
- **Vanilla JavaScript** - 交互效果
- **Cloudflare Pages** - 静态托管
- **CDN** - 全球加速

---

## 联系方式

- **X**: https://x.com/acacCHN
- **GitHub**: https://github.com/acacMAX
- **B站**: https://space.bilibili.com/1016164445

---

**提示**：Cloudflare Pages 提供免费的无限带宽和部署，非常适合个人主页使用！