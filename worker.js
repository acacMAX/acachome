/**
 * Cloudflare Worker - 最小化入口
 * Workers Sites 会自动处理静态文件
 */

export default {
  async fetch(request, env, ctx) {
    // Workers Sites 会自动服务静态文件
    // 这个文件主要用于添加自定义逻辑（如重定向、响应头等）

    const url = new URL(request.url);

    // 添加安全头
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);

    // 添加自定义响应头
    newResponse.headers.set('X-Powered-By', 'Cloudflare Workers');

    return newResponse;
  }
};