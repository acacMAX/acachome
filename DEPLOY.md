# 部署指南

## Cloudflare Workers Sites 部署

这是一个纯静态网站项目，使用 **Cloudflare Workers Sites** 进行部署。

---

## 方法一：通过 Wrangler CLI 部署（推荐）

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器让你授权 Cloudflare。

### 3. 部署项目

在项目目录（D:\cxs\acaczy）下运行：

```bash
npm run deploy
# 或
wrangler deploy
```

首次部署时，Wrangler 会询问：
- 项目名称：保持默认 `acac-personal-homepage`
- 子域名：输入你想要的子域名（如 `acac-home`）

### 4. 部署完成

部署成功后，你会获得一个 Workers URL，例如：
```
https://acac-personal-homepage.your-subdomain.workers.dev
```

---

## 方法二：通过 Cloudflare Dashboard 部署

### 1. 创建 Worker

1. 访问 https://dash.cloudflare.com/
2. 点击左侧菜单的 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Create Worker**
5. 给 Worker 命名（如：`acac-personal-homepage`）
6. 点击 **Deploy**

### 2. 上传 Workers Sites

1. 进入 Worker 设置
2. 点击 **Settings** > **Workers Sites**
3. 点击 **Create assets**
4. 或使用 Wrangler CLI：
   ```bash
   wrangler deploy
   ```

---

## 配置自定义域名

### 1. 在 Cloudflare Dashboard 配置

1. 进入你的 Worker 设置
2. 点击 **Settings** > **Triggers**
3. 在 **Custom Domains** 部分点击 **Add custom domain**
4. 输入你的域名（如：`home.acac.com`）
5. 按照指引配置 DNS 记录

### 2. 或在 wrangler.toml 中配置

编辑 `wrangler.toml` 文件：

```toml
routes = ["acachome.yourdomain.com/*"]
```

然后重新部署：
```bash
wrangler deploy
```

---

## 本地开发

### 启动本地开发服务器

```bash
npm run dev
# 或
wrangler dev
```

访问 `http://localhost:8787` 查看效果。

---

## Git 集成（自动部署）

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Update site"
git push
```

### 2. 连接 GitHub 到 Cloudflare

1. 在 Cloudflare Dashboard 创建 Worker
2. 选择 **Connect to Git**
3. 授权 GitHub 并选择仓库
4. 配置构建命令（留空，因为是静态文件）
5. 每次推送代码会自动部署

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