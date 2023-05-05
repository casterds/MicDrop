const withImages = require('next-images');

module.exports = {
  images: withImages(),
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        "fs": false,
        "net": false,
        "tls": false
      }
    }
    return config
  }
};
