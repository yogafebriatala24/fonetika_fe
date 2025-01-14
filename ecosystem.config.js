module.exports = {
  apps: [
    {
      name: "Fonetika FE",
      exec_mode: "cluster",
      instances: "1",
      script: "serve",
      autorestart: false,
      watch: true,
      watch_delay: 3000,
      ignore_watch: [
        "./node_modules",
        "./app/views",
        "./public",
        "./.DS_Store",
        "./package.json",
        "./yarn.lock",
        "./samples",
        "./src",
      ],
      env: {
        NODE_ENV: "production",
        PM2_SERVE_PATH: "./build",
        PM2_SERVE_HOST: "0.0.0.0",
        PM2_SERVE_PORT: 3009,
        PM2_SERVE_SPA: "true",
      },
    },
  ],
};

//   module.exports = {
//     apps : [{
//       name: 'Frontend SuperApps',
//       script: 'npm',
//       args: 'start'
//     }]
//   }
