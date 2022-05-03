const withPWA = require("next-pwa");

const ENV_CONFIG = {
  BUILD_ENV_VAL: process.env.BUILD_ENV_VAL
    ? process.env.BUILD_ENV_VAL
    : "development",
};

const serverEnvRuntimeConfig = require("./config/server/" +
  ENV_CONFIG.BUILD_ENV_VAL);
const serverRuntimeConfig = require("./config/server");

const publicEnvRuntimeConfig = require("./config/client/" +
  ENV_CONFIG.BUILD_ENV_VAL);

const publicRuntimeConfig = require("./config/client");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
    dest: "public",
    swSrc: "service-worker.js",
  },
  serverRuntimeConfig: { ...serverRuntimeConfig, ...serverEnvRuntimeConfig },
  publicRuntimeConfig: {
    ...publicRuntimeConfig,
    ...publicEnvRuntimeConfig,
    basePath: "",
  },
  webpack: (config, { isServer }) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        mainFields: isServer
          ? ["module", "main"]
          : ["browser", "module", "main"],
      },
    };
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://taskmanagerservice-env.eba-nxdna3vz.eu-west-2.elasticbeanstalk.com/:path*",
      },
    ];
  },
});
