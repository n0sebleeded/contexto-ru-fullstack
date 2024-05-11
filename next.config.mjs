/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'standalone',
    images: {
        loader: "akamai",
        path: "",
    },
    assetPrefix: "./",
};

export default nextConfig;