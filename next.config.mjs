/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxies API calls through this app's own origin so the backend's
  // session cookie is set first-party instead of cross-site (the UI and
  // API are separate onrender.com subdomains, which browsers treat as
  // different sites and increasingly block cookies between).
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_PROXY_TARGET}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
