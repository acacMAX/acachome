/**
 * Cloudflare Worker - 静态文件服务器
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 默认返回 index.html
    let filePath = pathname === '/' ? '/index.html' : pathname;

    // 移除开头的 /
    const cleanPath = filePath.replace(/^\//, '');

    try {
      // 尝试从绑定的 assets 获取文件
      const asset = await env.ASSETS.fetch(new URL(cleanPath, request.url));

      if (asset.status === 404) {
        // 如果找不到文件，返回 index.html（SPA 路由）
        const indexAsset = await env.ASSETS.fetch(new URL('index.html', request.url));
        return new Response(indexAsset.body, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'X-Powered-By': 'Cloudflare Workers'
          }
        });
      }

      return new Response(asset.body, asset);
    } catch (e) {
      return new Response('Error loading file', { status: 500 });
    }
  }
};