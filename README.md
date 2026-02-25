# acac 个人主页

一个充满赛博朋克风格的像素艺术个人主页，具有丰富的动画效果和交互体验。

## ✨ 特性

- 🎨 像素艺术风格设计
- ⏰ 实时像素时钟
- 🌌 丰富的背景动态效果
  - 移动网格
  - 漂浮像素粒子
  - 闪烁像素点
  - 数字矩阵雨
  - 扫描线效果
  - 径向光晕
- 🖱️ 精致的鼠标交互
  - 光晕跟随
  - 像素轨迹
  - 3D卡片倾斜
  - 按钮磁吸效果
- 🎯 高级视觉效果
  - 随机故障块
  - 动态边框流光
  - 脉冲波纹
  - 点击反馈
- 📱 完全响应式设计
- ⚡ 性能优化

## 🚀 快速开始

### 本地预览

1. 克隆或下载项目
2. 直接在浏览器中打开 `index.html`
3. 或使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 PHP
php -S localhost:8000
```

## 📦 项目结构

```
acaczy/
├── index.html              # 主页面
├── style.css               # 样式文件
├── script.js               # 交互脚本
├── b_c3713eece141586c73c0a70a24e1f831.jpg  # 头像
├── package.json            # 项目配置
├── wrangler.toml           # Cloudflare 配置
├── .gitignore              # Git 忽略文件
├── README.md               # 项目说明
└── DEPLOY.md               # 部署指南
```

## 🎨 自定义

### 修改配色

编辑 `style.css` 中的 CSS 变量：

```css
:root {
    --primary-cyan: #00E5E5;  /* 主色调 */
    --primary-pink: #FF6EC7;  /* 辅助色 */
    --bg-dark: #0D0D12;       /* 背景色 */
}
```

### 修改信息

编辑 `index.html`：
- 头像图片
- 名字和标题
- 项目链接
- 社交媒体链接

## 🌐 部署

详细的部署指南请查看 [DEPLOY.md](DEPLOY.md)

### Cloudflare Pages（推荐）

1. 访问 https://dash.cloudflare.com/
2. 创建 Pages 项目
3. 上传所有文件
4. 获取部署URL

### 其他平台

- GitHub Pages
- Netlify
- Vercel
- 任何静态网站托管服务

## 🔧 技术栈

- HTML5
- CSS3
- Vanilla JavaScript
- Cloudflare Pages

## 📝 性能优化

- ✅ 使用对象池复用 DOM 元素
- ✅ requestAnimationFrame 优化动画
- ✅ 减少 DOM 操作频率
- ✅ 使用文档片段批量添加
- ✅ will-change 属性提示浏览器
- ✅ GPU 加速动画

## 📄 许可证

MIT License

## 👤 作者

**acac**

- X: https://x.com/acacCHN
- GitHub: https://github.com/acacMAX
- B站: https://space.bilibili.com/1016164445

---

**享受像素艺术的世界！** 🎮✨