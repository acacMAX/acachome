/**
 * 上传静态资源到 Cloudflare KV
 * 使用方法: node upload-assets.js
 */

const fs = require('fs');
const path = require('path');

// 需要上传的文件列表
const FILES = [
  { path: 'index.html', key: '/index.html' },
  { path: 'style.css', key: '/style.css' },
  { path: 'script.js', key: '/script.js' },
  { path: 'b_c3713eece141586c73c0a70a24e1f831.jpg', key: '/b_c3713eece141586c73c0a70a24e1f831.jpg' },
];

// 上传到 KV 的函数
async function uploadToKV() {
  console.log('正在上传资源到 KV...\n');

  // 这里需要使用 @cloudflare/kv-asset-handler 或 wrangler kv
  // 由于是 Workers 项目，建议使用以下步骤：

  console.log('步骤 1: 创建 KV 命名空间');
  console.log('  wrangler kv:namespace create "ASSETS_KV"');
  console.log('');

  console.log('步骤 2: 将 ID 添加到 wrangler.toml');
  console.log('  [[kv_namespaces]]');
  console.log('  binding = "ASSETS_KV"');
  console.log('  id = "your-kv-namespace-id"');
  console.log('');

  console.log('步骤 3: 上传文件到 KV');
  FILES.forEach(file => {
    console.log(`  wrangler kv:key put "${file.key}" --path="${file.path}" --namespace-id=your-kv-namespace-id`);
  });
  console.log('');

  console.log('步骤 4: 部署 Worker');
  console.log('  wrangler deploy');
  console.log('');

  console.log('替代方案：使用 R2 存储');
  console.log('  R2 更适合存储大文件（如图片）');
  console.log('  需要修改 worker.js 使用 R2 API');
}

// 检查文件是否存在
function checkFiles() {
  console.log('检查本地文件...\n');
  let allExist = true;

  FILES.forEach(file => {
    const filePath = path.join(__dirname, file.path);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✓ ${file.path} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.log(`✗ ${file.path} (文件不存在)`);
      allExist = false;
    }
  });

  console.log('');
  return allExist;
}

// 主函数
async function main() {
  console.log('=== Cloudflare Workers 资源上传工具 ===\n');

  if (!checkFiles()) {
    console.log('错误：部分文件缺失，请检查');
    process.exit(1);
  }

  await uploadToKV();
}

main().catch(console.error);