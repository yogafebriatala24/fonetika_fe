module.exports = {
  apps: [
    {
      name: "Frontend Fonetika",
      exec_mode: "cluster",
      instances: "2",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3009",
      watch: false,
    },
  ],
};
